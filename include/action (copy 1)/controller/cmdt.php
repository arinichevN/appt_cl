<?php

namespace controller;

class cmdt {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['peer']['address'], $p['peer']['port'],1);
        $id=\acp\requestSendCmd($p['cmd']);
        $data= \acp\responseReadText($id);
        \sock\suspend();
        return $data;
    }

}
