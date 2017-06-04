<?php

require_once SITE_FILE . 'lib/template.php';

class not_found extends template{
    
        public function __construct() {
                parent::setTemplate('404');
        } 
            
        public function handlePage(){
                echo $this->showHomePage();
        }
        
        public function showHomePage(){
                $head = new header('404');
                $head->getHeader();
                parent::getTemplate();
                $foot = new footer();
                $foot->getFooter();
        }
}