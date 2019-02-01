<?php

ini_set('display_errors',1);
error_reporting(E_ALL|E_STRICT);
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
