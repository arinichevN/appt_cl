<?php

$af = function($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1F1List(ACP_CMD_SET_FLOAT, $p['item']);
        \sock\suspend();
};
