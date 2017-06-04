<?php

class bootstrap {

    function __construct() {

        $link = isset($_SERVER['REDIRECT_URL']) ? rtrim($_SERVER['REDIRECT_URL'], '/') : '';
        $link_array = explode('/', $link);

        $fun = new DatabaseFunctions();
        $func = new functions();

        foreach ($link_array as $value) {
            $link_array_new[] = $func->xss_clean_get(strip_tags(($value)));
        }
        if (isset($_GET)) {
            foreach ($_GET as $key => $value) {
                $key = $func->xss_clean_get(addslashes($key));
                $_GET[$key] = $func->xss_clean_get(addslashes($value));
            }
        }
        if (isset($_POST)) {
            foreach ($_POST as $key => $value) {
                $key = $func->xss_clean_get(addslashes($key));
                if (!is_array($value))
                    $_POST[$key] = $func->xss_clean(addslashes($value));
                else
                    $_POST[$key] = $func->xss_clean($value);
            }
        }

        $_SERVER['REQUEST_URI'] = $func->xss_clean_get($_SERVER['REQUEST_URI']);

        $link_array = $link_array_new;
        $route = end($link_array);
		if(SITE_MAINTENANCE == 0){
			if ($route == 'index' || $route == '') {
				$home = new index();
				$home->handlePage();
			}
			elseif (in_array('artist', $link_array)) {
				$end_artist = end($link_array);
				$artist_categoris = $func->artist_categoris();
				foreach($artist_categoris as $key=>$value){
					$artst_category[] = $func->url_slug($value['artist_category_name']);
				}
				if ($end_artist == 'artist' or (in_array($end_artist, $artst_category))) {
					$artist = new artist();
					$artist->handlePage($end_artist);
				}
				else {
					$not_found = new not_found();
					$not_found->handlePage();
				}
			}
			elseif (in_array('profile', $link_array)) {
				$final_array = array_slice($link_array, $pos + 1, 2);
				$link_count =  (count($link_array)-2);
				$action_array = $link_array[$link_count];
				$end_profile_val = end($link_array);
				if(is_numeric($end_profile_val) and $action_array == "profile"){
					$profile = new profile();
					$profile->handlePage();
				}
				else {
					$not_found = new not_found();
					$not_found->handlePage();
				}
			}
			elseif ($route == 'my-profile') {
				if(!empty($_SESSION['eeeprofile_id'])){
					if($_SESSION['eeeuser_type'] == 1){
						$page = 'artist_profile';
					}
					elseif($_SESSION['eeeuser_type'] == 2){
						$page = 'org_profile';
					}
					$my_profile = new my_profile($page);
					$my_profile->handlePage($page);
				}
				else {
					header("Location: " . SITE_PATH);
				}
			}
			elseif ($route == 'songs') {
				$end_songs = end($link_array);
				if ($end_songs == 'songs') {
					$songs = new songs();
					$songs->handlePage();
				}
				else {
					$not_found = new not_found();
					$not_found->handlePage();
				}
			}
			elseif ($route == 'videos') {
				$end_videos = end($link_array);
				if ($end_videos == 'videos') {
					$videos = new videos();
					$videos->handlePage();
				}
				else {
					$not_found = new not_found();
					$not_found->handlePage();
				}
			}
			elseif ($route == 'contact' OR $route == 'tnc') {
				$static_page = new static_page($route);
				$static_page->handlePage($route);
			}
			elseif ($route == 'logout') {
				$logout = new logout();
			}
			elseif ($route == 'signup') {
				if(!empty($_SESSION['eeeprofile_id'])){
					header("Location: " . SITE_PATH);
				}
				else {
					$signup = new signup();
					$signup->handlePage();
				}
			}
			else {
				$not_found = new not_found();
				$not_found->handlePage();
			}
		}
		else {
			$site_maintenance = new site_maintenance();
			$site_maintenance->handlePage();
		}
    }
}

$boot = new bootstrap();
?>
