<?php
    require_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
    require str_replace('ajax', 'includes', plugin_dir_path( __FILE__ )) . '/class-twitter.php';
    $post_meta = get_post_meta($_GET['post_id']);
    $oauth_access_token = $post_meta['twitter_oauth_token'][0];
    $oauth_access_token_secret = $post_meta['twitter_oauth_secret'][0];
    $twobj  = new TwitterDashboard($oauth_access_token, $oauth_access_token_secret);
    $tweets = $twobj->getTweets($_GET['user_name']);
    // echo '<pre>';
    // print_r($tweets);
    // echo '</pre>';
    foreach($tweets->statuses as $item) {
    ?>
        <div class="tweet-item clearfix">
            <div class="tweet-user">
                <img src="<?= $item->user->profile_image_url_https ?>" alt="">
                <p>@<?=$item->user->screen_name?> </p>
            </div>
            <div class="tweet-container">
                <div><small><?= $item->created_at ?></small></div>
                <div><?= nl2br($item->text) ?></div>
                <ul>
                    <li>Retweet <?= $item->retweet_count ?></li>
                    <li>Favorite <?= $item->favorite_count ?></li>
                </ul>
                <ul class="hash-list">
                    <?php foreach($item->entities->hashtags as $hash) { ?>
                        <li>#<?= $hash->text ?></li>
                    <?php } ?>
                </ul>
            </div>

        </div>
    <?php
    }
  
?>