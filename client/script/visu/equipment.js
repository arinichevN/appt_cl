function Equipment() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
    this.data = [
        {app_id: 'gwu18', board_id: 'module1'},
        {app_id: 'gwu22', board_id: 'module1'},
        {app_id: 'gwu66', board_id: 'module1'},
        {app_id: 'regonf', board_id: 'module1'},
        {app_id: 'lck', board_id: 'module1'},
        {app_id: 'gwu74', board_id: 'module1'},
        {app_id: 'lgr', board_id: 'module1'},
        {app_id: 'alp', board_id: 'module1'},
        {app_id: 'alr', board_id: 'module1'},
        {app_id: 'gwu59', board_id: 'module1'},
        {app_id: 'obj', board_id: 'module1'},
        {app_id: 'stp', board_id: 'module1'},
        {app_id: 'swr', board_id: 'module1'},
        {app_id: 'swf', board_id: 'module1'},
        {app_id: 'obj', board_id: 'module1'},
         {app_id: 'd62', board_id: 'module2'},
        {app_id: 'regsmp', board_id: 'module1'}

    ];
    this.board = [
        {id: 'module1', address: '127.0.0.1', description: "локальная тестовая машина"},
        {id: 'module2', address: '192.168.0.102', description: "remote maschine"}
    ];
    this.app = [
        {id: 'gwu18', port: 49161, description: 'чтение с датчиков температуры DS18B20'},
        {id: 'gwu22', port: 49162, description: 'чтение с датчиков температуры и влажности DHT22'},
        {id: 'gwu66', port: 49166, description: 'чтение с термопар К-типа через MAX6675'},
        {id: 'gwu74', port: 49163, description: 'управление исполнительными механизмами'},
        {id: 'gwu59', port: 49164, description: 'GSM модем (звонки, СМС)'},
        {id: 'gwum', port: 49165, description: 'группировка нескольких датчиков в один'},
        {id: 'lck', port: 49175, description: 'блокировка исполнительных механизмов'},
        {id: 'regonf', port: 49191, description: 'регулирование температуры и влажности'},
        {id: 'regsmp', port: 49192, description: 'регулирование температуры и влажности'},
        {id: 'lgr', port: 49172, description: 'регистрация показаний датчиков'},
        {id: 'alp', port: 49175, description: 'контроль оборудования'},
        {id: 'stp', port: 49179, description: 'шаговый задатчик'},
        {id: 'obj', port: 49178, description: 'модель материи'},
        {id: 'swr', port: 49183, description: 'надежный коммутатор'},
        {id: 'swf', port: 49182, description: 'быстрый коммутатор'},
        {id: 'd62', port: 49162, description: 'deamon'},
        {id: 'alr', port: 49174, description: 'контроль показаний датчиков'}
    ];

    this.ACTION =
            {
                CONTROLLER: {
                    CMD: 11,
                    CMDT: 12,
                    GET_STATE: 13
                }
            },
    this.CATCH = {APP: 1, PROG: 2};
    this.initialized = false;
    this.update = true; //editor will make it false
    this.visible = false;

    this.startB = null;
    this.stopB = null;
    this.resetB = null;
    this.stateB = null;
    this.dataB = null;
    this.helpB = null;
    this.bb = null;
    this.progE = null;
    this.textE = null;
    this.peerE = null;

    this.init = function () {
        try {
            var self = this;
            this.container = cvis();
            this.startB = cb("");
            this.stopB = cb("");
            this.resetB = cb("");
            this.stateB = cb("");
            this.dataB = cb("");
            this.helpB = cb("");
            this.bb = new BackButton();
            this.peerE = cd();
            this.startB.onclick = function () {
                self.sendCmd(ACP.CMD.APP.START);
            };
            this.stopB.onclick = function () {
                self.sendCmd(ACP.CMD.APP.STOP);
            };
            this.resetB.onclick = function () {
                self.sendCmd(ACP.CMD.APP.RESET);
            };
            this.stateB.onclick = function () {
                self.sendState();
            };
            this.dataB.onclick = function () {
                self.sendCmdt(ACP.CMD.APP.PRINT);
            };
            this.helpB.onclick = function () {
                self.sendCmdt(ACP.CMD.APP.HELP);
            };
            var bcont = cd();
            this.textE = c('pre');
            this.progE = new ProgControl(this, this.CATCH.PROG);
            a(bcont, [this.startB, this.stopB, this.resetB, this.stateB, this.dataB, this.helpB]);
            a(this.container, [this.peerE, bcont, this.progE, this.bb, this.textE]);

            cla(this.bb, 'eqp_bb');
            cla([this.peerE, bcont], ["eqp_c1", 'lg1']);
            cla([this.startB, this.stopB, this.resetB, this.stateB, this.dataB, this.helpB], ["eqp_b"]);
            for (var i = 0; i < this.board.length; i++) {
                this.board[i].elem = new BrButton(this.board[i].id, this.board[i].description, this, 1);
                a(this.peerE, this.board[i].elem);
            }
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].id = i;
                this.data[i].address = null;
                this.data[i].name = null;
                this.data[i].port = null;
                this.data[i].description = null;
                var board = this.getBoardById(this.data[i].board_id);
                this.data[i].board = board;
                if (board !== null) {
                    this.data[i].address = board.address;
                }
                var app = this.getAppById(this.data[i].app_id);
                this.data[i].app = app;
                if (app !== null) {
                    this.data[i].name = app.id;
                    this.data[i].port = app.port;
                    this.data[i].description = app.description;
                }
                this.data[i].sent = false;
                this.data[i].elem = new MnButton(this.data[i], this, this.CATCH.APP);
                a(this.data[i].board.elem.elemCont, this.data[i].elem);
            }

            this.btnCntl();
            this.initialized = true;
        } catch (e) {
            alert("equipment: init: " + e.message);
        }
    };
    this.getName = function () {
        return trans.get(403);
    };
    this.updateStr = function () {
        try {
            this.startB.innerHTML = trans.get(303);
            this.stopB.innerHTML = trans.get(304);
            this.resetB.innerHTML = trans.get(305);
            this.stateB.innerHTML = trans.get(306);
            this.dataB.innerHTML = trans.get(307);
            this.helpB.innerHTML = trans.get(308);
            this.progE.updateStr();
            this.bb.updateStr();
        } catch (e) {
            alert("equipment: updateStr: " + e.message);
        }
    };
    this.sendCmd = function (v) {
        try {
            var peer = this.getSelectedPeer();
            if (peer === null) {
                return;
            }
            var data = [
                {
                    action: ['controller', 'cmd'],
                    param: {cmd: v, peer: peer}
                }
            ];
            cursor_blocker.enable();
            sendTo(this, data, this.ACTION.CONTROLLER.CMD, 'json_udp_acp');
        } catch (e) {
            alert("equipment: sendCmd: " + e.message);
        }
    };
    this.sendCmdt = function (v) {
        try {
            var peer = this.getSelectedPeer();
            if (peer === null) {
                return;
            }
            var data = [
                {
                    action: ['controller', 'cmdt'],
                    param: {cmd: v, peer: peer}
                }
            ];
            cursor_blocker.enable();
            sendTo(this, data, this.ACTION.CONTROLLER.CMDT, 'json_udp_acp');

        } catch (e) {
            alert("equipment: sendCmdt: " + e.message);
        }
    };
    this.sendGetState = function (peer) {
        var data = [
            {
                action: ['controller', 'get_state'],
                param: {peer: peer}
            }
        ];
        sendTo(this, data, this.ACTION.CONTROLLER.GET_STATE, 'json_udp_acp');
    };
    this.rewindSent = function () {
        try {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].sent = false;
            }
        } catch (e) {
            alert("equipment: rewindSent: " + e.message);
        }
    };
    this.getNextStatePeer = function () {
        try {
            for (var i = 0; i < this.data.length; i++) {
                if (!this.data[i].sent) {
                    this.data[i].sent = true;
                    return {address: this.data[i].address, port: this.data[i].port};
                }
            }
            return null;
        } catch (e) {
            alert("equipment: getNextStatePeer: " + e.message);
        }
    };
    this.getUpdatingData = function () {
        try {
            var item = null;
            for (var i = 0; i < this.data.length; i++) {
                if (!this.data[i].sent) {
                    break;
                }
                item = this.data[i];
            }
            return item;
        } catch (e) {
            alert("equipment: getUpdatingData: " + e.message);
        }
    };
    this.sendState = function () {
        try {
            this.rewindSent();
            if (this.data.length) {
                var next_peer = this.getNextStatePeer();
                this.sendGetState(next_peer);
                cursor_blocker.enable();
            }
        } catch (e) {
            alert("equipment: sendState: " + e.message);
        }
    };
    this.sendGetStateNext = function () {
        try {
            var next_peer = this.getNextStatePeer();
            if (next_peer !== null) {
                this.sendGetState(next_peer);
            } else {
                cursor_blocker.disable();
            }
        } catch (e) {
            alert("equipment: sendGetStateNext: " + e.message);
        }
    };
    this.updateCurrMainB = function (d) {
        try {

            var item = this.getUpdatingData();
            if (item !== null) {
                item.elem.update(d);
            }
        } catch (e) {
            alert("equipment: updateCurrMainB: " + e.message);
        }
    };
    this.getDataById = function (id) {
        try {

            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].id === id) {
                    return this.data[i];
                }
            }
            return null;
        } catch (e) {
            alert("equipment: getDataById: " + e.message);
        }
    };
    this.getBoardById = function (id) {
        try {

            for (var i = 0; i < this.board.length; i++) {
                if (this.board[i].id === id) {
                    return this.board[i];
                }
            }
            return null;
        } catch (e) {
            alert("equipment: getBoardById: " + e.message);
        }
    };
    this.getAppById = function (id) {
        try {

            for (var i = 0; i < this.app.length; i++) {
                if (this.app[i].id === id) {
                    return this.app[i];
                }
            }
            return null;
        } catch (e) {
            alert("equipment: getAppById: " + e.message);
        }
    };
    this.getSelectedPeer = function () {
        try {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].elem.isSelected()) {
                    return {address: this.data[i].address, port: this.data[i].port};
                    break;
                }
            }
            return null;
        } catch (e) {
            alert("equipment: getSelectedPeer: " + e.message);
        }
    };
    this.getPeerDescription = function (peer_id) {
        try {
            for (var i = 0; i < this.description.length; i++) {
                if (this.description[i].id === peer_id) {
                    return trans.get(this.description[i].value);
                }
            }
            return '';
        } catch (e) {
            alert("equipment: getPeerDescription: " + e.message);
        }
    };
    this.catchEdit = function (data, kind) {
        try {
            switch (kind) {
                case this.CATCH.APP:
                    var done1 = false, done2 = false;
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].elem.isSelected() && this.data[i].elem.id !== data) {
                            this.data[i].elem.select();
                            done1 = true;
                        }
                        if (this.data[i].elem.id === data) {
                            this.data[i].elem.select();
                            this.progE.setPeer(this.data[i]);
                            done2 = true;
                        }
                        if (!this.data[i].elem.isSelected() && this.data[i].elem.id === data) {
                            this.progE.setPeer(null);
                        }
                        if (done1 && done2) {

                            break;
                        }
                    }
                    this.btnCntl();
                    break;
                case this.CATCH.PROG:
                    this.textE.innerHTML = data;
                    break;
            }

        } catch (e) {
            alert("equipment: catchEdit: " + e.message);
        }
    };
    this.btnCntl = function () {
        try {
            var peer = this.getSelectedPeer();
            if (peer === null) {
                this.startB.disabled = true;
                this.stopB.disabled = true;
                this.resetB.disabled = true;
                this.dataB.disabled = true;
                this.helpB.disabled = true;
            } else {
                this.startB.disabled = false;
                this.stopB.disabled = false;
                this.resetB.disabled = false;
                this.dataB.disabled = false;
                this.helpB.disabled = false;
            }
            if (this.data.length) {
                this.stateB.disabled = false;
            } else {
                this.stateB.disabled = true;
            }
        } catch (e) {
            alert("equipment: btnCntl: " + e.message);
        }
    };
    this.confirm = function (action, d, n) {
        try {
            switch (action) {
                case this.ACTION.CONTROLLER.CMD:
                    cursor_blocker.disable();
                    break;
                case this.ACTION.CONTROLLER.CMDT:
                    this.textE.innerHTML = d;
                    cursor_blocker.disable();
                    break;
                case this.ACTION.CONTROLLER.GET_STATE:
                    this.updateCurrMainB(d);
                    this.sendGetStateNext();
                    break;
                default:
                    console.log("confirm: unknown action: ", action);
                    break;
            }

        } catch (e) {
            alert("equipment confirm: " + e.message);
        }
    };
    this.abort = function (action, m, n) {
        try {
            switch (action) {
                case this.ACTION.CONTROLLER.CMD:
                    cursor_blocker.disable();
                    logger.err(254);
                    break;
                case this.ACTION.CONTROLLER.CMDT:
                    this.textE.innerHTML = '';
                    cursor_blocker.disable();
                    logger.err(254);
                    break;
                case this.ACTION.CONTROLLER.GET_STATE:
                    this.updateCurrMainB("?");
                    this.sendGetStateNext();
                    break;
                default:
                    console.log("abort: unknown action: ", action);
                    break;
            }
        } catch (e) {
            alert("equipment abort: " + e.message);
        }
    };
    this.show = function () {
        try {
            clr(this.container, "hdn");
            document.title = this.getName();
            this.visible = true;
        } catch (e) {
            alert("equipment show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, "hdn");
            if (this.btimer !== null) {
                window.clearTimeout(this.btimer);
                this.btimer = null;
            }
            if (this.btimer1 !== null) {
                window.clearTimeout(this.btimer1);
                this.btimer1 = null;
            }
            if (this.ttimer !== null) {
                window.clearTimeout(this.ttimer);
                this.ttimer = null;
            }
            this.visible = false;
        } catch (e) {
            alert("equipment hide: " + e.message);
        }
    };
}
var vequipment = new Equipment();
visu.push(vequipment);
