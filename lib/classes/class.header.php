<?php

class header extends template{

    function __construct($page) {
        
        parent::setTemplate('header');
    }
    
    public function getHeader(){
        $template = parent::getTemplate('header');
        return $template;
    }
    
}