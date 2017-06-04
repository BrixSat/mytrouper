<?php

class header extends template{

    function __construct($page) {
        
        parent::setTemplate('header');
    }
    
    public function getHeader(){
        $template = parent::getTemplate('header');
        return $template;
    }
	
	public function meta_tags(){
		$fun = new DatabaseFunctions();
		$func = new functions();
		$link = isset($_SERVER['REDIRECT_URL']) ? rtrim($_SERVER['REDIRECT_URL'], '/') : '';
        $link_array = explode('/', $link);
		foreach ($link_array as $value) {
            $link_array[] = $func->xss_clean_get(strip_tags(($value)));
        }
		
		$new_site_title = SITE_TITLE;
		$new_site_keywords = SITE_KEYWORDS;
		$new_site_desc = SITE_DESC;
		$new_site_image = SITE_IMAGE;
		$image_mine="image/jpeg";
		$new_site_og_type = "website";
		
		$full_path_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		
		$query = "select `mt_tittle` ,`mt_keywords`,`mt_keywords` FROM `seo_pages`  where page_name = ? and status = 1";
		$query_val = array(end($link_array));
		$result_seo = $fun->SelectFromTable($query, $query_val);
		if(!empty($result_seo)){
			$new_site_title = $result_seo[0]['mt_tittle'];
			$new_site_keywords = $result_seo[0]['mt_keywords'];
			$new_site_desc = $result_seo[0]['mt_keywords'];
		}
		if (in_array('profile', $link_array)) {
			$pos = array_search('profile', $link_array);
			$artist_title_clean = array_slice($link_array, $pos + 1);
			$for_cmd = array_slice($link_array, $pos + 2);
			$cmd_title_clean = array_slice($link_array, $pos + 3);
			
			$title_clean = $fun->EscapeString($artist_title_clean[0]);
			$query_artist = "select 
							ad.artist_id,
							ad.name,
							ad.twitter_screen_name,
							ud.facebook_id,
							ud.gplus_id,
							ad.categories,
							ad.bio
							from artist_details as ad
							join user_details as ud
								on ad.user_id = ud.user_id
							where
								ud.status = ?
								AND ad.title_clean = ?";
			$query_val = array('1', $title_clean);
			$result = $fun->SelectFromTable($query_artist, $query_val);
			if(!empty($result)){
				foreach($result as $key=>$value){
					$categoriesx = explode(',', $value['categories']);
					$categories_array = array();
					foreach($categoriesx as $key_cat=>$value_categories){
						$query_cat = "select `artist_category_name` FROM `master_artist_category` where artist_category_id = ".$value_categories;
						$result_cat = $fun->SelectFromTable($query_cat);
						$categories_array[] = $result_cat[0]['artist_category_name'];
					}
					$result[$key]['categories'] = implode(', ', $categories_array);
					$image_path = "";
					if($value['facebook_id'] != ""){
						$image_path =  "https://graph.facebook.com/".$value['facebook_id']."/picture?type=large&width=210&height=210";
					}
					elseif($value['gplus_id'] != ""){
						$image_path = $func->google_image($value['gplus_id']);
						
					}
					elseif($value['twitter_id'] != ""){
						$image_path = "https://twitter.com/".$value['twitter_screen_name']."/profile_image?size=original";
					}
					if($image_path == ""){
						$image_path = SITE_PATH.'res/img/default_profile_pic.png';
					}
					$result[$key]['image'] = $image_path;
				}
			}
			$new_site_title = $result[0]['name'].'. '.SITE_TITLE;
			$new_site_keywords = $result[0]['categories'].', '.SITE_KEYWORDS;
			$new_site_desc = $result[0]['bio'].'. '.SITE_DESC;
			$new_site_image = $result[0]['image'];
			$new_site_og_type = "profile";
			$user_name = $result[0]['name'];
			
			if (in_array('songs', $link_array)) {
				if($cmd_title_clean[0] != ""){
					$query_artist_song = "select 
							audios.audio_title,
							audios.audio_image,
							audios.audio_image_mime,
							audios.audio_length
							from audios as audios
							join artist_details as ad
								on audios.user_id = ad.user_id
							join user_details as ud
								on audios.user_id = ud.user_id
							where
								ud.status = ?  AND 
								audios.audio_title_clean = ? AND  
								ad.title_clean = ?";
					$query_val = array('1',$fun->EscapeString($cmd_title_clean[0]),$title_clean);
					$result_artist_song = $fun->SelectFromTable($query_artist_song, $query_val);
					$new_site_title = $result_artist_song[0]['audio_title'].'- '.$new_site_title;
					//$new_site_image = base64_decode($result_artist_song[0]['audio_image']);
				}
			}
			
		}
	?>
	<title><?=ucfirst(html_entity_decode($new_site_title))?></title>
<!-- Facebook Share Start -->
	<meta property="fb:app_id" content="<?= FB_APP_ID ?>" />
	<meta property="og:url" content="<?= $full_path_url ?>" />
	<meta property="og:type" content="<?=$new_site_og_type?>" />
	<meta property="og:title" content="<?=ucfirst(html_entity_decode($new_site_title))?>" />
	<meta property="og:description" content="<?=html_entity_decode($new_site_desc)?>" />
	<meta property="og:image" content="<?=$new_site_image?>" />
	<meta property="og:image:type" content="<?=$image_mine?>" />
	<meta property="og:image:width" content="250" />
	<meta property="og:image:height" content="250" />
	<?php 
		if($new_site_og_type == "profile"){
	?>
	<meta property="profile:username" content="<?=$user_name?>" />
	<?php
		}
	?>
<!-- Facebook Share End -->
		
	<meta name="title" content="<?=html_entity_decode($new_site_title)?>" />
	<meta name="keywords" content="<?=html_entity_decode($new_site_keywords)?>" />
	<meta name="description" content="<?=html_entity_decode($new_site_desc)?>" />
	<meta name="google-site-verification" content="-AQzzr1KtYmQiHIUcP1b8BwQU-ZynhzGTQLGTqeKrOU" />
	<meta name="google-site-verification" content="rRO4H3VUyIZbbxP7PvZSDn3dzJ_nV9a6BiLZr8SJvnc" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<?php
	}
    
}