<?php

$af = function($p) {
	\sock\init($p['peer']['address'], $p['peer']['port'],1);
	\acp\requestSendCmd($p['cmd']);
	\sock\suspend();
};
