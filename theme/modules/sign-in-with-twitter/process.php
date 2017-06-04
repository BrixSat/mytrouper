<?php

require_once '../../../includes/config.php';
require_once '../../../includes/database_functions.php';
include_once("inc/twitteroauth.php");

$fun = new DatabaseFunctions();

if(isset($_REQUEST['oauth_token']) && $_SESSION['token'] == $_REQUEST['oauth_token']) {

	// everything looks good, request access token
	//successful response returns oauth_token, oauth_token_secret, user_id, and screen_name
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['token'] , $_SESSION['token_secret']);
	$access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);
	
	
	if($connection->http_code=='200')
	{
		//redirect user to twitter
		$_SESSION['status'] = 'verified';
		$_SESSION['request_vars'] = $access_token;
		$name = $_SESSION['request_vars']['screen_name'];
		$email = "";
		$twitter_id = $_SESSION['request_vars']['user_id'];
		
		// unset no longer needed request tokens
		unset($_SESSION['token']);
		unset($_SESSION['token_secret']);
		
		// seesion insert
		$query = "select user_id, profile_id,facebook_id, gplus_id, twitter_id, user_type, status from user_details where `twitter_id` = ?";
		$query_val = array($twitter_id);
		$result = $fun->SelectFromTable($query, $query_val);
		
		$query_email_chk = "select artist_id from artist_details where `email` = ? and `user_id` != ?";
		$query_val_email_chk = array($email, $result[0]['user_id']);
		$result_email_chk = $fun->SelectFromTable($query_email_chk, $query_val_email_chk);
		
		if(empty($result_email_chk)){			
			if(!empty($result)){
				if($result[0]['status']!=0){
					$_SESSION[INSTALLATION_KEY . 'logged_in'] = true;
					$_SESSION[INSTALLATION_KEY . 'user_id'] = md5($result[0]['user_id']);
					$_SESSION[INSTALLATION_KEY . 'profile_id'] = $result[0]['profile_id'];
					$_SESSION[INSTALLATION_KEY . 'facebook_id'] = $result[0]['facebook_id'];
					$_SESSION[INSTALLATION_KEY . 'gplus_id'] = $result[0]['gplus_id'];
					$_SESSION[INSTALLATION_KEY . 'twitter_id'] = $result[0]['twitter_id'];
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
					'twitter_id' => $twitter_id,
					'user_type' => $user_type,
					'status' => 2
				);
				$id = $fun->InsertToTable('user_details', $insert);
				if($id){
					$query = "select user_id, profile_id, facebook_id, twitter_id, gplus_id, user_type, status from user_details where `twitter_id` = ?";
					$query_val = array($twitter_id);
					$result = $fun->SelectFromTable($query, $query_val);
					if(!empty($result)){
						$insert = array(
							'user_id' => $result[0]['user_id'],
							'name' => $name,
							'twitter_screen_name' => $name,
							'email' => $email
						);
						$id = $fun->InsertToTable('artist_details', $insert);
						if($result[0]['status']!=0){
							$_SESSION[INSTALLATION_KEY . 'logged_in'] = true;
							$_SESSION[INSTALLATION_KEY . 'user_id'] = md5($result[0]['user_id']);
							$_SESSION[INSTALLATION_KEY . 'profile_id'] = $result[0]['profile_id'];
							$_SESSION[INSTALLATION_KEY . 'facebook_id'] = $result[0]['facebook_id'];
							$_SESSION[INSTALLATION_KEY . 'gplus_id'] = $result[0]['gplus_id'];
							$_SESSION[INSTALLATION_KEY . 'twitter_id'] = $result[0]['twitter_id'];
							$_SESSION[INSTALLATION_KEY . 'user_type'] = $result[0]['user_type'];
							$_SESSION[INSTALLATION_KEY . 'status'] = $result[0]['status'];
							header("Location: " . SITE_PATH.'my-profile');
						}
					}
				}
			}
		}
		else{
			header("Location: " . SITE_PATH.'signup?action=email_error');
		}
		
	}else{
		die("error, try again later!");
	}
		
}else{

	if(isset($_GET["denied"]))
	{
		header("Location: ".SITE_PATH);
		die();
	}

	//fresh authentication
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
	$request_token = $connection->getRequestToken(OAUTH_CALLBACK);
	
	//received token info from twitter
	$_SESSION['token'] 			= $request_token['oauth_token'];
	$_SESSION['token_secret'] 	= $request_token['oauth_token_secret'];
	
	// any value other than 200 is failure, so continue only if http code is 200
	if($connection->http_code=='200')
	{
		//redirect user to twitter
		$twitter_url = $connection->getAuthorizeURL($request_token['oauth_token']);
		header('Location: ' . $twitter_url); 
	}else{
		die("error connecting to twitter! try again later!");
	}
}
?>

