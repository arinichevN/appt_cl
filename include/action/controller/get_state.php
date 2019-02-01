<?php

$af = function($p) {
	\sock\init($p['peer']['address'], $p['peer']['port'], 1);
	$id = \acp\requestSendCmd(ACP_CMD_APP_PING);
	$data = \acp\getBufParseStateData($id);
	\sock\suspend();
	return $data;
};
