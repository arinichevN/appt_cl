<?php

$af = function($p) {
	\sock\init($p['address'], $p['port']);
	\acp\requestSendI1List(ACP_CMD_CHANNEL_STOP, $p['item']);
	\sock\suspend();
};
