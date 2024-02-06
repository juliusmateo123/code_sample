<?php

/**
 * Plugin Name:       Dashboard Twitter
 * Description:       Business Listing Dashboard Twitter
 * Version:           1.0.0
 * Author:            Julius Mateo
 * License:           GPL2
 * Text Domain:       dashboard-twitter
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'DASHBOARD_TWITTER_VERSION', '1.0.0' );

function dashboard_twitter_activate_settings()
{

}

function dashboard_twitter_deactivate_settings()
{

}

function dashboard_twitter_uninstall_settings()
{

}

register_activation_hook( __FILE__, 'dashboard_twitter_activate_settings' );
register_deactivation_hook( __FILE__, 'dashboard_twitter_deactivate_settings' );
register_uninstall_hook( __FILE__, 'dashboard_twitter_uninstall_settings' );

require plugin_dir_path( __FILE__ ) . 'includes/shortcodes.php';
require plugin_dir_path( __FILE__ ) . 'functions.php';