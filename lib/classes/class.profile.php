<?php

include SITE_FILE . 'lib/template.php';

class profile extends template {

    function __construct($page) {
        $func = new functions();
        parent::setTemplate($page);
    }

    public function handlePage($page) {
		if($_GET['action'] !=""){
			$this->handleAction($_GET['action']);
		}
		else {
			echo $this->showHomePage($page);
		}
    }

    public function showHomePage($page) {
        $head = new header($page);
        echo $head->getHeader();
        $index_temp = parent::getTemplate();
        $foot = new footer();
        echo $foot->getFooter();
    }
	
	public function handleAction($action, $profile_id, $page = '', $action_type=''){
		switch ($action) {
			case 'profile': {
					$return = $this->profile($profile_id);
					if($action_type != ""){
						echo $return;
					}
					else {
						return $return;
					}
					break;
				}
			case 'testimonials': {
					$return = $this->testimonials($profile_id);
					if($action_type != ""){
						echo $return;
					}
					else {
						return $return;
					}
					break;
				}
			case 'songsList': {
					$return = $this->songs_list();
					if($action_type != ""){
						echo $return;
					}
					else {
						return $return;
					}
					break;
				}
			case 'loadAssests': {
				if($_REQUEST['cmd'] == "photo"){
					$return = $this->photos();
				}
				else if($_REQUEST['cmd'] == "audio"){
					$return = $this->audios();
				}
				else if($_REQUEST['cmd'] == "video"){
					$return = $this->videos();
				}
					echo $return;
					break;
				}
			default : {
					header('location:' . SITE_PATH . '');
				}
		}
	}
	
	private function profile($title_clean){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$title_clean = $fun->EscapeString($title_clean);
		
		$query_artist = "select 
						ad.artist_id,
						ad.name,
						ad.twitter_screen_name,
						ud.user_id,
						ud.profile_id,
						ud.facebook_id,
						ud.twitter_id,
						ud.gplus_id,
						ad.categories,
						ad.hometown,
						ad.language,
						ad.bio,
						IF(ad.cover_photo IS NULL, '', CONCAT('".SITE_PATH."res/uploads/image/', ad.cover_photo)) as cover_photo
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
						$image_path =  "https://graph.facebook.com/".$value['facebook_id']."/picture?type=large&width=340&height=340";
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
				$query_video = "select count(video_id) as tot_videos FROM `videos` where user_id = ".$result[0]['user_id'];
				$query_video = $fun->SelectFromTable($query_video);
				$result[0]['tot_video'] = $query_video[0]['tot_videos'];
				
				$query_audio = "select count(audio_id) as tot_audios FROM `audios` where user_id = ".$result[0]['user_id'];
				$query_audio = $fun->SelectFromTable($query_audio);
				$result[0]['tot_audio'] = $query_audio[0]['tot_audios'];
				
				$query_image = "select count(image_id) as tot_image FROM `images` where user_id = ".$result[0]['user_id'];
				$query_image = $fun->SelectFromTable($query_image);
				$result[0]['tot_image'] = $query_image[0]['tot_image'];
			}
		return $result =  json_encode($result[0]);
	}
	
	private function testimonials($user_id){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$user_id = $fun->EscapeString($user_id);
		$query = "select 
						ad.testimonials_id,
						ad.testimonial,
						ad.testimonial_reference,
						IF(ad.testimonial_image IS NULL, '', CONCAT('".SITE_PATH."res/uploads/image/', ad.testimonial_image)) as testimonial_image
						from  testimonials as ad
						where
							ad.user_id = ?
							and ad.status = ? order by rand()";
		$query_val = array($user_id, '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(empty($result)){
			$result = array();
		}
		return $result =  json_encode($result);
	}
	
	private function audios($action_type =''){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$user_id = $fun->EscapeString($_REQUEST['user_id']);
		$getPage =  $_REQUEST['page'];
		if ($page =="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 10 . " , " . 10;
		$query = "select user_id from user_details where profile_id = ?";
		$query_val = array($user_id);
		$result = $fun->SelectFromTable($query, $query_val);
		$query = "select 
						audios.audio_id,
						audios.audio_file_name,
						audios.audio_length,
						audios.audio_title_clean,
						audios.audio_title,
						audios.audio_image,
						audios.audio_image_mime,
						ad.name,
						ad.title_clean
						from  audios as audios
						join artist_details as ad
							on audios.user_id = ad.user_id
						where
							audios.user_id = ?
							and audios.status = ? order by audio_id DESC".$limit;
		$query_val = array($result[0]['user_id'], '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(empty($result)){
			$result = array();
		}
		$result =  json_encode($result);
		if($action_type != ""){
			return $result;
		}
		else {
			$songs = json_decode($result);
			if(!empty($songs)){
				foreach($songs as $key=>$value){
					if($songs[$key]->audio_length != ""){
						$seconds = $songs[$key]->audio_length; 
					}
					else {
						$seconds = 210;
					}
					$hours = floor($seconds / 3600);
					$mins = floor($seconds / 60 % 60);
					$secs = floor($seconds % 60);
					
					if($hours != 0){
						$new_length = sprintf('%02d:%02d:%02d',  $hours, $mins, $secs);
					}
					else {
						$new_length = sprintf('%02d:%02d',  $mins, $secs);
					}
					if($songs[$key]->audio_title == ""){
						$songs[$key]->audio_title = "Song";
					}
			?>
			<div class="col-sm-6 col-md-6 p-x-0">
				<div class="post-box audio horizontal clearfix">
					<a href="<?=SITE_PATH.'profile/'.$songs[$key]->title_clean.'/songs/'.$songs[$key]->audio_title_clean?>" data-play="true" data-title="<?=$songs[$key]->audio_title?>" data-file="<?=SITE_PATH.'res/uploads/audio/'.$songs[$key]->audio_file_name?>" class="image-link play-icon col-xs-4" style="padding-left:0;">
					
						<?php 
							if($songs[$key]->audio_image_mime == ""){
						?>
								<img src="<?=SITE_PATH?>res/img/audio-album-art.gif" width="150" height="150" alt="">
							<?php } else {
								echo ('<img src="data:'.$songs[$key]->audio_image_mime.';base64,'.$songs[$key]->audio_image.'" width="150" height="150"/>');
							} ?>
					</a>
					<div class="extra-info">
						<p class="no-bottom"><a class="black-link" href="<?=SITE_PATH.'profile/'.$songs[$key]->title_clean.'/songs/'.$songs[$key]->audio_title_clean?>"><?=$songs[$key]->audio_title?></a></p>
						<p><span class="small">Duration: <?=$new_length?></span></p>
					</div>
				</div>
			</div>
			<?php
			  if($key == 9){
				  break;
			  }
				}
			}
			else{
				echo '<h4>No Audios Found</h4>';
			}
			if(count($songs)>9){
				?>
				<div class="clearfix"></div>
				<div class="box col-xs-12 text-center" id="audio_<?=($getPage+1)?>">
					<a class="button color no-bottom load_more" data-type="audio" data-page="<?=($getPage+1)?>">Load More Audios</a>
				</div>
			<?php } 
		}
	}
	
	private function photos($action_type =''){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$user_id = $fun->EscapeString($_REQUEST['user_id']);
		$getPage =  $_REQUEST['page'];
		if ($getPage=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 12 . " , " . 12;
		$query = "select user_id from user_details where profile_id = ?";
		$query_val = array($user_id);
		$result = $fun->SelectFromTable($query, $query_val);
		$query = "select 
						img.image_id,
						img.image,
						img.image_caption,
						ad.name
						from images as img
						join artist_details as ad
							on img.user_id = ad.user_id 
						where
							img.user_id = ?
							and img.status = ? order by image_id DESC".$limit;
		$query_val = array($result[0]['user_id'], '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(empty($result)){
			$result = array();
		}
		$result =  json_encode($result);
		if($action_type != ""){
			return $result;
		}
		else {
		    
			$photos = json_decode($result);
			if(!empty($photos)){
			    $counter = 1 ;
				foreach($photos as $key=>$value){
				?>
					<div class="box col-xs-4 col-sm-3 col-md-3 photos">
						<div class="thumb">
							<div class="photo">
								<a href="<?=$photos[$key]->image_id?>" class="square" style="background-size:cover; background-image: url('<?=SITE_PATH."res/uploads/image/".$photos[$key]->image?>')">
									<span class="info"><em class="arrow-right"></em></span>
								</a>
							</div>
						</div>
						<div class="lb-overlay" id="<?=$photos[$key]->image_id?>">
							<img src="<?=SITE_PATH."res/uploads/image/".$photos[$key]->image?>" alt="<?=$photos[$key]->name?> - <?=$photos[$key]->image_id?>" />
							<div>
								<h3><?=$photos[$key]->name?></h3>
								<p><?=$photos[$key]->image_caption?></p>
								<a href="#" class="lb-prev"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></a>
								<a href="#" class="lb-next"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
							</div>
							<a href="#page" data-action="true" class="lb-close">x Close</a>
						</div>
					</div>
				<?php
				    $counter++;
					if($key == 11){ 
					  break;
					}
				}
			}
			else{
				echo '<h4>No Photos Found</h4>';
			}
			if(count($photos)>11){
				?>
				<div class="clearfix"></div>
				<div class="box col-xs-12 text-center" id="photo_<?=($getPage+1)?>">
					<a class="button color no-bottom load_more" data-type="photo" data-page="<?=($getPage+1)?>">Load More Photos</a>
				</div>
			<?php } 
		}
	}
	
	private function videos($action_type = ''){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$user_id = $fun->EscapeString($_REQUEST['user_id']);
		$getPage =  $_REQUEST['page'];
		if ($getPage=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 10 . " , " . 10;
		$query = "select user_id from user_details where profile_id = ?";
		$query_val = array($user_id);
		$result = $fun->SelectFromTable($query, $query_val);
		$query = "select 
						ad.video_id,
						ad.video_link
						from  videos as ad
						where
							ad.user_id = ?
							and ad.status = ? order by video_id DESC".$limit;
		$query_val = array($result[0]['user_id'], '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(empty($result)){
			$result = array();
		}
		$result =  json_encode($result);
		if($action_type != ""){
			return $result;
		}
		else {
			$videos = json_decode($result);
			if(!empty($videos)){
				foreach($videos as $key=>$value){
					$video_id = explode('/', $videos[$key]->video_link);
					$video_id = end($video_id);
				
				?>
					<div class="box col-sm-6">
						<div class="video_thumb">
						    <iframe width="100%" height="200"
                            src="https://www.youtube.com/embed/<?=$video_id?>">
                            </iframe>
							<!--<a href="" data-video="<?=$videos[$key]->video_link?>"><img src="https://img.youtube.com/vi/<?=$video_id?>/mqdefault.jpg" style="width:100px; height:100px;"/></a>-->
						</div>
					</div>
				<?php
					if($key == 9){
					  break;
					}
				}
			}
			else{
				echo '<h4>No Video Found</h4>';
			}
			if(count($videos)>9){
				?>
				<div class="clearfix"></div>
				<div class="box col-xs-12 text-center" id="video_<?=($getPage+1)?>">
					<a class="button color no-bottom load_more" data-type="video" data-page="<?=($getPage+1)?>">Load More Videos</a>
				</div>
			<?php } 
		}
	}
	
	private function songs_list($action_type = ''){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$audio_info = new AudioInfo();
		$category_where = " AND ad.title_clean = '".$_REQUEST['profile']."'";
		if($_REQUEST['cmd_id'] != ""){
			$category_where .= " AND audios.audio_title_clean = '".$_REQUEST['cmd_id']."'";
		}
		$getPage = $_REQUEST['page'];
		if ($getPage =="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 12 . " , " . 12;
			$query_artist = "select 
						audios.audio_id,
						audios.audio_file_name,
						audios.audio_title_clean,
						audios.audio_title,
						audios.audio_image,
						audios.audio_image_mime,
						audios.audio_length,
						audios.audio_album,
						audios.audio_year,
						audios.audio_composer,
						audios.audio_genre,
						audios.audio_band,
						ad.name,
						ad.title_clean,
						ud.profile_id
						from audios as audios
						join artist_details as ad
							on audios.user_id = ad.user_id
						join user_details as ud
							on audios.user_id = ud.user_id
						where
							ud.status = ?";
		if($category_where != ""){
			$query_artist .= $category_where;
		}
		$query_artist .= $limit;
		$query_val = array('1');
		$result = $fun->SelectFromTable($query_artist, $query_val);
		if(!empty($result)){
			foreach($result as $key=>$value){
				$seconds = "";
				if($value['audio_length'] != ""){
					$seconds = $value['audio_length']; 
				}
				else {
					$seconds = 210;
				}
				$hours = floor($seconds / 3600);
				$mins = floor($seconds / 60 % 60);
				$secs = floor($seconds % 60);
				
				if($hours != 0){
					$new_length = sprintf('%02d:%02d:%02d',  $hours, $mins, $secs);
				}
				else {
					$new_length = sprintf('%02d:%02d',  $mins, $secs);
				}
				$result[$key]['audio_length'] = $new_length;
				
				if($value['audio_title'] == ""){
					$result[$key]['audio_title'] = $value['name']. "'s Song";
				}
				//unset($result[$key]['name']);
			}
		}
		else{
			$result = array();
		}
		$result =  json_encode($result);
		if(empty($result)){
			$result = array();
		}
		if($action_type != ""){
			return $result;
		}
		else {
			$songs = json_decode($result);
			if(!empty($songs)){
				foreach($songs as $key=>$value){
					
			
			?>
			<div class="col-xs-12 p-x-0">
				<div class="audio clearfix">
					<a href="<?=SITE_PATH.'profile/'.$songs[$key]->title_clean.'/songs/'.$songs[$key]->audio_title_clean?>" data-play="true" data-title="<?=$songs[$key]->audio_title?>" data-file="<?=SITE_PATH.'res/uploads/audio/'.$songs[$key]->audio_file_name?>" class="image-link play-icon col-xs-12 col-md-4 no-left">
						<?php 
							if($songs[$key]->audio_image_mime == ""){
						?>
								<img src="<?=SITE_PATH?>res/img/audio-album-art.gif" width="150" height="150" alt="">
							<?php } else {
								if($_REQUEST['cmd_id'] != ""){
            						$audio_info = $audio_info->Info(SITE_FILE.'res/uploads/audio/'.$songs[$key]->audio_file_name);
            						$audio_image = base64_encode($audio_info['comments']['picture'][0]['data']);
            						$audio_image_mime = $audio_info['comments']['picture'][0]['image_mime'];
            						echo ('<img src="data:'.$audio_image_mime.';base64,'.$audio_image.'" width="500" height="500"/>');
            					}
							} ?>
					</a>
					<div class="extra-info col-md-8">
						<h5 class="no-bottom"><a href="<?=SITE_PATH.'profile/'.$songs[$key]->title_clean.'/songs/'.$songs[$key]->audio_title_clean?>"><?= (strlen($songs[$key]->audio_title) > 48) ? substr($songs[$key]->audio_title,0,45).'...' : $songs[$key]->audio_title;?></a></h5>
						<div>Author: <a href="<?=SITE_PATH.'profile/'.$songs[$key]->title_clean?>"><?=$songs[$key]->name?></a></div>
						<?php if($_REQUEST['cmd_id'] != ""){
							if($songs[$key]->audio_album != ""){
								?>
								<div>Album: <?=$songs[$key]->audio_album?></div>
								<?php
							}
							if($songs[$key]->audio_year != ""){
								?>
								<div>Year: <?=$songs[$key]->audio_year?></div>
								<?php
							}
							if($songs[$key]->audio_composer != ""){
								?>
								<div>Composer: <?=$songs[$key]->audio_composer?></div>
								<?php
							}
							if($songs[$key]->audio_genre != ""){
								?>
								<div>Genere: <?=$songs[$key]->audio_genre?></div>
								<?php
							}
							if($songs[$key]->audio_band != ""){
								?>
								<div>Band: <?=$songs[$key]->audio_band?></div>
								<?php
							}
						}
						?>
						<div>Duration: <?=$songs[$key]->audio_length?></div>
						<div class="clear margin-1"></div>
                        <a href="<?=SITE_PATH.'profile/'.$songs[$key]->title_clean.'/songs/'.$songs[$key]->audio_title_clean?>" x data-play="true" data-title="<?=$songs[$key]->audio_title?>" data-file="<?=SITE_PATH.'res/uploads/audio/'.$songs[$key]->audio_file_name?>" class="button white"><i class="fa fa-play"></i> Play</a>
                        <!--<a href="#" class="button white"><i class="fa fa-share"></i> Share</a>-->
                        <div class="addthis_inline_share_toolbox_k9or"></div>
					</div>
				</div>
			</div>
			<div class="clear margin-2"></div>
			<?php
			  if($key == 11){
				  break;
			  }
				}
			}
			else{
				echo '<h4>No Audios Found</h4>';
			}
			if(count($songs)>11){
				?>
				<div class="box col-sm-12 text-center" id="songs_<?=($getPage+1)?>">
					<a class="button color no-bottom load_more" data-type="songs" data-page="<?=($getPage+1)?>">Load More Audios</a>
				</div>
			<?php } 
		}
	}
}
