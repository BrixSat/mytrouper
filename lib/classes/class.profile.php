<?php

include SITE_FILE . 'lib/template.php';

class profile extends template {

    function __construct() {
        $func = new functions();
        parent::setTemplate('profile');
    }

    public function handlePage() {
		if($_GET['action'] !=""){
			$this->handleAction($_GET['action']);
		}
		else {
			echo $this->showHomePage();
		}
    }

    public function showHomePage() {
        $title = parent::getPageTitle();
        $keyword = parent::getSeoKeyword();
        $desc = parent::getSeoDescription();
        $head = new header('profile');
        echo $head->getHeader();
        $index_temp = parent::getTemplate();
        $foot = new footer();
        echo $foot->getFooter();
    }

	public function handleAction($action, $profile_id='', $page = '', $action_type=''){
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

	private function profile($profile_id){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$profile_id = $fun->EscapeString($profile_id);

		$query_artist = "select
						ad.artist_id,
						ad.name,
						ud.user_id,
						ud.profile_id,
						ud.facebook_id,
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
							AND ud.profile_id = ?";
		$query_val = array('1', $profile_id);
		$result = $fun->SelectFromTable($query_artist, $query_val);
			foreach($result as $key=>$value){
				$categoriesx = explode(',', $value['categories']);
				$categories_array = array();
				foreach($categoriesx as $key_cat=>$value_categories){
					$query_cat = "select `artist_category_name` FROM `master_artist_category` where artist_category_id = ".$value_categories;
					$result_cat = $fun->SelectFromTable($query_cat);
					$categories_array[] = $result_cat[0]['artist_category_name'];
				}
				$result[$key]['categories'] = implode(', ', $categories_array);
				if($value['facebook_id'] != ""){
					$image_path =  "https://graph.facebook.com/".$value['facebook_id']."/picture?type=large&width=340&height=340";
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
						ad.audio_id,
						ad.audio_file_name,
						ad.audio_length,
						ad.audio_title
						from  audios as ad
						where
							ad.user_id = ?
							and ad.status = ? order by audio_id DESC".$limit;
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
			<div class="post-box audio horizontal clearfix">
				<a href="#" data-play="true" data-title="<?=$songs[$key]->audio_title?> , <?=SITE_PATH.'res/uploads/audio/'.$songs[$key]->audio_file_name?>" class="image-link play-icon">
						<img src="<?=SITE_PATH?>res/img/audio-album-art.jpg" width="200" height="200" alt="">
					</a>
				<div class="extra-info">
					<p class="no-bottom"><?=$songs[$key]->audio_title?></p>
					<p><span class="small">Duration: <?=$new_length?></span></p>
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
				<div class="box col-sm-12 text-center" id="audio_<?=($getPage+1)?>">
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
				foreach($photos as $key=>$value){
				?>
					<div class="box col-xs-4 col-sm-3 col-md-2 photos">
						<div class="thumb">
							<div class="photo">
								<a href="<?=$photos[$key]->image_id?>" class="square" style="background-size:cover; background-image: url('<?=SITE_PATH."res/uploads/image/".$photos[$key]->image?>')">
									<span class="info"><em class="arrow-right"></em></span>
								</a>
							</div>
						</div>
						<div class="lb-overlay" id="<?=$photos[$key]->image_id?>">
							<img src="<?=SITE_PATH."res/uploads/image/".$photos[$key]->image?>" alt="image01" />
							<div>
								<h3><?=$photos[$key]->name?></h3>
								<p><?=$photos[$key]->image_caption?></p>
                <a href="#" class="lb-prev"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></a>
								<a href="#" class="lb-next"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>

							</div>
							<a href="#page" class="lb-close">x Close</a>
						</div>
					</div>
				<?php
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
				<div class="box col-sm-12 text-center" id="photo_<?=($getPage+1)?>">
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
					<div class="box col-xs-8 col-sm-7 col-md-6">
						<?=$video_id?>
						<div class="video_thumb">
						<a href="" data-video="<?=$videos[$key]->video_link?>"><img src="https://img.youtube.com/vi/<?=$video_id?>/mqdefault.jpg" style="width:100px; height:100px;"/></a>
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
				<div class="box col-sm-12 text-center" id="video_<?=($getPage+1)?>">
					<a class="button color no-bottom load_more" data-type="video" data-page="<?=($getPage+1)?>">Load More Videos</a>
				</div>
			<?php }
		}
	}
}
