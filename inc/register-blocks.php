<?php
/**
 * Block registration and render callbacks.
 *
 * @package Gutenberg_SEO_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers scripts and blocks.
 */
function gsb_register_blocks() {
	wp_register_script(
		'gsb-local-business-editor',
		GSB_PLUGIN_URL . 'build/local-business.js',
		array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor', 'wp-components' ),
		GSB_PLUGIN_VERSION,
		true
	);

	wp_register_script(
		'gsb-rating-editor',
		GSB_PLUGIN_URL . 'build/rating.js',
		array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor', 'wp-components' ),
		GSB_PLUGIN_VERSION,
		true
	);

	wp_register_script(
		'gsb-faq-editor',
		GSB_PLUGIN_URL . 'build/faq.js',
		array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor', 'wp-components' ),
		GSB_PLUGIN_VERSION,
		true
	);

	register_block_type(
		GSB_PLUGIN_DIR . 'blocks/local-business',
		array(
			'render_callback' => 'gsb_render_local_business_schema',
		)
	);

	register_block_type(
		GSB_PLUGIN_DIR . 'blocks/rating',
		array(
			'render_callback' => 'gsb_render_rating_schema_block',
		)
	);

	register_block_type(
		GSB_PLUGIN_DIR . 'blocks/faq',
		array(
			'render_callback' => 'gsb_render_faq_schema_block',
		)
	);
}
add_action( 'init', 'gsb_register_blocks' );

/**
 * Renders LocalBusiness schema markup.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Block content.
 * @param object $block      Block instance.
 *
 * @return string
 */
function gsb_render_local_business_schema( $attributes, $content, $block ) {
	$business_name = isset( $attributes['businessName'] ) ? sanitize_text_field( $attributes['businessName'] ) : '';

	if ( '' === $business_name ) {
		return '';
	}

	$business_type = isset( $attributes['businessType'] ) && $attributes['businessType']
		? sanitize_text_field( $attributes['businessType'] )
		: 'LocalBusiness';

	$url = isset( $attributes['url'] ) && $attributes['url']
		? esc_url_raw( $attributes['url'] )
		: get_permalink();

	$schema = array(
		'@context' => 'https://schema.org',
		'@type'    => $business_type,
		'name'     => $business_name,
		'url'      => $url,
	);

	if ( ! empty( $attributes['telephone'] ) ) {
		$schema['telephone'] = sanitize_text_field( $attributes['telephone'] );
	}

	if ( ! empty( $attributes['priceRange'] ) ) {
		$schema['priceRange'] = sanitize_text_field( $attributes['priceRange'] );
	}

	$address = array(
		'@type' => 'PostalAddress',
	);

	if ( ! empty( $attributes['streetAddress'] ) ) {
		$address['streetAddress'] = sanitize_text_field( $attributes['streetAddress'] );
	}

	if ( ! empty( $attributes['addressLocality'] ) ) {
		$address['addressLocality'] = sanitize_text_field( $attributes['addressLocality'] );
	}

	if ( ! empty( $attributes['addressRegion'] ) ) {
		$address['addressRegion'] = sanitize_text_field( $attributes['addressRegion'] );
	}

	if ( ! empty( $attributes['postalCode'] ) ) {
		$address['postalCode'] = sanitize_text_field( $attributes['postalCode'] );
	}

	if ( isset( $attributes['addressCountry'] ) && '' !== $attributes['addressCountry'] ) {
		$address['addressCountry'] = sanitize_text_field( $attributes['addressCountry'] );
	}

	if ( count( $address ) > 1 ) {
		$schema['address'] = $address;
	}

	$json = wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

	if ( false === $json ) {
		return '';
	}

	return '<script type="application/ld+json">' . $json . '</script>';
}

/**
 * Renders AggregateRating schema markup.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Block content.
 * @param object $block      Block instance.
 *
 * @return string
 */
function gsb_render_rating_schema_block( $attributes, $content, $block ) {
	$rating_value = isset( $attributes['ratingValue'] ) ? floatval( $attributes['ratingValue'] ) : 0;

	if ( $rating_value <= 0 ) {
		return '';
	}

	$item_name = isset( $attributes['itemName'] ) ? sanitize_text_field( $attributes['itemName'] ) : '';
	$item_url  = isset( $attributes['itemUrl'] ) && $attributes['itemUrl']
		? esc_url_raw( $attributes['itemUrl'] )
		: get_permalink();
	$rating_count = isset( $attributes['ratingCount'] ) ? intval( $attributes['ratingCount'] ) : 0;
	$best_rating  = isset( $attributes['bestRating'] ) && $attributes['bestRating'] !== ''
		? floatval( $attributes['bestRating'] )
		: 5;
	$worst_rating = isset( $attributes['worstRating'] ) && $attributes['worstRating'] !== ''
		? floatval( $attributes['worstRating'] )
		: 1;

	$schema = array(
		'@context'    => 'https://schema.org',
		'@type'       => 'AggregateRating',
		'ratingValue' => $rating_value,
		'bestRating'  => $best_rating,
		'worstRating' => $worst_rating,
	);

	if ( $rating_count > 0 ) {
		$schema['ratingCount'] = $rating_count;
	}

	if ( $item_name || $item_url ) {
		$item_reviewed = array(
			'@type' => 'Thing',
		);

		if ( $item_name ) {
			$item_reviewed['name'] = $item_name;
		}

		if ( $item_url ) {
			$item_reviewed['url'] = $item_url;
		}

		$schema['itemReviewed'] = $item_reviewed;
	}

	$json = wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

	if ( false === $json ) {
		return '';
	}

	return '<script type="application/ld+json">' . $json . '</script>';
}

/**
 * Renders FAQ schema markup with visible HTML.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Block content.
 * @param object $block      Block instance.
 *
 * @return string
 */
function gsb_render_faq_schema_block( $attributes, $content, $block ) {
	$items = isset( $attributes['items'] ) && is_array( $attributes['items'] ) ? $attributes['items'] : array();
	$accent_color     = isset( $attributes['accentColor'] ) ? sanitize_hex_color( $attributes['accentColor'] ) : '';
	$background_color = isset( $attributes['backgroundColor'] ) ? sanitize_hex_color( $attributes['backgroundColor'] ) : '';
	$border_color     = isset( $attributes['borderColor'] ) ? sanitize_hex_color( $attributes['borderColor'] ) : '';

	$accent_color     = $accent_color ? $accent_color : '#1d4ed8';
	$background_color = $background_color ? $background_color : '#ffffff';
	$border_color     = $border_color ? $border_color : '#e5e7eb';

	$filtered_items = array();

	foreach ( $items as $item ) {
		$question = isset( $item['question'] ) ? sanitize_text_field( $item['question'] ) : '';
		$answer   = isset( $item['answer'] ) ? wp_kses_post( $item['answer'] ) : '';

		if ( $question && $answer ) {
			$filtered_items[] = array(
				'question' => $question,
				'answer'   => $answer,
			);
		}
	}

	if ( empty( $filtered_items ) ) {
		return '';
	}

	$section_style = sprintf(
		' style="border:1px solid %1$s;background-color:%2$s;"',
		esc_attr( $border_color ),
		esc_attr( $background_color )
	);

	$html = '<section class="gsb-faq-block" itemscope itemtype="https://schema.org/FAQPage"' . $section_style . '>';

	$schema_entities = array();

	foreach ( $filtered_items as $index => $item ) {
		$details_style = sprintf(
			' style="border:1px solid %1$s;border-radius:8px;margin-bottom:12px;background:#fff;"',
			esc_attr( $border_color )
		);
		$summary_style = sprintf(
			' style="background-color:%1$s;color:#fff;padding:12px 16px;font-weight:600;cursor:pointer;border-radius:8px;display:flex;align-items:center;justify-content:space-between;"',
			esc_attr( $accent_color )
		);
		$answer_style  = sprintf(
			' style="padding:12px 16px;border-top:1px solid %1$s;"',
			esc_attr( $border_color )
		);

		$html .= '<details class="gsb-faq-item"' . ( 0 === $index ? ' open' : '' ) . $details_style . '>';
		$html .= '<summary class="gsb-faq-question"' . $summary_style . '>' . esc_html( $item['question'] ) . '</summary>';
		$html .= '<div class="gsb-faq-answer"' . $answer_style . '>' . $item['answer'] . '</div>';
		$html .= '</details>';
		$schema_entities[] = array(
			'@type'          => 'Question',
			'name'           => $item['question'],
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => wp_strip_all_tags( $item['answer'] ),
			),
		);
	}

	$html .= '</section>';

	$schema = array(
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $schema_entities,
	);

	$json = wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

	if ( false === $json ) {
		return $html;
	}

	return $html . '<script type="application/ld+json">' . $json . '</script>';
}
