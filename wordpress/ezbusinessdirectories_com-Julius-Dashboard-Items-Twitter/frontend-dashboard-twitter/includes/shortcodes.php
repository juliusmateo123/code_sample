<?php

    add_action('init', 'dashboard_twitter_register_shortcodes');

    function dashboard_twitter_register_shortcodes() {
        add_shortcode('dashboard-twitter', 'dashboard_twitter_display');
    }

    function dashboard_twitter_display($atts, $content = '') {

        if(isset($_POST['disconnect'])) {
            update_post_meta($atts['post_id'], 'twitter_oauth_secret', '');
            update_post_meta($atts['post_id'], 'twitter_oauth_token', '');
        }

        $post_meta = get_post_meta($atts['post_id']);

        $oauth_access_token = $post_meta['twitter_oauth_token'][0];
        $oauth_access_token_secret = $post_meta['twitter_oauth_secret'][0];

        require plugin_dir_path( __FILE__ ) . 'class-twitter.php';
        $twobj  = new TwitterDashboard($oauth_access_token, $oauth_access_token_secret);

        if($oauth_access_token && $oauth_access_token_secret) {
            $basics = $twobj->getAccountInfo();
        } else {
            $basics = false;
        }
    ?>
        <style>
            body {
                max-width: 100%!important;
            }
        </style>

        <div class="msonpdbox_p1_s1">
            <div class="msonpdbox_p1_s1_data">
                <div class="msonpdbox_p1_s1_data_img">
                    <img src="<?= plugins_url('/assets/images/Group 100.svg', FED_TEMPLATES_PLUGIN); ?>">
                    <h3>TWITTER
                        <?php if($basics && !$basics->errors) {
                            $profile_img = str_replace('_normal', '', $basics->profile_image_url_https);
                        ?>
                            <span class="single_page">
                                <span>
                                    &nbsp;<img src="<?= $basics->profile_image_url ?>" alt="">
                                    <span>&nbsp;&nbsp;@<?= $basics->screen_name ?></span>
                                </span>
                            </span>
                            <a href="#" data-toggle="modal" data-target="#myModal-<?=$atts['post_id']?>">VIEW FULL REPORT</a>
                            <div class="modal fade" id="myModal-<?=$atts['post_id']?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body twitterstats">
                                            
                                                <div class="profile-image-area" style="background: url('<?= $basics->profile_banner_url ?>')">
                                                    <div class="profile-round">
                                                        <img src="<?= $profile_img ?>" alt="">
                                                    </div>
                                                    <p class="twitter-link"><a href="<?= $basics->url ?>" target="_blank"><i class="fab fa-twitter"></i></a></p>
                                                </div>
                                                <div class="profile-info">
                                                    <h3><?= $basics->name ?></h3>
                                                    <h6>@<?= $basics->screen_name ?></h6>
                                                    <p><?= $basics->description ?></p>
                                                </div>
                                                <div class="basic-info">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <i class="fas fa-map-marker-alt"></i> 
                                                            <?= $basics->location ?>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <i class="fas fa-link"></i> 
                                                            <?= ($basics->url) ? '<a href="'.$basics->url.'"  target="_blank">'.$basics->url.'</a>' : ''; ?>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <i class="far fa-calendar-alt"></i> 
                                                            Joined <?= date('F Y', strtotime($basics->created_at)) ?>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <?= $basics->friends_count ?> Following
                                                        </div>
                                                        <div class="col-md-4">
                                                            <?= $basics->followers_count ?> Followers
                                                        </div>
                                                        <div class="col-md-4">
                                                            <?= $basics->statuses_count ?> Tweets
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="create-tweet">
                                                    <form action="<?= site_url() ?>/wp-content/plugins/frontend-dashboard-twitter/ajax/create-tweet.php" method="POST" class="clearfix">
                                                        <input type="hidden" name="a" value="<?= $oauth_access_token ?>">
                                                        <input type="hidden" name="b" value="<?= $oauth_access_token_secret ?>">
                                                        <div class="ct-img">
                                                            <img src="<?= $basics->profile_image_url ?>" alt="">
                                                        </div>
                                                        <div class="ct-textarea">
                                                            <textarea name="tweet" class="form-control" required></textarea>
                                                        </div>
                                                        <div class="button-tweet">
                                                            <button type="submit" name="submit" value="submit">TWEET</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="tweet-area">
                                                </div>
                                                <form action="" method="POST" class="text-center dashboard-disconnect" onsubmit="return confirm('Are you sure you want to disconnect this account?')">
                                                    <button type="submit" class="btn btn-danger" name="disconnect">Disonnect</button>
                                                </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>
                    </h3>
                </div>
            </div>
            <div class="msonpdbox_p1_s1_data2">
                <?php if(!$basics) { ?>
                    <div class="msocototw">
                        <a class="connect_btn" href="<?= $twobj->callLoginFunc($atts['post_id']); ?>">
                            Connect to Twitter
                        </a>
                    </div>
                <?php } else { ?>
                    <div class="msotwitbox">
                        <div class="msotwitbox_s1">
                            <div class="msotwitbox_s1_p1">
                                <h5>TWEETS</h5>
                            </div>
                            <div class="msotwitbox_s1_p2">
                                <h5><?= $basics->statuses_count ?></h5>
                            </div>
                        </div>
                        <div class="msotwitbox_s1">
                            <div class="msotwitbox_s1_p1">
                                <h5>FOLLOWING</h5>
                            </div>
                            <div class="msotwitbox_s1_p2">
                                <h5><?= $basics->friends_count ?></h5>
                            </div>
                        </div>
                        <div class="msotwitbox_s1">
                            <div class="msotwitbox_s1_p1">
                                <h5>FOLLOWERS</h5>
                            </div>
                            <div class="msotwitbox_s1_p2">
                                <h5><?= $basics->followers_count ?></h5>
                            </div>
                        </div>						
                        <div class="msotwitbox_s1">
                            <div class="msotwitbox_s1_p1">
                                <h5>TWEET FAVOURITES</h5>
                            </div>
                            <div class="msotwitbox_s1_p2">
                                <h5><?= $basics->favourites_count ?></h5>
                            </div>
                        </div>
                        <div class="msotwitbox_s1">
                            <div class="msotwitbox_s1_p1">
                                <h5>LISTED COUNT</h5>
                            </div>
                            <div class="msotwitbox_s1_p2">
                                <h5><?= $basics->listed_count ?></h5>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        <script>
            jQuery(function($) {
                getTweets();

                $('.create-tweet form').submit(function(e){
                    e.preventDefault();
                    var frm = $(this);
                    let data = new FormData(this);
                    $(this).find('button').attr('disabled', true);
                    $('.button-tweet p').remove();
                    $.ajax({
                        type: frm.attr('method'),
                        url: frm.attr('action'),
                        context: this,
                        processData: false,
                        contentType: false,
                        data: data,
                        success: function(res) {
                          let data = JSON.parse(res);
                          $('.button-tweet').append('<p>'+data.message+'</p>');
                          $(this).find('button').attr('disabled', false);
                          $(this).find('textarea').val('');
                          getTweets();
                        }
                    });
                });

                function getTweets() {
                    $.ajax({
                        type: 'GET',
                        url: '<?=site_url()?>/wp-content/plugins/frontend-dashboard-twitter/ajax/fetch-tweet.php?user_name=<?=$basics->screen_name?>&post_id=<?=$atts['post_id']?>',
                        context: this,
                        processData: false,
                        contentType: false,
                        success: function(res) {
                            $('.tweet-area').html(res);
                        }
                    });
                }
            });
        </script>
     
    <?php
    }


?>