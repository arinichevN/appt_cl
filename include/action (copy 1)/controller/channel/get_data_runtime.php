<?php

$af=function($p){
	\sock\init($p['address'], $p['port']);
	$acp_id=\acp\requestSendI1List(ACP_CMD_CHANNEL_GET_DATA_RUNTIME, $p['item']);
	$d = \acp\responseReadRows($acp_id);
	\sock\suspend();
	return $d;
};

