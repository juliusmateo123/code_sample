<?php
    require plugin_dir_path( __DIR__ ) . 'vendor/autoload.php';
    use Abraham\TwitterOAuth\TwitterOAuth;


    class TwitterDashboard {

        public $consumer_key;
        public $consumer_secret;

        public $oauth_access_token;
        public $oauth_access_token_secret;

        public $callback_url;

        public function __construct($oauth_access_token = null, $oauth_access_token_secret = null) {

            $this->consumer_key = 'vvuyy2MQjpB98cWVGAxpaHDLA';
            $this->consumer_secret = 'lADJvSQOd420xcwOXrM6abczddUX0aTV6qYDoSDQ1Cbtxne6E6';
            
            $this->oauth_access_token = $oauth_access_token;
            $this->oauth_access_token_secret = $oauth_access_token_secret;

            $this->callback_url = site_url().'/wp-content/plugins/frontend-dashboard-twitter/fire-callback.php';

        }

        /**
         * 
         * Login Function
         * @param id, $post_id
         * @return boolean
        */
        public function callLoginFunc($post_id) {

                session_start();
                $twitteroauth = new TwitterOAuth(
                    $this->consumer_key,
                    $this->consumer_secret
                );
                
                $request_token = $twitteroauth->oauth(
                    'oauth/request_token', [
                        'oauth_callback' => $this->callback_url
                    ]
                );
                
                // throw exception if something gone wrong
                if($twitteroauth->getLastHttpCode() != 200) {
                    throw new \Exception('There was a problem performing this request');
                };

                $_SESSION['post_id'] = $post_id;

                $_SESSION['oauth_token'] = $request_token['oauth_token'];
                $_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

                $_SESSION['redirect_success'] = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

                // generate the URL to make request to authorize our application
                $url = $twitteroauth->url(
                    'oauth/authorize', [
                        'oauth_token' => $request_token['oauth_token']
                    ]
                );
                return $url;
        }


        /**
         * 
         * Get and Set to Session 0Auth tokens
         * @param id, $post_id
         * @return object
        */
        public function getAccessToken() {

            session_start();
            $oauth_verifier = filter_input(INPUT_GET, 'oauth_verifier');

            $twitteroauth = new TwitterOAuth(
                $this->consumer_key,
                $this->consumer_secret,
                $_SESSION['oauth_token'],
                $_SESSION['oauth_token_secret']
            );

            $token = $twitteroauth->oauth(
                'oauth/access_token', [
                    'oauth_verifier' => $oauth_verifier
                ]
            );

            $_SESSION['oauth_token'] = $token['oauth_token'];
            $_SESSION['oauth_token_secret'] = $token['oauth_token_secret'];

        }


        /**
         * 
         * Get Stats
         * @return object
        */
        public function getAccountInfo() {
            try {
                $twitteroauth = new TwitterOAuth(
                    $this->consumer_key,
                    $this->consumer_secret,
                    $this->oauth_access_token,
                    $this->oauth_access_token_secret
                );
                $content = $twitteroauth->get("account/verify_credentials");
                return $content;
            } catch(Exception $e) {
                return null;
            }
        }


                /**
         * 
         * Get Stats
         * @return object
        */
        public function getTweets($username) {
            try {
                $twitteroauth = new TwitterOAuth(
                    $this->consumer_key,
                    $this->consumer_secret,
                    $this->oauth_access_token,
                    $this->oauth_access_token_secret
                );
                $tweets = $twitteroauth->get("search/tweets", ['q' => $username, 'count' => 10]);
                return $tweets;
            } catch(Exception $e) {
                return null;
            }
        }


        


        public function createTweet($content) {
            try {
                if($content) {
                    $twitteroauth = new TwitterOAuth(
                        $this->consumer_key,
                        $this->consumer_secret,
                        $this->oauth_access_token,
                        $this->oauth_access_token_secret
                    );
                    $status = $twitteroauth->post(
                        "statuses/update", [
                            "status" => $content
                        ]
                    );
                    echo json_encode(['status' => 200, 'message' => 'Tweet Sent']);
                } else {
                    echo json_encode(['status' => 400, 'message' => 'Tweet Field is Required']);
                }
            } catch(Exception $e) {
                echo json_encode(['status' => 400, 'message' => 'There is a problem with the API']);
            }

        }

    }

?>