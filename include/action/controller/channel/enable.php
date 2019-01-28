<?php

namespace controller\channel;

class enable {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1List(ACP_CMD_CHANNEL_ENABLE, $p['item']);
        \sock\suspend();
    }

}
