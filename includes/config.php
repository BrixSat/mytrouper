<?php
ob_start();
if( !isset($_SESSION)){
	session_start();
}

define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','trouper123');
define('DB_SERVER','localhost');
define('TABLES_PREFIX', 'mytrouper_');
define('DEVELOPMENT', true);
define('INSTALLATION_KEY', 'eee');

ini_set('expose_php ', 'off');
error_reporting(1);

$sql_connect = mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);

$sql_config = "SELECT * FROM site_settings where status = 1";
$res_config = mysqli_fetch_assoc(mysqli_query($sql_connect,$sql_config));

define('SITE_TITLE',$res_config['mt_tittle']);
define('SITE_KEYWORDS',$res_config['mt_keywords']);
define('SITE_DESC',$res_config['mt_desc']);
if($_SERVER['SERVER_PORT'] == '7443')
{
	$_SERVER['SERVER_NAME'] = $_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'];
}
if( substr($_SERVER['SERVER_PROTOCOL'],0,5) != 'HTTPS' )
{
	define('SITE_PATH',strtolower(substr($_SERVER['SERVER_PROTOCOL'],0,4)).'://'.$_SERVER['SERVER_NAME'].$res_config['site_path']);
	define('SITE_PATH_URL',strtolower(substr($_SERVER['SERVER_PROTOCOL'],0,4)).'://'.$_SERVER['SERVER_NAME'].$res_config['site_path']);
	define('SITE_FILE',$_SERVER['DOCUMENT_ROOT'].$res_config['site_file']);
}
else
{
	define('SITE_PATH',strtolower(substr($_SERVER['SERVER_PROTOCOL'],0,5)).'://'.$_SERVER['SERVER_NAME'].$res_config['site_path']);
	define('SITE_PATH_URL',strtolower(substr($_SERVER['SERVER_PROTOCOL'],0,5)).'://'.$_SERVER['SERVER_NAME'].$res_config['site_path']);
	define('SITE_FILE',$_SERVER['DOCUMENT_ROOT'].$res_config['site_file']);

}
//Facebook
$APP_ID =  $res_config['fb_app_id'];
$APP_SECRET =  $res_config['fb_app_secert'];
define('ACTION_URL', $res_config['fb_action_url']);
define('FB_APP_ID', $res_config['fb_app_id']);
define('FB_APP_SECRET', $res_config['fb_app_secert']);

//Google
define('GOOGLE_CLIENT_ID', $res_config['gl_client_id']);
define('GOOGLE_CLIENT_SECRET', $res_config['gl_client_secret']);
define('GOOGLE_REDIRECT_URI', $res_config['gl_redirect_url']);
define('GOOGLE_ACTION_URI', $res_config['gl_action_url']);

//CCAvenue
define('CC_MERCHANT_KEY', $res_config['cca_merchant_id']);
define('CC_ACTION_URL', $res_config['cca_action_url']);
define('CC_CANCEL_URL', $res_config['cca_prod_cancel_url']);
define('CC_REDIRECT_URL', $res_config['cca_prod_redirect_url']);
define('CC_COIN_CANCEL_URL', $res_config['cca_coin_cancel_url']);
define('CC_COIN_REDIRECT_URL', $res_config['cca_coin_redirect_url']);
define('CC_WORKING_KEY', $res_config['cca_working_key']);
define('CC_ACCESS_CODE', $res_config['cca_access_code']);
define('CC_ACCESS_CODE', $res_config['cca_access_code']);
define('CC_REDIRECT_URL_SUCCESS' , SITE_PATH.'checkout?action=process_gateway_callback');
define('SITE_MAINTENANCE' , $res_config['site_maintenance']);

define('SITE_FB' , $res_config['site_fb']);
define('SITE_TWITTER' , $res_config['site_twitter']);
define('SITE_GP' , $res_config['site_gp']);
define('SITE_YOU_TUBE' , $res_config['site_you_tube']);
define('SITE_INSTRAGRAM' , $res_config['site_instragram']);
define('SITE_PINTEREST' , $res_config['site_pinterest']);
define('SITE_DRIBBLE' , $res_config['site_dribbble']);
define('SITE_BEWHANCE' , $res_config['site_behance']);

?>
