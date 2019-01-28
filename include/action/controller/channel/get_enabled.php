<?php

namespace controller\channel;

class get_enabled {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        $id=\acp\requestSendI1List(ACP_CMD_CHANNEL_GET_ENABLED, $p['item']);
        $data = \acp\responseReadRows($id);
        \sock\suspend();
        return $data;
    }

}