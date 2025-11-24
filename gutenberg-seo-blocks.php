<?php
/**
 * Plugin Name: Gutenberg SEO Blocks
 * Description: Gutenberg blocks for JSON-LD schema (Local Business, etc.).
 * Version: 0.1.0
 * Author: Jo Mendes
 * Text Domain: gutenberg-seo-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GSB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GSB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'GSB_PLUGIN_VERSION', '0.1.0' );

require_once GSB_PLUGIN_DIR . 'inc/register-blocks.php';
require_once GSB_PLUGIN_DIR . 'inc/admin-page.php';
