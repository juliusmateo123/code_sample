<?php
    add_action( 'wp_enqueue_scripts', 'twitter_load_assets' );
    function twitter_load_assets() {
    
        wp_enqueue_script( 'tw_chart_custom',  '/wp-content/plugins/frontend-dashboard-twitter/assets/js/script.js', '','',true);
        wp_enqueue_style( 'tw_dashboard_adjustments',  '/wp-content/plugins/frontend-dashboard-twitter/assets/css/styles.css', '','');
    }
?>