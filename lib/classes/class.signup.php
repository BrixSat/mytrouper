<?php

require_once SITE_FILE . 'lib/template.php';

class signup extends template{
    
        public function __construct() {
            parent::setTemplate('signup');
        } 
            
        public function handlePage(){
                echo $this->showHomePage();
        }
        
        public function showHomePage(){
                $head = new header('signup');
                $head->getHeader();
                parent::getTemplate();
                $foot = new footer();
                $foot->getFooter();
        }
}