String.prototype.router = async function(params) {
    var uri = this.toString();

    var url = new URL(uri,location.origin);
    console.log(url);
    var route = window.route = rout.e(url.hash ? url.hash.split('#')[1] : url.pathname + url.search + url.hash);
    console.log(route);

    var pages = dom.body.find('pages[data-pages="' + route.root + '"]');
    var page = dom.body.find('page[data-page="' + route.page + '"]');
    var vp = page ? page : pages;

    if (vp) {
        var goto = window.global.domains.subdomain === "uios" ? '/audio' : '';
        vp.innerHTML === "" && vp.dataset.fetch ? vp.innerHTML = await ajax(goto + vp.dataset.fetch) : null;
    }

    var go = async function(resolve, reject) {
        //console.log('String.prototype.router', route);
        if (route) {
            var pop = params ? params.pop : null;
            var path = route.path;
            window.GET = rout.ed.dir(path);

            route = window.view ? await view(route).then(rout.ed.bang(route)) : await rout.ed.bang(route);

            if (!pop && !["blob:"].includes(window.location.protocol)) {
                const hash = global.domains.domain === "github" ? "/#" : "";
                var goto = window.global.domains.subdomain === "uios" ? '/' + document.head.querySelector('[name="application-shortname"]').content : '';
                const link = hash.length > 0 ? goto + hash + (route.hash.length > 0 ? route.hash.split('#')[1] : route.path) + route.search : goto + route.path + route.search + route.hash;
                if (window.self !== window.top) {
                    if (window.globals.domains.domain === "github") {
                        const got = window.parent.GET.slice(0, 3);
                        const gut = route.GOT;
                        const bash = got.concat(gut);
                        const goin = (window.globals.domains.domain === "github" ? '/#' : '') + rout.ed.url(bash);
                        window.parent.history.pushState(goin, '', goin);
                    }
                }
                document.body.dataset.path = route.path;
                console.log({
                    path,
                    hash,
                    route,
                    link
                });
                history.pushState(link, '', link);
            }

            resolve(route);
        } else {
            const e = {
                code: 400
            };
            reject(e);
        }
    };
    return new Promise(async(resolve,reject)=>go(resolve, reject));
}

window.rout = {};

window.rout.e = state=>{
    var arr1 = [];
    var arr2 = rout.ed.dir(state.split('#')[0].split('?')[0]);
    var page = '/';
    var path = rout.ed.url(arr2);
    const GOT = rout.ed.dir(path);
    const root = GOT[0];
    const hash = state.split('#').length > 1 ? "#" + state.split('#')[1] : "";
    const search = state.split('?').length > 1 ? "?" + state.split('?')[1].split('#')[0] : "";

    if (GOT.length > 0) {
        var n = 0;
        do {
            var m = GOT[n];
            var bool = window.rout.ing(state, GOT, n);
            arr1[n] = bool ? "*" : m;
            n++;
        } while (n < GOT.length);
        page = rout.ed.url(arr1);
    }

    const data = {
        GOT,
        hash,
        page,
        path,
        root,
        search
    };
    return data;
}

window.rout.ed = {};
window.rout.ed.bang = async(route)=>{
    var pages = dom.body.find('pages[data-pages="' + route.root + '"]');
    var page = dom.body.find('page[data-page="' + route.page + '"]');
    var vp = page ? page : pages;

    $('[data-hide]').attr("data-active", true);
    $(':not(page)[data-pages]').removeAttr("data-active");
    $(':not(page)[data-page]').removeAttr("data-active");

    if (vp && vp.closest('main')) {
        $('pages[data-pages]').removeAttr("data-active");
        $('page[data-page]').removeAttr("data-active");
    } else {
        $('body > page[data-page]').removeAttr("data-active");
        $('body > pages[data-pages]').removeAttr("data-active");
        $('body > :not(main) page[data-page]').removeAttr("data-active");
        $('body > :not(main) pages[data-pages]').removeAttr("data-active");
    }

    $('[data-hide="' + route.page + '"]').attr("data-active", false);
    $('[data-page="' + route.page + '"]').attr("data-active", true);

    var rs = $('[data-pages]');
    if (rs.length > 0) {
        var i = 0;
        do {
            route.page.includes(rs[i].dataset.pages) ? rs[i].dataset.active = true : null;
            i++;
        } while (i < rs.length)
    }
    return route;
}
window.rout.ed.dir = function(url, num, g=[]) {
    if (url) {
        var split = url.split("/");
        var it = (a,i)=>{
            i < split.length - 0 ? g[i] = a : null;
        }
        ;
        split.forEach(it);
        g[0] === "" ? g.shift() : null;
        g[g.length - 1] === "" ? g.pop() : null;
    }
    return g;
}
window.rout.ed.url = function(dir) {
    if (dir.length > 0) {
        var end = dir[dir.length - 1];
        href = dir.length === 0 ? "/" : "/" + dir.join("/") + (end.includes("?") ? "" : "/");
    } else {
        href = "/";
    }
    return href;
}

window.rout.ing = (href,GOT,n)=>{
    return false;
}
