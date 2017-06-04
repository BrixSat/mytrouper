<?php

class template{
    
        private $pageTitle = '';
        private $pageTemplate = '';
        private $pageKeyword = '';
        private $pageDescription = '';
        
        public function setPageTitle($Title){
                $this->pageTitle = $Title;
        }
        public function getPageTitle() {
                return $this->pageTitle;
        }
        public function setSeoKeyword($Keyword){
                $this->pageKeyword = $Keyword;
        }
        public function getSeoKeyword() {
                return $this->pageKeyword;
        }
        public function setSeoDescription($Desc){
                $this->pageDescription = $Desc;
        }
        public function getSeoDescription() {
                return $this->pageDescription;
        }
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