function ProgControl(slave, kind) {
    this.slave = slave;
    this.kind = kind;
    this.peer = {address: null, port: null};
    this.container = cd();
    this.selection_date = null;
    this.done = false;
    this.tmr1 = {tmr: null};
    this.ACTION =
            {
                START: 11,
                STOP: 12,
                RESET: 13,
                ENABLE: 14,
                DISABLE: 15,
                GET_ENABLED: 16,
                GET_DATA_INIT: 17,
                GET_DATA_RUNTIME: 18,
                GFTS: 19,
                GERROR: 20, 
                SETF:21

            },
	this.fs=new Fieldset();
    this.idE = c("input");
    s(this.idE, "size", 50);
    this.startB = cb("");
    this.stopB = cb("");
    this.resetB = cb("");
    this.enableB = cb("");
    this.disableB = cb("");
    this.getenB = cb("");
    this.getrunB = cb("");
    this.getiniB = cb("");
    this.gftsB = cb("");
    this.setfB = cb("");
    this.gerrB = cb("");
    this.updateStr = function () {
        this.idE.title = trans.get(332);
        this.fs.updateStr(trans.get(333));
        this.startB.innerHTML = trans.get(324);
        this.stopB.innerHTML = trans.get(325);
        this.resetB.innerHTML = trans.get(326);
        this.enableB.innerHTML = trans.get(327);
        this.disableB.innerHTML = trans.get(328);
        this.getenB.innerHTML = trans.get(329);
        this.getrunB.innerHTML = trans.get(330);
        this.getiniB.innerHTML = trans.get(331);
        this.gftsB.innerHTML = "gfts";
        this.setfB.innerHTML = "set float";
        this.gerrB.innerHTML = "gerr";
    };
    this.setPeer = function (peer) {
        if (peer === null) {
            set_disabled([this.startB, this.stopB, this.resetB, this.enableB, this.disableB, this.getenB, this.getiniB, this.getrunB, this.gftsB,this.setfB, this.gerrB], true);
            return;
        }
        this.peer.address = peer.address;
        this.peer.port = peer.port;
        set_disabled([this.startB, this.stopB, this.resetB, this.enableB, this.disableB, this.getenB, this.getiniB, this.getrunB, this.gftsB,this.setfB, this.gerrB], false);
    };
    this.update = function (state) {
        switch (state) {
            case ACP.RESP.APP_BUSY:
                s(this.workE, "src", "client/image/work_yes.png");
                break;
            case ACP.RESP.APP_IDLE:
                s(this.workE, "src", "client/image/work_no.png");
                break;
            default:
                s(this.workE, "src", "client/image/work_un.png");
                break;
        }
        cla(this.container, 'mn_updated');
        var self = this;
        this.tmr1.tmr = window.setTimeout(function () {
            self.unmark();
        }, 300);
    };
    this.getI1List = function () {
        var arr = this.idE.value.split(",", 1000);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i]);
            if (isNaN(arr[i])) {
                return null;
            }
        }
        return arr;
    };
    this.getI1F1List = function () {
		var i1f1l=[];
        var arr = this.idE.value.split(";", 1000);
        for (var i = 0; i < arr.length; i++) {
			var iarr=arr[i].split(" ",2);
			if(iarr.length!==2){
				return null;
			}
			var i1f1={p0:0, p1:0.0};
			i1f1.p0 = parseInt(iarr[0]);
			i1f1.p1 = parseFloat(iarr[1]);
			if (isNaN(i1f1.p0)||isNaN(i1f1.p1)) {
                return null;
            }
			i1f1l.push(i1f1);
            
        }
        return i1f1l;
    };
    this.sendRequest = function (action) {

        var act = null;
        switch (action) {
            case this.ACTION.GET_DATA_INIT:
                act = ['controller', 'channel', 'get_data_init'];
                break;
            case this.ACTION.GET_DATA_RUNTIME:
                act = ['controller', 'channel', 'get_data_runtime'];
                break;
            case this.ACTION.START:
                act = ['controller', 'channel', 'start'];
                break;
            case this.ACTION.STOP:
                act = ['controller', 'channel', 'stop'];
                break;
            case this.ACTION.RESET:
                act = ['controller', 'channel', 'reset'];
                break;
            case this.ACTION.ENABLE:
                act = ['controller', 'channel', 'enable'];
                break;
            case this.ACTION.DISABLE:
                act = ['controller', 'channel', 'disable'];
                break;
            case this.ACTION.GET_ENABLED:
                act = ['controller', 'channel', 'get_enabled'];
                break;
            case this.ACTION.GFTS:
                act = ['controller', 'channel', 'gfts'];
                break;
             case this.ACTION.SETF:
                act = ['controller', 'channel', 'setf'];
                break;
            case this.ACTION.GERROR:
                act = ['controller', 'channel', 'gerr'];
                break;
            default:
                return;
        }
        var data=[];
        switch (action) {
            case this.ACTION.SETF:
	            var i1f1l=this.getI1F1List();
				if (i1f1l === null) {
		            return;
		        }
            data.push({
                action: act,
                param: {address: this.peer.address, port: this.peer.port, item: i1f1l}
            });
            break;
            default:
              var i1l = this.getI1List();
              if (i1l === null) {
                  return;
              }
            data.push({
                action: act,
                param: {address: this.peer.address, port: this.peer.port, item: i1l}
            });
                break;
        }
        sendTo(this, data, action, 'json_udp_acp');
    };
    this.confirm = function (action, d, dt_diff) {
        try {
            switch (action) {
                case this.ACTION.GET_DATA_RUNTIME:
                case this.ACTION.GET_DATA_INIT:
                case this.ACTION.GET_ENABLED:
                case this.ACTION.GFTS:
                case this.ACTION.GERROR:
					this.slave.catchEdit(d, this.kind);
                    break;
                case this.ACTION.START:
                case this.ACTION.STOP:
                case this.ACTION.RESET:
                case this.ACTION.ENABLE:
                case this.ACTION.DISABLE:
                case this.ACTION.SETF:
                    break;
                default:
                    console.log("confirm: unknown action: ", action);
                    break;
            }

        } catch (e) {
            alert("control: confirm: " + e.message);
        }
    };
    this.abort = function (action, m, n) {
        try {
            switch (action) {
                case this.ACTION.GET_DATA_RUNTIME:
                case this.ACTION.GET_DATA_INIT:
                case this.ACTION.GET_ENABLED:
                case this.ACTION.GFTS:
                case this.ACTION.GERROR:
                case this.ACTION.START:
                case this.ACTION.STOP:
                case this.ACTION.RESET:
                case this.ACTION.ENABLE:
                case this.ACTION.DISABLE:
                case this.ACTION.SETF:
                    this.slave.catchEdit(m, this.kind);
                    break;
                default:
                    console.log("abort: unknown action: ", action);
                    break;
            }
        } catch (e) {
            alert("control: abort: " + e.message);
        }
    };
    cla([this.idE, this.startB, this.stopB, this.resetB, this.enableB, this.disableB, this.getenB, this.getiniB, this.getrunB, this.gftsB,this.setfB, this.gerrB], ["eqp_b"]);
    a(this.fs.container, [this.idE, this.startB, this.stopB, this.resetB, this.enableB, this.disableB, this.getenB, this.getiniB, this.getrunB, this.gftsB,this.setfB, this.gerrB]);
	a(this.container, [this.fs.container]);
    set_disabled([this.startB, this.stopB, this.resetB, this.enableB, this.disableB, this.getenB, this.getiniB, this.getrunB, this.gftsB,this.setfB, this.gerrB], true);
//    cla(this.valueE, ["mn_value"]);
//    cla(this.descrE, ["mn_descr"]);
//    cla(this.workE, ["mn_work"]);
//    cla([this.valueE, this.descrE], ["mn_d"]);
    //cla(this.container, ["mn_block", "mn_interactive"]);
    var self = this;
    this.startB.onclick = function () {
        self.sendRequest(self.ACTION.START);
    };
    this.stopB.onclick = function () {
        self.sendRequest(self.ACTION.STOP);
    };
    this.resetB.onclick = function () {
        self.sendRequest(self.ACTION.RESET);
    };
    this.enableB.onclick = function () {
        self.sendRequest(self.ACTION.ENABLE);
    };
    this.disableB.onclick = function () {
        self.sendRequest(self.ACTION.DISABLE);
    };
    this.getenB.onclick = function () {
        self.sendRequest(self.ACTION.GET_ENABLED);
    };
    this.getrunB.onclick = function () {
        self.sendRequest(self.ACTION.GET_DATA_RUNTIME);
    };
    this.getiniB.onclick = function () {
        self.sendRequest(self.ACTION.GET_DATA_INIT);
    };
    this.gftsB.onclick = function () {
        self.sendRequest(self.ACTION.GFTS);
    };
    this.setfB.onclick = function () {
        self.sendRequest(self.ACTION.SETF);
    };
    this.gerrB.onclick = function () {
        self.sendRequest(self.ACTION.GERROR);
    };
}
