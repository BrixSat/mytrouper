<?php

require_once SITE_FILE . 'lib/template.php';

class site_maintenance extends template{
    
        public function __construct() {
                parent::setTemplate('503');
        } 
            
        public function handlePage(){
                echo $this->showHomePage();
        }
        
        public function showHomePage(){
                parent::getTemplate();
                
        }
}