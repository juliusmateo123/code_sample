<?php
    require_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
    require str_replace('ajax', 'includes', plugin_dir_path( __FILE__ )) . '/class-twitter.php';
    $twobj  = new TwitterDashboard($_POST['a'], $_POST['b']);
    return $twobj->createTweet($_POST['tweet']);
?>