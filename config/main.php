<?php

define('DB_PATH_PUBLIC', '/etc/controller/public.db');
define('DB_PATH_LOG', '/media/bb_usb/log.db');
function f_getConfig() {
    return [
        'db' => [
            'use' => 'l'
        ],
        'acp' => [
            'use' => '1'
        ],
        'sock' => [
            'use' => '1'
        ],
        'session' => [
            'use' => '4',
        ],
        'check' => [
            'use' => [1],
        ]
    ];
}
