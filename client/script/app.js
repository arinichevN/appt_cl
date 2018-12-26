var app = {
    NAME_SIZE: 32,
    CPATH: "http://localhost/controller",
    //CPATH:"http://192.168.0.1",
    controller_state: null,
    version: 1,
    controller_version: null,
    version_acceptable: {
        controller: [1],
        f_php: [2],
        f_js: [2]
    },
    init: function () {
        trans.setLang(1, ["english", "русский"]);

    },
    update: function () {

    }
};
elem.push(app);
