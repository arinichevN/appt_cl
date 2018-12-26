function MnButton(data,  slave, kind) {
    this.slave = slave;
    this.kind = kind;
    this.id = data.id;
    this.container = cd();
    this.selection_date = null;
    this.done = false;
    this.tmr1 = {tmr: null};

    this.valueE = cd();
    this.workE = c("img");
    s(this.workE, "src", "client/image/work_un.png");

    this.valueE.innerHTML = data.name;
    this.container.title=data.address + ":" +data.port;

    this.updateStr = function () {

    };
    this.isSelected = function () {
        if (clc(this.container, "mn_selected")) {
            return true;
        }
        return false;
    };
    this.click = function () {
        this.slave.catchEdit(this.id, this.kind);
    };
    this.select = function () {
        if (clc(this.container, "mn_selected")) {
            clr(this.container, "mn_selected");
            this.selection_date = null;
        } else {
            this.selection_date = new Date();
            cla(this.container, "mn_selected");
        }
    };
    this.unmark = function () {
        clr(this.container, 'mn_updated');
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
    var ucont = cd();
    a(ucont, [this.valueE, this.workE]);
    a(this.container, [ucont]);
    cla(this.valueE, ["mn_value"]);
    cla(this.workE, ["mn_work"]);
    cla([this.valueE], ["mn_d"]);
    cla(this.container, ["mn_block", "mn_interactive"]);
    var self = this;
    this.container.onclick = function () {
        self.click();
    };
}