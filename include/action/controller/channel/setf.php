<?php

namespace controller\channel;

class setf {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1F1List(ACP_CMD_SET_FLOAT, $p['item']);
        \sock\suspend();
    }

}
