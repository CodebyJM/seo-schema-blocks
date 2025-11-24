<?php
/**
 * Admin settings page for Gutenberg SEO Blocks.
 *
 * @package Gutenberg_SEO_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle form submissions from the settings page.
 */
function gsb_handle_request_submission() {
	if ( ! isset( $_POST['gsb_request_submit'] ) ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	check_admin_referer( 'gsb_submit_request' );

	$request_type = isset( $_POST['gsb_request_type'] ) ? sanitize_text_field( wp_unslash( $_POST['gsb_request_type'] ) ) : 'feature';
	$email        = isset( $_POST['gsb_request_email'] ) ? sanitize_email( wp_unslash( $_POST['gsb_request_email'] ) ) : '';
	$message      = isset( $_POST['gsb_request_message'] ) ? wp_kses_post( wp_unslash( $_POST['gsb_request_message'] ) ) : '';

	if ( empty( $message ) ) {
		add_settings_error( 'gsb_messages', 'gsb_request_error', __( 'Please include a short description of your request.', 'gutenberg-seo-blocks' ) );
		return;
	}

	$requests   = get_option( 'gsb_requests', array() );
	$requests[] = array(
		'type'         => $request_type,
		'email'        => $email,
		'message'      => $message,
		'submitted_at' => current_time( 'mysql' ),
	);

	if ( count( $requests ) > 20 ) {
		$requests = array_slice( $requests, -20 );
	}

	update_option( 'gsb_requests', $requests );

	$subject = sprintf(
		/* translators: %s: request type */
		__( 'New Gutenberg SEO Blocks %s request', 'gutenberg-seo-blocks' ),
		$request_type
	);

	$body  = "Request Type: {$request_type}\n";
	$body .= "Submitted: " . current_time( 'mysql' ) . "\n";
	if ( $email ) {
		$body .= "Contact Email: {$email}\n";
	}
	$body .= "\nMessage:\n{$message}\n";

	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( $email ) {
		$headers[] = 'Reply-To: ' . $email;
	}

	wp_mail( 'codebyjm@gmail.com', $subject, $body, $headers );

	add_settings_error( 'gsb_messages', 'gsb_request_saved', __( 'Thanks! Your request has been recorded.', 'gutenberg-seo-blocks' ), 'updated' );
}
add_action( 'admin_init', 'gsb_handle_request_submission' );

/**
 * Register the plugin settings page.
 */
function gsb_register_settings_page() {
	add_options_page(
		__( 'Gutenberg SEO Blocks', 'gutenberg-seo-blocks' ),
		__( 'Gutenberg SEO Blocks', 'gutenberg-seo-blocks' ),
		'manage_options',
		'gsb-settings',
		'gsb_render_settings_page'
	);
}
add_action( 'admin_menu', 'gsb_register_settings_page' );

/**
 * Render the plugin settings page.
 */
function gsb_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$requests = get_option( 'gsb_requests', array() );
	$requests = array_reverse( $requests );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Gutenberg SEO Blocks', 'gutenberg-seo-blocks' ); ?></h1>
		<p><?php esc_html_e( 'Share feature ideas, block requests, or feedback so we can keep improving these SEO-focused blocks.', 'gutenberg-seo-blocks' ); ?></p>

		<?php settings_errors( 'gsb_messages' ); ?>

		<form method="post" action="">
			<?php wp_nonce_field( 'gsb_submit_request' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="gsb_request_type"><?php esc_html_e( 'Request Type', 'gutenberg-seo-blocks' ); ?></label></th>
					<td>
						<select id="gsb_request_type" name="gsb_request_type">
							<option value="feature"><?php esc_html_e( 'New block or feature idea', 'gutenberg-seo-blocks' ); ?></option>
							<option value="support"><?php esc_html_e( 'Support question', 'gutenberg-seo-blocks' ); ?></option>
							<option value="bug"><?php esc_html_e( 'Bug report', 'gutenberg-seo-blocks' ); ?></option>
							<option value="other"><?php esc_html_e( 'Other feedback', 'gutenberg-seo-blocks' ); ?></option>
						</select>
						<p class="description"><?php esc_html_e( 'Choose the best match so we can prioritize requests.', 'gutenberg-seo-blocks' ); ?></p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="gsb_request_email"><?php esc_html_e( 'Contact Email (optional)', 'gutenberg-seo-blocks' ); ?></label></th>
					<td>
						<input type="email" id="gsb_request_email" name="gsb_request_email" class="regular-text" placeholder="you@example.com" />
						<p class="description"><?php esc_html_e( 'We will only use this if we need to follow up.', 'gutenberg-seo-blocks' ); ?></p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="gsb_request_message"><?php esc_html_e( 'Request Details', 'gutenberg-seo-blocks' ); ?></label></th>
					<td>
						<textarea id="gsb_request_message" name="gsb_request_message" rows="6" class="large-text" required></textarea>
						<p class="description"><?php esc_html_e( 'Tell us what you need or how we can improve Gutenberg SEO Blocks.', 'gutenberg-seo-blocks' ); ?></p>
					</td>
				</tr>
			</table>
			<?php submit_button( __( 'Submit Request', 'gutenberg-seo-blocks' ), 'primary', 'gsb_request_submit' ); ?>
		</form>

		<?php if ( ! empty( $requests ) ) : ?>
			<hr />
			<h2><?php esc_html_e( 'Recent Requests', 'gutenberg-seo-blocks' ); ?></h2>
			<p class="description"><?php esc_html_e( 'These entries are stored locally so you have a record of what was submitted.', 'gutenberg-seo-blocks' ); ?></p>
			<ul class="gsb-request-list">
				<?php foreach ( $requests as $request ) : ?>
					<li>
						<strong><?php echo esc_html( ucfirst( $request['type'] ) ); ?></strong>
						<?php if ( ! empty( $request['submitted_at'] ) ) : ?>
							 &middot; <?php echo esc_html( date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $request['submitted_at'] ) ) ); ?>
						<?php endif; ?>
						<?php if ( ! empty( $request['email'] ) ) : ?>
							 &middot; <em><?php echo esc_html( $request['email'] ); ?></em>
						<?php endif; ?>
						<div><?php echo wpautop( wp_kses_post( $request['message'] ) ); ?></div>
					</li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
	<?php
}
