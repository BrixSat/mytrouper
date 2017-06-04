<?php


class logout {
    
        function __construct() {
			unset($_SESSION[INSTALLATION_KEY . 'logged_in']);
			unset($_SESSION[INSTALLATION_KEY . 'user_id']);
			unset($_SESSION[INSTALLATION_KEY . 'profile_id']);
			unset($_SESSION[INSTALLATION_KEY . 'facebook_id']);
			unset($_SESSION[INSTALLATION_KEY . 'gplus_id']);
			unset($_SESSION[INSTALLATION_KEY . 'twitter_id']);
			unset($_SESSION[INSTALLATION_KEY . 'user_type']);
			unset($_SESSION[INSTALLATION_KEY . 'status']);
			header("location: " . SITE_PATH . "");
        } 
       
}