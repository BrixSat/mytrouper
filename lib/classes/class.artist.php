<?php

include SITE_FILE . 'lib/template.php';

class artist extends template {

    function __construct() {
        $func = new functions();
        parent::setTemplate('artist');
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
        $head = new header('artist');
        echo $head->getHeader();
        $index_temp = parent::getTemplate();
        $foot = new footer();
        echo $foot->getFooter();
    }

	public function handleAction($action, $category = '', $filter = '', $page = '',  $action_type=''){
		switch ($action) {
			case 'artistsList': {
					$return = $this->artists_list($_REQUEST['category'], $_REQUEST['page']);
					if($action_type != ""){
						echo $return;
					}
					else {
						return $return;
					}
					break;
				}
			default : {
					header('location:' . SITE_PATH . '');
				}
		}
	}

	private function artists_list($categories='', $page = '', $action_type = ''){
		$fun = new DatabaseFunctions();
        $func = new functions();
		$category_where = "";
		$categories = $_REQUEST['category'];
		$artist_categoris = $func->artist_categoris();
		$categories = $fun->EscapeString($categories);
		if($categories != ""){
			foreach($artist_categoris as $key=>$value){
				$artst_category = $func->url_slug($value['artist_category_name']);
				if($artst_category == $categories){
					$artist_category_id = $value['artist_category_id'];
					break;
				}
			}
			$category_where = " and find_in_set('".$artist_category_id."',ad.categories) <> 0";
		}
		$getPage = $page;
		if ($getPage=="") {
            $getPage = 1;
        }
        $pageNumber = $getPage - 1;
        $limit = " LIMIT " . $pageNumber * 7 . " , " . 7;
		$query_artist = "select
						ad.artist_id,
						ad.name,
						ud.user_id,
						ud.profile_id,
						ud.facebook_id,
						ad.categories
						from artist_details as ad
						join user_details as ud
							on ad.user_id = ud.user_id
						where
							ud.status = ?";
		if($category_where != ""){
			$query_artist .= $category_where;
		}
		$query_artist .= $limit;
		$query_val = array('1');
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
					$image_path =  "https://graph.facebook.com/".$value['facebook_id']."/picture?type=large&width=434&height=434";
				}
				$result[$key]['image'] = $image_path;
			}

		$result =  json_encode($result);
		if(empty($result)){
			$result = array();
		}
		if($action_type != ""){
			return $result;
		}
		else {
			$artist = json_decode($result);
			if(!empty($artist)){
				foreach($artist as $key=>$value){
			?>
					<div class="box col-sm-6">
						<div class="post-box horizontal artist clearfix">
							<a href="<?=SITE_PATH.'profile/'.$value->profile_id?>" class="image-link arrow-icon col-xs-5" style="padding-left=0">
								<img src="<?=$value->image?>" alt="<?=$value->name?> at mytrouper.com"></a>
							<div class="extra-info">
								<p class="no-bottom">
									<span class="rating">
										<span class="fa fa-star-o rate"></span>
										<span class="fa fa-star-o"></span>
										<span class="fa fa-star-o"></span>
										<span class="fa fa-star-o"></span>
										<span class="fa fa-star-o"></span>
									</span>
								</p>
								<h6 class="meta no-bottom small"><?=$value->categories?></h6>
								<h5><a href="<?=SITE_PATH.'profile/'.$value->profile_id?>"><?=$value->name?></a></h5>
								<?php
									if(md5($value->user_id) == $_SESSION[INSTALLATION_KEY . 'user_id']){
								?>
									<a href="<?=SITE_PATH.'profile/'.$value->profile_id?>" class="button small filled no-bottom book-btn">You</a>
								<?php
									}
									else {
								?>
									<a href="<?=SITE_PATH.'profile/'.$value->profile_id?>" class="button small filled no-bottom book-btn">Book<span class="hidden-xs"> Now</span></a>
								<?php
									}
								?>

							</div>
						</div>
					</div>
			<?php
					if($key == 5){
					  break;
					}
				}
			}
			else {
				?>
					<div class="box col-sm-12 text-center">
						No Artist to Load
					</div>
				<?php
			}
			if(count($artist)>6){
			?>
			<div class="box col-sm-12 text-center" id="artist_<?=($getPage+1)?>">
				<a class="button color no-bottom load_more" data-type="artist" data-page="<?=($getPage+1)?>">Load More Artist</a>
			</div>
			<?php } ?>
		<?php
		}
	}
}
