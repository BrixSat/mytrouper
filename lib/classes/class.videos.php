<?php

include SITE_FILE . 'lib/template.php';

class videos extends template {

    function __construct() {
        $func = new functions();
        parent::setTemplate('videos');
    }

    public function handlePage() {
        echo $this->showHomePage();
    }

    public function showHomePage() {
        $head = new header('videos');
        echo $head->getHeader();
        $index_temp = parent::getTemplate();
        $foot = new footer();
        echo $foot->getFooter();
    }
	
	public function handleAction($action, $page = '', $filter = '',  $action_type=''){
		switch ($action) {
			case 'videoList': {
					$return = $this->video_list($page, $filter);
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
	
}
