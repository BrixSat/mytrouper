<?php
class footer extends template{
    
        public function __construct() {	
            parent::setTemplate('footer');;
        }
        public function getFooter(){
            $template = parent::getTemplate();
            $template = str_ireplace('%%SITE_PATH%%', trim('%%SITE_PATH%%', '%'), $template);
            return $template;
        }
    
}