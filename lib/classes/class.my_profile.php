<?php

include SITE_FILE . 'lib/template.php';

class my_profile extends template {

    function __construct($template_page) {
        parent::setTemplate($template_page);
    }
	

    public function handlePage($template_page) {
		if($_GET['action'] !=""){
			$this->handleAction($_GET['action']);
		}
		else {
			echo $this->showHomePage($template_page);
		}
    }
	
    private function showHomePage($template_page) {
        $head = new header($template_page);
        echo $head->getHeader();
        $index_temp = parent::getTemplate();
        $foot = new footer();
        echo $foot->getFooter();
    }
	
	public function handleAction($action, $action_type=''){
		switch ($action) {
			case 'artistDetails': {
					$return = $this->artist_details();
					if($action_type != ""){
						echo $return;
					}
					else {
						return $return;
					}
					break;
				}
			case 'artistDetailsInsert': {
				$return = $this->artistDetailsInsert();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'audioUpload': {
				$return = $this->audio_upload();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'videoUpload': {
				$return = $this->video_upload();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'artistImageInsert': {
				$return = $this->artist_image_insert();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'artistTestiInsert': {
				$return = $this->artist_testi_insert();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'artistPriceInsert': {
				$return = $this->artist_price_insert();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'artistPriceDetails': {
				$return = $this->artist_price_details();
				if($action_type != ""){
					echo $return;
				}
				else {
					return $return;
				}
				break;
			}
			case 'listDisplay': {
				if($_REQUEST['cmd'] == "image"){
					$return = $this->image_list_display();
				}
				else if($_REQUEST['cmd'] == "testi"){
					$return = $this->testi_list_display();
				}
				else if($_REQUEST['cmd'] == "audio"){
					$return = $this->audio_list_display();
				}
				else if($_REQUEST['cmd'] == "video"){
					$return = $this->video_list_display();
				}
				break;
			}
			case 'deleteArtistAssests': {
				$return = $this->delete_assest($_REQUEST['cmd'], $_REQUEST['data_id']);
				break;
			}
			default : {
					header('location:' . SITE_PATH . '');
				}
		}
	}
	
	private function artist_details(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$query = "select 
						ad.artist_id,
						ad.name,
						ad.email,
						ad.mobile,
						ad.hometown,
						ad.language,
						ad.bio,
						ad.tnc_agreement,
						ad.categories,
						ud.status as ud_status,
						IF(ad.cover_photo IS NULL, '', CONCAT('".SITE_PATH."res/uploads/image/', ad.cover_photo)) as cover_photo
						from artist_details as ad
						join user_details as ud
							on ad.user_id = ud.user_id
						where
							md5(ad.user_id) = ?
							and ud.status != ?";
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id'], '0');
		$result = $fun->SelectFromTable($query, $query_val);
		return $result =  json_encode($result[0]);
	}
	
	private function artistDetailsInsert(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$categories = implode(',', $_REQUEST['category']);
		$uploaddir = 'res/uploads/image/';
		$filename = array($_FILES['cover_photo']);
		$upload_file = "";
		if($_FILES['cover_photo']['name'] != ""){
			$file_name = $func->upload_simple_files($filename, $uploaddir, 'images', 'cover');
			$upload_file = " , cover_photo = '".$file_name."'";
			$query = "select cover_photo from artist_details where md5(user_id) = ?";
			$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
			$result = $fun->SelectFromTable($query, $query_val);
			if(!empty($result)){
				$unlink_file = $uploaddir.$result[0]['cover_photo'];
				unlink($unlink_file);
			}
		}
		$title_clean_insert = "";
		if($_SESSION[INSTALLATION_KEY . 'status'] == 2){
			$title_clean = $func->url_slug($_REQUEST['name']);
			$query_title = "select title_clean from artist_details where `title_clean` = ?";
			$query_val_title = array($title_clean);
			$result_title = $fun->SelectFromTable($query_title, $query_val_title);
			if(!empty($result_title)){
				$title_clean = $title_clean.rand(1,99);
			}
			$title_clean_insert = " , title_clean = '".$title_clean."'";
		}
		
		$query = "UPDATE artist_details SET name = ?, email = ?, mobile = ? , hometown = ? , language = ?, bio = ? , tnc_agreement = ?, categories = ? ".$upload_file." ".$title_clean_insert." WHERE  md5(user_id) = ? ";
		
		$val_artist = array('name' => $fun->EscapeString($_REQUEST['name']), 'email' =>$fun->EscapeString($_REQUEST['email']), 'mobile' =>$fun->EscapeString($_REQUEST['mobile']), 'hometown' =>$fun->EscapeString($_REQUEST['hometown']), 'language' =>$_REQUEST['language'], 'bio' =>$_REQUEST['bio'], 'tnc_agreement' =>$_REQUEST['tnc'], 'categories' =>$categories, 'user_id' =>$fun->EscapeString($_SESSION[INSTALLATION_KEY . 'user_id']));
		$res = $fun->DatabaseQuery($query, $val_artist);
		if($res){
			$query1 = "UPDATE user_details SET status = 1 WHERE  md5(user_id) = '".$_SESSION[INSTALLATION_KEY . 'user_id']."'";
			$res1 = $fun->DatabaseQuery($query1);
			echo 1;
		}
		else{
			echo 0;
		}
	}
	
	
	
	private function artist_image_insert(){
        try {
			ini_set('memory_limit', '512M');
			//ini_set('max_execution_time', 0);
            $file_path = '';
            $base64img = $_REQUEST['op'];
            $FileName = $_REQUEST['Name'];
            $Extention = trim($_REQUEST['Extention']);
            $caption = $_REQUEST['caption'];
			//print_r($_REQUEST);die;
            define('UPLOAD_DIR', 'res/uploads/image/');
            $file = "";

            if ($Extention == ".jpg") {
                $base64img = str_replace('data:image/jpeg;base64,', '', $base64img);
                $data = base64_decode($base64img);
                $file = UPLOAD_DIR . 'photo_' . time() . rand() . '.jpg';
            } else if ($Extention == ".png") {
                $base64img = str_replace('data:image/png;base64,', '', $base64img);
                $data = base64_decode($base64img);
                $file = UPLOAD_DIR . 'photo_' . time() . rand() . '.png';
            } else if ($Extention == ".jpeg") {
                $base64img = str_replace('data:image/jpeg;base64,', '', $base64img);
                $data = base64_decode($base64img);
                $file = UPLOAD_DIR . 'photo_' . time() . rand() . '.jpg';
            } else if ($Extention == ".gif") {
                $base64img = str_replace('data:image/gif;base64,', '', $base64img);
                $data = base64_decode($base64img);
                $file = UPLOAD_DIR . 'photo_' . time() . rand() . '.gif';
            } else {
                echo json_encode(array('error' => 'extention'));
                die;
            }

            $file_array = explode('/', $file);
            $filenamefordb = $file_name = end($file_array);
            file_put_contents($file, $data);
            if ($Extention != '.gif') {
                $width = 960;
                $height = 960;
                $array = getimagesize($file);
                list($width_orig, $height_orig) = getimagesize($file);
				if($width<$width_orig and $height<$height_orig){
					$ratio_orig = $width_orig / $height_orig;
					if ($width / $height > $ratio_orig) {
						$width = $height * $ratio_orig;
					} else {
						$height = $width / $ratio_orig;
					}
				}
				else {
					$width = $width_orig;
					$height = $height_orig;
				}

                $imgString = file_get_contents($file);
                $img_r = imagecreatefromstring($imgString);
                $image_p = imagecreatetruecolor($width, $height);
                if ($array['mime'] == 'image/jpeg') {
                    $image = imagecreatefromjpeg($file);
                } elseif ($array['mime'] == 'image/gif') {
                    $image = imagecreatefromgif($file);
                } elseif ($array['mime'] == 'image/png') {
                    $image = imagecreatefrompng($file);
                } elseif ($array['mime'] == 'image/jpg') {
                    $image = imagecreatefromjpeg($file);
                }

                imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

                if ($img_r !== false) {
                    $resp = imagejpeg($image_p, $file, 75);
                    imagedestroy($img_r);

					$filenamefordb = $file_name;
                    $file_name = UPLOAD_DIR . $file_name;
					
                } else {
                    echo 'An error occurred.';
                    die;
                }
            } 

            $fun = new DatabaseFunctions();
            $file_path = $file_name;

			$query = "select user_id from user_details where md5(user_id) = ?";
			$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
			$result = $fun->SelectFromTable($query, $query_val);

            $image_upload = array(
                'image' => $filenamefordb,
                'image_caption' => $caption,
                'user_id' => $result[0]['user_id']
            );
           
            $id = $fun->InsertToTable('images', $image_upload);

            if ($id) {
                 echo 1;
            }
            $base64img = '';
            $FileName = '';
            $Extention = '';
        } catch (Exception $ex) {
            echo $ex->getMessage();
        }
	}
	
	private function artist_testi_insert(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$uploaddir = 'res/uploads/image/';
		
		$query = "select user_id from user_details where md5(user_id) = ?";
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
		$result = $fun->SelectFromTable($query, $query_val);
		
		$filename = array($_FILES['testi_image']);
		$upload_file = "";
		if($_FILES['testi_image']['name'] != ""){
			$file_name = $func->upload_simple_files($filename, $uploaddir, 'images', 'testimonial');
			$insert = array(
				'testimonial_image' => $file_name,
				'testimonial_reference' => $_REQUEST['testi_courtesy'],
				'testimonial' => $_REQUEST['testimonial'],
				'user_id' => $result[0]['user_id']
			);
			$id = $fun->InsertToTable('testimonials', $insert);
		}
		else if($_REQUEST['testi_courtesy']!="" and $_REQUEST['testimonial'] !=""){
			$insert = array(
				'testimonial_reference' => $_REQUEST['testi_courtesy'],
				'testimonial' => $_REQUEST['testimonial'],
				'user_id' => $result[0]['user_id']
			);
			$id = $fun->InsertToTable('testimonials', $insert);
		}
		if($id){
			echo 1;
		}
		else{
			echo 0;
		}
	}
	
	private function audio_upload(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$audio_info = new AudioInfo();
		$uploaddir = 'res/uploads/audio/';
		$filename = array($_FILES['audio_file']);
		$upload_file = "";
		$query = "select user_id from user_details where md5(user_id) = ?";
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
		$result = $fun->SelectFromTable($query, $query_val);
		if($_FILES['audio_file']['name'] != ""){
			$file_name = $func->upload_simple_files($filename, $uploaddir, 'audio', 'audio');
			
			$audio_info = $audio_info->Info($uploaddir."".$file_name);
			
			$audio_description = $fun->EscapeString($_REQUEST['audio_title']);
			
			$audio_length = $audio_info['playing_time'];
			$audio_title = $audio_info['tags']['id3v2']['title'][0];
			$audio_artist = $audio_info['tags']['id3v2']['artist'][0];
			$audio_album = $audio_info['tags']['id3v2']['album'][0];
			$audio_year = $audio_info['tags']['id3v2']['year'][0];
			$audio_composer = $audio_info['tags']['id3v2']['composer'][0];
			$audio_genre = $audio_info['tags']['id3v2']['genre'][0];
			$audio_band = $audio_info['tags']['id3v2']['band'][0];
			$audio_image = base64_encode($audio_info['comments']['picture'][0]['data']);
			$audio_image_mime = $audio_info['comments']['picture'][0]['image_mime'];
			
			$audio_title_clean = $func->url_slug($audio_title);
			$query_title = "select audio_title_clean from audios where `audio_title_clean` = ?";
			$query_val_title = array($audio_title_clean);
			$result_title = $fun->SelectFromTable($query_title, $query_val_title);
			if(!empty($result_title)){
				$audio_title_clean = $audio_title_clean.rand(1,99);
			}
			$title_clean_insert = array( 'audio_title_clean' => $audio_title_clean);
			
			$insert = array(
				'audio_file_name' => $file_name,
				'audio_description' => $audio_description,
				'audio_length' => $audio_length,
				'audio_title' => $audio_title,
				'audio_artist' => $audio_artist,
				'audio_album' => $audio_album,
				'audio_year' => $audio_year,
				'audio_composer' => $audio_composer,
				'audio_genre' => $audio_genre,
				'audio_band' => $audio_band,
				'audio_image' => $audio_image,
				'audio_image_mime' => $audio_image_mime,
				'user_id' => $result[0]['user_id']
			);
			$insert = array_merge($insert, $title_clean_insert);
			$id = $fun->InsertToTable('audios', $insert);
			if($id){
				echo 1;
			}
			else{
				echo 0;
			}
		}
	}
	
	private function video_upload(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$query = "select user_id from user_details where md5(user_id) = ?";
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
		$result = $fun->SelectFromTable($query, $query_val);
		if($_REQUEST['video_link'] != ""){
			$insert = array(
				'video_link' => $_REQUEST['video_link'],
				'user_id' => $result[0]['user_id']
			);
			$id = $fun->InsertToTable('videos', $insert);
			if($id){
				echo 1;
			}
			else{
				echo 0;
			}
		}
	}
	
	private function image_list_display(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$getPage =  $_REQUEST['page'];
		if ($_REQUEST['page']=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 12 . " , " . 12;
		$query = "select 
						img.image_id,
						img.image,
						img.image_caption,
						ad.name
						from images as img
						join artist_details as ad
							on img.user_id = ad.user_id 
						where
							md5(img.user_id) = ?
							and img.status = ? order by image_id DESC".$limit;
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id'], '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(!empty($result)){
			foreach($result as $key=>$value){
				?>
				
					<div class="col-xs-4">
						<div class="thumb">
							<div class="photo">
								<a href="#image-<?=$value['image_id']?>" class="square" style="background-size:cover; background-image: url('<?=SITE_PATH."res/uploads/image/".$value['image']?>')">
								</a>
								<button class="remove_assets col-xs-12" data-id="<?=$value['image_id']?>" data-type="image"><span class="fa fa-trash"></span></button>
							</div>
						</div>
						<div class="lb-overlay" id="image-<?=$value['image_id']?>">
							<img src="<?=SITE_PATH."res/uploads/image/".$value['image']?>" alt="image01" />
							<div>
								<h3><?=$value['name']?></h3>
								<p><?=$value['image_caption']?></p>
								<?php 
									
								?>
								<!--<a href="#image-10" class="lb-prev">Prev</a>
								<a href="#image-2" class="lb-next">Next</a>-->
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
				echo '<h6 class="text-center text-red">No Photos Found</h6>';
			}
			if(count($result)>11){
				?>
				<div class="box col-sm-12 text-center" id="image_<?=($getPage+1)?>">
					<a class="button color no-bottom load_more" data-type="image" data-page="<?=($getPage+1)?>">Load More Photos</a>
				</div>
			<?php } 
	}
 
	private function testi_list_display(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$getPage =  $_REQUEST['page'];
		if ($_REQUEST['page']=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 10 . " , " . 10;
		$query = "select 
						ad.testimonials_id,
						ad.testimonial,
						ad.testimonial_reference,
						ad.testimonial_image
						from  testimonials as ad
						where
							md5(ad.user_id) = ?
							and ad.status = ? order by testimonials_id DESC".$limit;
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id'], '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(!empty($result)){
			foreach($result as $key=>$value){
				?>
				<li class="pl-list" data-track="0">
					<div class="pl-list__track">
						<div class="fa fa-comments-o"></div>
					</div>
					<div class="pl-list__title"> <?=$value['testimonial']?></div>
					<button class="pl-list__remove remove_assets" data-id="<?=$value['testimonials_id']?>" data-type="testi"><span class="fa fa-trash"></span></button>
				</li>
				<?php
			}
		}
		else { 
		    echo '<h6 class="text-center text-red">No Testimonial Found</h6>';
		}
	}
	
	private function audio_list_display(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$getPage =  $_REQUEST['page'];
		if ($getPage=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 10 . " , " . 10;
		$query = "select 
						ad.audio_id,
						ad.audio_file_name,
						ad.audio_length,
						ad.audio_image,
						ad.audio_image_mime,
						ad.audio_title_clean,
						ad.audio_title
						from  audios as ad
						where
							md5(ad.user_id) = ?
							and ad.status = ? order by audio_id DESC".$limit;
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id'], '1');
		$result = $fun->SelectFromTable($query, $query_val);
		if(!empty($result)){
			foreach($result as $key=>$value){
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
				if($value['audio_title'] == ""){
					$value['audio_title'] = "Song";
				}
				?>
				
				<div class="col-xs-11 p-x-0">
					<div class="post-box audio-list horizontal clearfix">
						<a data-play="true" data-title="<?=$value['audio_title']?>" data-file="<?=SITE_PATH.'res/uploads/audio/'.$value['audio_file_name']?>"  class="image-link play-icon col-xs-4">
							<?php 
							if($value['audio_image_mime'] == ""){
						?>
								<img src="<?=SITE_PATH?>res/img/audio-album-art.gif" width="150" height="150" alt="">
							<?php } else {
								echo ('<img src="data:'.$value['audio_image_mime'].';base64,'.$value['audio_image'].'" width="150" height="150"/>');
							} ?>
						</a>
						<div class="extra-info">
							<p class="no-bottom"><?=$value['audio_title']?></p>
							<p><span class="small">Duration: <?=$new_length?></span></p>
						</div>
					</div>
				</div>
				<a class="remove_assets col-xs-1 no-bottom text-red" data-id="<?=$value['audio_id']?>" data-type="audio"><span class="fa fa-trash"></span></a>
				<div class="clearfix"></div>
				<?php
				if($key == 9){
					break;
				}
			}
		}
		else { 
			echo '<h6 class="text-center text-red">No Audio Found</h6>';
		}
		if(count($result)>9){
			?>
			<div class="box col-sm-12 text-center" id="audio_<?=($getPage+1)?>">
				<a class="button color no-bottom load_more" data-type="audio" data-page="<?=($getPage+1)?>">Load More Audios</a>
			</div>
		<?php } 
	}
	
	private function video_list_display(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$getPage =  $_REQUEST['page'];
		if ($getPage=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 10 . " , " . 10;
		$query = "select 
						ad.video_id,
						ad.video_link
						from  videos as ad
						where
							md5(ad.user_id) = ?
							and ad.status = ? order by video_id DESC".$limit;
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id'], '1');
		$videos = $fun->SelectFromTable($query, $query_val);
		if(!empty($videos)){
			foreach($videos as $key=>$value){
				$video_id = explode('/', $value['video_link']);
				$video_id = end($video_id);
			
			?>
				<div class="col-sm-4 col-md-4">
					<div class="box clearfix">
					<?=$video_id?>
					<div class="video_thumb">
						<a href="" data-video="<?=$value['video_link']?>"><img src="https://img.youtube.com/vi/<?=$video_id?>/mqdefault.jpg" style="width:100px; height:100px;"/></a>
						<button class="remove_assets" data-id="<?=$value['video_id']?>" data-type="video"><span class="fa fa-trash"></span></button>
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
			echo '<h6 class="text-center text-red">No Video Found</h6>';
		}
		if(count($videos)>9){
			?>
			<div class="box col-sm-12 text-center" id="video_<?=($getPage+1)?>">
				<a class="button color no-bottom load_more" data-type="video" data-page="<?=($getPage+1)?>">Load More Videos</a>
			</div>
		<?php } 
	}
	
	private function artist_price_insert(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$query = "select user_id from user_details where md5(user_id) = ?";
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
		$result = $fun->SelectFromTable($query, $query_val);
		$query_price = "select artist_pricing_id from artist_pricing where user_id = '".$result[0]['user_id']."'";
		$result_price = $fun->SelectFromTable($query_price);
		if(empty($result_price)){
			$insert = array(
				'pricing_type' => $_REQUEST['pricing_type'],
				'price_depand' => $_REQUEST['pricing_format'],
				'artist_price' => $_REQUEST['pricing'],
				'hands' => $_REQUEST['hands'],
				'hands_price' => $_REQUEST['hands_price'],
				'supportive' => $_REQUEST['supportive'],
				'supportive_price' => $_REQUEST['supportive_price'],
				'transportation' => $_REQUEST['transportation'],
				'transportation_price' => $_REQUEST['transportation_price'],
				'accommodation' => $_REQUEST['accommodation'],
				'accommodation_price' => $_REQUEST['accommodation_price'],
				'outstation' => $_REQUEST['outstation'],
				'outstation_price' => $_REQUEST['outstation_price'],
				'user_id' => $result[0]['user_id']
			);
			$id = $fun->InsertToTable('artist_pricing', $insert);
			if($id){
				echo 1;
			}
			else{
				echo 0;
			}
		}
		else{
			$query = "UPDATE artist_pricing SET 
							pricing_type = ?,  
							price_depand = ?,  
							artist_price = ?,  
							hands = ?,  
							hands_price = ?,  
							supportive = ?,  
							supportive_price = ?,  
							transportation = ?,  
							transportation_price = ?,  
							accommodation = ?,  
							accommodation_price = ?,  
							outstation = ?,  
							outstation_price = ?  
						WHERE  md5(user_id) = ? ";
			$val_artist = array(
				'pricing_type' => $fun->EscapeString($_REQUEST['pricing_type']), 
				'price_depand' => $fun->EscapeString($_REQUEST['pricing_format']), 
				'artist_price' => $fun->EscapeString($_REQUEST['pricing']), 
				'hands' => $fun->EscapeString($_REQUEST['hands']), 
				'hands_price' => $fun->EscapeString($_REQUEST['hands_price']), 
				'supportive' => $fun->EscapeString($_REQUEST['supportive']), 
				'supportive_price' => $fun->EscapeString($_REQUEST['supportive_price']), 
				'transportation' => $fun->EscapeString($_REQUEST['transportation']), 
				'transportation_price' => $fun->EscapeString($_REQUEST['transportation_price']), 
				'accommodation' => $fun->EscapeString($_REQUEST['accommodation']), 
				'accommodation_price' => $fun->EscapeString($_REQUEST['accommodation_price']), 
				'outstation' => $fun->EscapeString($_REQUEST['outstation']), 
				'outstation_price' => $fun->EscapeString($_REQUEST['outstation_price']), 
				'user_id' =>$fun->EscapeString($_SESSION[INSTALLATION_KEY . 'user_id'])
			);
			$res = $fun->DatabaseQuery($query, $val_artist);
			if($res){
				echo 1;
			}
			else{
				echo 0;
			}
		}
	}
	
	private function artist_price_details(){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$query = "select 
						*
						from artist_pricing as ap
						where
							md5(ap.user_id) = ?";
		$query_val = array($_SESSION[INSTALLATION_KEY . 'user_id']);
		$result = $fun->SelectFromTable($query, $query_val);
		return $result =  json_encode($result[0]);
	}
	
	private function delete_assest($cmd, $data_id){
		$fun = new DatabaseFunctions();
        $func = new functions();
		if($cmd == 'image'){
			$table = 'images';
			$where = "image_id = '".$data_id."'";
		}
		elseif($cmd == 'testi'){
			$table = 'testimonials';
			$where = "testimonials_id = '".$data_id."'";
		}
		elseif($cmd == 'audio'){
			$table = 'audios';
			$where = "audio_id = '".$data_id."'";
		}
		elseif($cmd == 'video'){
			$table = 'videos';
			$where = "video_id = '".$data_id."'";
		}
		$query = "DELETE FROM ".$table." WHERE ".$where;
		$res = $fun->DatabaseQuery($query);
		if($res){
			echo 1;
		}
		else {
			echo 0;
		}
	}
}
