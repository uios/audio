window.mvc ? null : (window.mvc = {});

window.mvc.v ? null : window.mvc.v = view = function(route) {
    const a = async function(resolve, reject) {
        var page = route.page;
        var path = route.path;
        var gut = route.hash ? rout.ed.dir(route.hash.split('#')[1]) : [];
        var get = (route ? route.GOT : rout.ed.dir(dom.body.dataset.path)).concat(gut);
        var root = get[0] || gut[0];

        window.GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);
        //console.log(get, gut, root, path);

        var page = route.page = rout.ed.url(gut);

        if (root) {
            if (root === "album") {
                const album = get[1] || gut[1];

                if (album) {
                    page = route.page = "/album/*/";

                    var vp = dom.body.find('[data-page="' + page + '"]');

                    const a = async function(d) {
                        const data = JSON.parse(d);
                        const album = data.album;
                        const uid = album.uid;

                        byId('album-cover').src = cdn.endpoint + "/albums/" + uid + "/front.jpg";

                        byId('album-name').dataset.uid = album.uid;
                        byId('album-name').textContent = album.name;

                        byId('album-play').dataset.uid = uid;

                        const tracks = data.tracks;
                        if (tracks.length > 0) {
                            var t = 0;
                            const feed = byId('feed-album-tracks');
                            feed.innerHTML = "";
                            const template = byId('template-album-track').content;
                            do {
                                const track = tracks[t];
                                var elem = template.firstElementChild.cloneNode(true);
                                elem.dataset.filename = track.title;
                                elem.find('[placeholder="Title"]').textContent = track.title;
                                elem.find('[placeholder="Artists"]').textContent = track.artist.join(', ');
                                feed.insertAdjacentHTML('beforeend', elem.outerHTML);
                                t++;
                            } while (t < tracks.length)
                        }
                    }
                    const b = function(error) {
                        alert(error);
                    }

                    var endpoint = global.domains.tld === "tld" ? "http://api.uios.tld" : api.endpoint;
                    const uri = endpoint + '/v1/audio/albums/' + album;
                    const pre = window.global.domains.domain === "github" ? '/audio' : '';
                    ajax(pre + "/album/" + album + "/index.json").then(a).catch(b);
                }
                resolve(route);
            } else if (root === "artist") {
                console.log({
                    route
                });
                if (GET.length > 1) {}
                resolve(route);
            } else if (root === "browse") {
                resolve(route);
            } else if (root === "library") {
                resolve(route);
            } else if (root === "search") {
                resolve(route);
            } else {
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
