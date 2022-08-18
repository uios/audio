window.api = {
    endpoint: "https://api.uios.computer"
};

window.cdn = {
    endpoint: "https://cdn.uios.computer/file/audio-uios"
};

window.onload = ()=>{
    window.dom = {
        body: document.body,
        boot: document.getElementById("boot")
    };

    var domains = window.location.host.split('.');
    window.global = {
        domains: {
            domain: domains.length > 1 ? domains[domains.length - 2] : null,
            subdomain: domains.length > 2 ? domains[domains.length - 3] : null,
            tld: domains[domains.length - 1]
        }
    }

    dom.body.dataset.load = "ing";

    init();
}

function init() {
    console.log("Initializing...");

    dom.body.dataset.load = "ed";
    dom.body.onclick = (event)=>on.touch.tap(event);

    const authChange = function(e) {
        dom.body.dataset.load = "ed";
    };

    var url = window.location.pathname;
    if (window.global.domains.subdomain === "uios") {
        var dir = rout.ed.dir(window.location.pathname);
        dir.splice(0, 1)
        var url = rout.ed.url(dir);
    }

    var uri = ((dom.boot.dataset.path ? dom.boot.dataset.path : url) + (window.location.search + window.location.hash));
    console.log(uri);

    if (window.firebase) {
        firebase.initializeApp(auth.config);
        const load = function(e) {
            const onAuthStateChanged = function(user) {
                auth.account.change(user).then(authChange);
            }
            firebase.auth().onAuthStateChanged(onAuthStateChanged);
        };
        uri.router().then(load);
    } else {
        uri.router().then(authChange);
    }
    console.log("Initialized");
}
