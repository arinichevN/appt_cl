<?php

class get_peer {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \db\init(DB_PATH_PUBLIC);
        $q = "select id, port, ip_addr from peer";
        $data = \db\getDataAll($q);
        \db\suspend();
        return $data;
    }

}
