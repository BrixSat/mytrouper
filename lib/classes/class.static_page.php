<?php

include SITE_FILE . 'lib/template.php';

class static_page extends template {

    function __construct($page) {
        $func = new functions();
        parent::setTemplate($page);
    }

    public function handlePage($page) {
        echo $this->showHomePage($page);
    }

    public function showHomePage($page) {
        $head = new header($page);
        echo $head->getHeader();
        $index_temp = parent::getTemplate();
        $foot = new footer();
        echo $foot->getFooter();
    }
}
