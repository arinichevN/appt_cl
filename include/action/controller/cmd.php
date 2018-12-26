<?php

namespace controller;

class cmd {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['peer']['address'], $p['peer']['port'],1);
        \acp\requestSendCmd($p['cmd']);
        \sock\suspend();
    }

}
