function BrButton(id, descr) {
    this.id = id;
    this.container = cd();
    this.done = false;

    this.valueE = cd();
    this.descrE = cd();
    this.elemCont = cd();

    this.valueE.innerHTML = id;
    this.descrE.innerHTML = descr;

    this.updateStr = function () {

    };
    this.setName = function (v) {
        this.descrE.innerHTML = v;
    };

    this.update = function (state) {



    };
    var ucont = cd();
    a(ucont, [this.valueE, this.descrE]);
    a(this.container, [ucont, this.elemCont]);
    cla(ucont, ["br_ucont"]);
    cla(this.valueE, ["br_value"]);
    cla(this.descrE, ["br_descr"]);
    cla([this.valueE, this.descrE], ["br_d"]);
    cla(this.container, ["br_block"]);
 }