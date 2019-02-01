<?php

$af = function($p) {
	\sock\init($p['peer']['address'], $p['peer']['port'],1);
	$id=\acp\requestSendCmd($p['cmd']);
	$data= \acp\responseReadText($id);
	\sock\suspend();
	return $data;
};
