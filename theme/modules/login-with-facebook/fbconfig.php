<?php

require_once '../../../includes/config.php';
require_once '../../../includes/database_functions.php';

$fun = new DatabaseFunctions();

require_once 'autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\Entities\AccessToken;
use Facebook\HttpClients\FacebookCurlHttpClient;
use Facebook\HttpClients\FacebookHttpable;

// init app with app id and secret
FacebookSession::setDefaultApplication($APP_ID, $APP_SECRET);
// login helper with redirect_uri
$helper = new FacebookRedirectLoginHelper(ACTION_URL);
try {
    $session = $helper->getSessionFromRedirect();
   
} catch (FacebookRequestException $ex) {
    // When Facebook returns an error
} catch (Exception $ex) {
    // When validation fails or other local issues
}


if (isset($session)) {
    // graph api request for user data
    $request = new FacebookRequest(
					$session, 
					'GET', 
					'/me?fields=first_name,email,name,birthday,gender,last_name'
				);
    
    $response = $request->execute();
    // get response
    $graphObject = $response->getGraphObject();
    $fbid = $graphObject->getProperty('id');              // To Get Facebook ID
    $fbfullname = $graphObject->getProperty('name'); // To Get Facebook full name
    $femail = $graphObject->getProperty('email');    // To Get Facebook email ID

   
    $query = "select user_id, profile_id, facebook_id, user_type, status from user_details where `facebook_id` = ?";
    $query_val = array($fbid);
    $result = $fun->SelectFromTable($query, $query_val);
	
	if(!empty($result)){
		if($result[0]['status']!=0){
			$_SESSION[INSTALLATION_KEY . 'logged_in'] = true;
			$_SESSION[INSTALLATION_KEY . 'user_id'] = md5($result[0]['user_id']);
			$_SESSION[INSTALLATION_KEY . 'profile_id'] = $result[0]['profile_id'];
			$_SESSION[INSTALLATION_KEY . 'facebook_id'] = $result[0]['facebook_id'];
			$_SESSION[INSTALLATION_KEY . 'user_type'] = $result[0]['user_type'];
			$_SESSION[INSTALLATION_KEY . 'status'] = $result[0]['status'];
			header("Location: " . SITE_PATH.'my-profile');
		}
	}
	else {
		$user_type = 1;
		$last_profile_query = "SELECT MAX(`profile_id`) as last_profile_id FROM `user_details`";
		$last_profile_data = $fun->SelectFromTable($last_profile_query);
		$last_profile_id = $last_profile_data[0]['last_profile_id'];
		if($last_profile_data[0]['last_profile_id'] == ""){
			$last_profile_id = 10000;
		}
		$insert = array(
			'profile_id' => ($last_profile_id + 1),
			'facebook_id' => $fbid,
			'user_type' => $user_type,
			'status' => 2
		);
		$id = $fun->InsertToTable('user_details', $insert);
		if($id){
			$query = "select user_id, profile_id, facebook_id, user_type, status from user_details where `facebook_id` = ?";
			$query_val = array($fbid);
			$result = $fun->SelectFromTable($query, $query_val);
			if(!empty($result)){
				$insert = array(
					'user_id' => $result[0]['user_id'],
					'name' => $fbfullname,
					'email' => $femail
				);
				$id = $fun->InsertToTable('artist_details', $insert);
				if($result[0]['status']!=0){
					$_SESSION[INSTALLATION_KEY . 'logged_in'] = true;
					$_SESSION[INSTALLATION_KEY . 'user_id'] = md5($result[0]['user_id']);
					$_SESSION[INSTALLATION_KEY . 'profile_id'] = $result[0]['profile_id'];
					$_SESSION[INSTALLATION_KEY . 'facebook_id'] = $result[0]['facebook_id'];
					$_SESSION[INSTALLATION_KEY . 'user_type'] = $result[0]['user_type'];
					$_SESSION[INSTALLATION_KEY . 'status'] = $result[0]['status'];
					header("Location: " . SITE_PATH.'my-profile');
				}
			}
		}
	}
} else {
    $loginUrl = $helper->getLoginUrl(
            array(
                //'redirect_uri' => SITE_PATH,
                'scope' => 'email,user_about_me'
    ));
    //echo $loginUrl;die;
    header("Location: " . $loginUrl);
}
