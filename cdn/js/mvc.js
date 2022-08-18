window.mvc ? null : (window.mvc = {});

window.mvc.v ? null : window.mvc.v = view = function(route) {
    const a = async function(resolve, reject) {
        var page = route.page;
        var path = route.path;
        var gut = route.hash ? rout.ed.dir(route.hash.split('#')[1]) : [];
        var get = (route ? route.GOT : rout.ed.dir(dom.body.dataset.path)).concat(gut);
        var root = get[0] || gut[0];
        
        window.GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);
        console.log(get, gut, root, path);

        var page = route.page = rout.ed.url(gut);

        if (root) {
            if (root === "album") {
                const album = get[1] || gut[1];

                if(album) {
                    page = route.page = "/album/*/";
                    console.log({vp,page,route,gut,album});
                    var vp = dom.body.find('[data-page="' + page + '"]');
                    const a = async function(d) {
                        const data = JSON.parse(d);
                        const album = data.album;
                        const uid = album.uid;
                        const name = album.name;

                        const cover = vp.find('picture img');
                        cover.src = cdn.endpoint+"/"+uid+"/front.jpg";
                    }
                    const b = function (error) {
                    }
                    
                    var endpoint = global.domains.tld === "tld" ? "http://api.uios.tld" : api.endpoint;
                    ajax(endpoint+'/v1/audio/albums/'+album).then(a).catch(b);
                }
                resolve(route);
            }
            else if (root === "artist") {
                console.log({route});
                if(GET.length > 1) {                 
                }
                resolve(route);
            }
            else if (root === "browse") {
                resolve(route);
            }
            else if (root === "library") {
                resolve(route);
            }
            else if (root === "search") {
                resolve(route);
            }
            else {
                const error = {
                    code: 404  
                };
                reject(error);
            }
        } else {
            resolve(route);
        }
    };
    return new Promise(a);
}
