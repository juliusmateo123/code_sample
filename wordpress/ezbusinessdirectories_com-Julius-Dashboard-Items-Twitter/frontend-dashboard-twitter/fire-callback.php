<?php
    require_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
    require plugin_dir_path( __FILE__ ) . 'includes/class-twitter.php';
    
    session_start();
    
    $twobj  = new TwitterDashboard();
    $twobj->getAccessToken();
    
    if(isset($_SESSION['post_id'])) {
        if(isset($_SESSION['oauth_token'])) {
            update_post_meta($_SESSION['post_id'], 'twitter_oauth_token', $_SESSION['oauth_token']);
        }
        if(isset($_SESSION['oauth_token_secret'])) {
            update_post_meta($_SESSION['post_id'], 'twitter_oauth_secret', $_SESSION['oauth_token_secret']);
        }
    }

    // $user_meta = get_userdata(get_current_user_id());
    // $user_roles = $user_meta->roles;

    // if(in_array('administrator', $user_roles)) {
    //     $url = site_url(). '/dashboard/?menu_type=post&menu_slug=post&menu_id=listing&parent_id=post_listing&fed_nonce=1fbb5dc70b&post_id='.$_SESSION['post_id'].'&fed_post_type=listing&post_status=view'; 
    // } else if(in_array('customer', $user_roles)) {
    //     $url = site_url(). '/dashboard/';
    // }

    unset($_SESSION['post_id']);
    unset($_SESSION['oauth_token']);
    unset($_SESSION['oauth_token_secret']);

    header('Location: '.$_SESSION['redirect_success']);

?>