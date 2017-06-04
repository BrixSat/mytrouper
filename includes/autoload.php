<?php

function __autoload($class){
	//echo  SITE_FILE . 'lib/classes/class.' . $class . '.php';
    include  SITE_FILE . 'lib/classes/class.' . $class . '.php';
}


