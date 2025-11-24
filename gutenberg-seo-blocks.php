<?php
/**
 * Plugin Name:           SEO Schema Blocks
 * Plugin URI:            https://github.com/codebyjm/seo-schema-blocks
 * Description:           SEO-focused blocks for outputting JSON-LD schema (Local Business, Rating, FAQ).
 * Version:               0.1.0
 * Author:                Jo Mendes
 * Author URI:            https://codebyjm.com
 * License:               GPL-2.0-or-later
 * License URI:           https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:           seo-schema-blocks
 * Requires at least:     6.0
 * Requires PHP:          7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GSB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GSB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'GSB_PLUGIN_VERSION', '0.1.0' );

require_once GSB_PLUGIN_DIR . 'inc/register-blocks.php';
require_once GSB_PLUGIN_DIR . 'inc/admin-page.php';
