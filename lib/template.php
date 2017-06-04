<?php

class template{
	
        private $pageTemplate = '';
        
        public function setTemplate($template) {
                $this->pageTemplate = $template;
        }
        public function getTemplate() {
            require_once SITE_FILE . 'theme/templates/' . $this->pageTemplate . '.phtml';
        } 
        public function parseTemplate($template) {
                require_once SITE_FILE . 'theme/templates/' . $template . '.phtml';
        } 

}