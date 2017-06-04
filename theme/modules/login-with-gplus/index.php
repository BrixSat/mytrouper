<?php
require_once '../../../includes/config.php';
require_once '../../../includes/database_functions.php';
require_once ('libraries/Google/autoload.php');


$fun = new DatabaseFunctions();

$client_id = GOOGLE_CLIENT_ID;
$client_secret = GOOGLE_CLIENT_SECRET;
$redirect_uri = GOOGLE_REDIRECT_URI;


//incase of logout request, just unset the session var
if (isset($_GET['logout'])) {
    unset($_SESSION['access_token']);
}

$client = new Google_Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("email");
$client->addScope("profile");

$service = new Google_Service_Oauth2($client);

if (isset($_GET['code'])) {
	
    $client->authenticate($_GET['code']);

    $_SESSION['access_token'] = $client->getAccessToken();
    
    header('Location: ' . filter_var(stripslashes($redirect_uri), stripslashes(FILTER_SANITIZE_URL)));
    exit;
}


if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
    $client->setAccessToken($_SESSION['access_token']);
} else {
    $authUrl = $client->createAuthUrl();
}

if (!isset($authUrl)) {
    $user = $service->userinfo->get(); //get user info 
    //echo "<pre>"; print_r($user);die;
    $name = $user->name;
    $email = $user->email;
    $gplus_id = $user->id;
	
	$query = "select user_id, profile_id,facebook_id, gplus_id, user_type, status from user_details where `gplus_id` = ?";
    $query_val = array($gplus_id);
    $result = $fun->SelectFromTable($query, $query_val);
	
	if(!empty($result)){
		if($result[0]['status']!=0){
			$_SESSION[INSTALLATION_KEY . 'logged_in'] = true;
			$_SESSION[INSTALLATION_KEY . 'user_id'] = md5($result[0]['user_id']);
			$_SESSION[INSTALLATION_KEY . 'profile_id'] = $result[0]['profile_id'];
			$_SESSION[INSTALLATION_KEY . 'facebook_id'] = $result[0]['facebook_id'];
			$_SESSION[INSTALLATION_KEY . 'gplus_id'] = $result[0]['gplus_id'];
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
			'gplus_id' => $gplus_id,
			'user_type' => $user_type,
			'status' => 2
		);
		$id = $fun->InsertToTable('user_details', $insert);
		if($id){
			$query = "select user_id, profile_id, facebook_id, gplus_id, user_type, status from user_details where `gplus_id` = ?";
			$query_val = array($gplus_id);
			$result = $fun->SelectFromTable($query, $query_val);
			if(!empty($result)){
				$insert = array(
					'user_id' => $result[0]['user_id'],
					'name' => $name,
					'email' => $email
				);
				$id = $fun->InsertToTable('artist_details', $insert);
				if($result[0]['status']!=0){
					$_SESSION[INSTALLATION_KEY . 'logged_in'] = true;
					$_SESSION[INSTALLATION_KEY . 'user_id'] = md5($result[0]['user_id']);
					$_SESSION[INSTALLATION_KEY . 'profile_id'] = $result[0]['profile_id'];
					$_SESSION[INSTALLATION_KEY . 'facebook_id'] = $result[0]['facebook_id'];
					$_SESSION[INSTALLATION_KEY . 'gplus_id'] = $result[0]['gplus_id'];
					$_SESSION[INSTALLATION_KEY . 'user_type'] = $result[0]['user_type'];
					$_SESSION[INSTALLATION_KEY . 'status'] = $result[0]['status'];
					header("Location: " . SITE_PATH.'my-profile');
				}
			}
		}
	}
}

