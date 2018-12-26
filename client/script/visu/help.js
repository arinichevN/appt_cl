function HelpLogic() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.initialized = false;
    this.content = null;
    this.bb = null;
    this.init = function () {
        this.container = cvis();
        this.content = c("img");
        s(this.content, "src", "client/image/help/hardware_schema.bmp");
        this.bb = new BackButton();
        a(this.container, [this.content, this.bb]);
        cla(this.bb,["f1", "h20m"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(402);
    };
    this.updateStr = function () {
        this.bb.updateStr();
    };
    this.show = function () {
        clr(this.container,'hdn');
         document.title =  vmenu_main.getName() + ": " + this.getName();
    };
    this.hide = function () {
        cla(this.container,'hdn');
    };
}
var vhelp_logic = new HelpLogic();
visu.push(vhelp_logic);