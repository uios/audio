window.api = {
    endpoint: "https://api.uios.computer"
};

window.cdn = {
    endpoint: "https://cdn.uios.computer/file/audio-uios"
};

window.onload = ()=>{
    window.dom = {
        audio: document.getElementById('audio'),
        body: document.body,
        boot: document.getElementById("boot"),
        player: document.getElementById('player')
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

    window.rout.ing = function(href, GOT, n, m=GOT[n], root=GOT[0]) {
        return m.includes("#") || (root === 'album' && n === 1);
    }

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

window.player = {};

window.player.album = {};
window.player.album.play = ()=>{
    const target = byId('album-play');
    console.log(target);
    if (dom.audio.paused) {
        const source = dom.audio.find('source');
        const src = source.src;
        const shortname = byId('album-name').dataset.shortname;
        if (src) {
            dom.audio.play();
        } else {
            const feed = byId('feed-album-tracks');
            if (feed.children.length > 0) {
                var f = 0;
                do {
                    const track = feed.children[f];
                    window.player.queue.album = {
                        name: byId('album-name').textContent
                    }
                    window.player.queue.tracks[f] = {
                        artist: track.find('[placeholder="Artists"]').textContent,
                        filename: track.dataset.filename,
                        source: cdn.endpoint + '/album/' + shortname + '/' + track.dataset.filename + '.mp3',
                        title: track.find('[placeholder="Title"]').textContent
                    };
                    f++;
                } while (f < feed.children.length);

                const index = 0;
                window.player.queue.current = index;
                source.src = window.player.queue.tracks[index].source;
                dom.audio.load();
                dom.audio.play();

            }
        }
        target.firstElementChild.classList.add('gg-play-pause');
        target.firstElementChild.classList.remove('gg-play-button');
    } else {
        dom.audio.pause();
        target.firstElementChild.classList.remove('gg-play-pause');
        target.firstElementChild.classList.add('gg-play-button');
    }
}
window.player.album.track = target=>{
    const card = target.closest('card');
    const play = byId('album-play');
    const shortname = byId('album-name').dataset.shortname;
    const source = dom.audio.find('source');
    const src = source.src;

    const feed = byId('feed-album-tracks');
    if (feed.children.length > 0) {
        var f = 0;
        do {
            const track = feed.children[f];
            window.player.queue.tracks[f] = {
                artist: track.find('[placeholder="Artists"]').textContent,
                filename: track.dataset.filename,
                source: cdn.endpoint + '/album/' + shortname + '/' + track.dataset.filename + '.mp3',
                title: track.find('[placeholder="Title"]').textContent
            };
            f++;
        } while (f < feed.children.length);
        console.log(feed.find('.counter'));
    }
    console.log(card);
    const index = card.index();
    window.player.queue.current = index;
    source.src = window.player.queue.tracks[index].source;
    dom.audio.load();
    dom.audio.play();

    play.firstElementChild.classList.add('gg-play-pause');
    play.firstElementChild.classList.remove('gg-play-button');
}

window.player.controls = {};
window.player.controls.prev = ()=>{
    console.log(event, window.player.queue.tracks);
    window.player.queue.current === 0 ? window.player.queue.current = window.player.queue.tracks.length - 1 : window.player.queue.current--;
    console.log(window.player.queue.current);

    const source = dom.audio.find('source');
    const index = window.player.queue.current;
    source.src = window.player.queue.tracks[index].source;
    dom.audio.load();
    dom.audio.play();
}
window.player.controls.next = ()=>{
    console.log(event);

    window.player.queue.current === window.player.queue.tracks.length - 1 ? window.player.queue.current = 0 : window.player.queue.current++;
    console.log(window.player.queue.current);

    const source = dom.audio.find('source');
    const index = window.player.queue.current;
    source.src = window.player.queue.tracks[index].source;
    dom.audio.load();
    dom.audio.play();
}
window.player.controls.play = ()=>{
    if (dom.audio.paused) {
        const source = dom.audio.find('source');
        const src = source.src;
        if (src) {
            dom.audio.play();
        }
    } else {
        dom.audio.pause();
    }
}
window.player.controls.seekto = details=>{
    if (details.fastSeek && 'fastSeek'in video) {
        dom.audio.fastSeek(details.seekTime);
        return;
    }
    dom.audio.currentTime = details.seekTime;
}

window.player.on = {};
window.player.on.ended = event=>{
    console.log(event);
    const target = event.target;

    window.player.queue.current === window.player.queue.tracks.length - 1 ? window.player.queue.current = 0 : window.player.queue.current++;
    console.log(window.player.queue.current);

    const source = dom.audio.find('source');
    const index = window.player.queue.current;
    source.src = window.player.queue.tracks[index].source;
    dom.audio.load();
    dom.audio.play();

    const track = window.player.queue.tracks[index];
    console.log({
        index,
        track
    });
    byId('player-title').textContent = track.title;
    byId('player-artists').textContent = '';

    const playing = dom.body.find('[data-filename="' + track.filename + '"]');
    if (playing) {
        playing.find('.counter').classList.add('color-0096c7');
        playing.find('[placeholder="Title"]').classList.add('color-0096c7');
    }
}
window.player.on.pause = event=>{
    $(byId('album-play').find('n')).removeClass('gg-play-pause').addClass('gg-play-button');

    $(byId('audio-play').find('n')).removeClass('gg-play-pause').addClass('gg-play-button');
}
window.player.on.play = event=>{
    console.log(event);
    const target = event.target;
    const index = window.player.queue.current;
    const track = window.player.queue.tracks[index];
    console.log({
        index,
        track
    });
    byId('player-title').textContent = track.title;
    byId('player-artists').textContent = '';

    const feed = byId('feed-album-tracks');
    $('.counter.color-0096c7').removeClass('color-0096c7');
    $('[placeholder="Title"].color-0096c7').removeClass('color-0096c7');

    const playing = dom.body.find('[data-filename="' + track.filename + '"]');
    if (playing) {
        playing.find('.counter').classList.add('color-0096c7');
        playing.find('[placeholder="Title"]').classList.add('color-0096c7');
    }

    $(byId('album-play').find('n')).removeClass('gg-play-button').addClass('gg-play-pause');

    $(byId('audio-play').find('n')).removeClass('gg-play-button').addClass('gg-play-pause');

    if ('mediaSession'in navigator) {
        const metadata = {
            title: track.title,
            artist: track.artist,
            album: window.player.queue.album,
            artwork: [{
                src: cdn.endpoint + '/album/' + byId('album-name').dataset.shortname + '/front.jpg',
                sizes: '96x96',
                type: 'image/png'
            }]
        };
        console.log(metadata);
        navigator.mediaSession.metadata = new MediaMetadata(metadata);
        navigator.mediaSession.setActionHandler('pause', player.controls.play);
        navigator.mediaSession.setActionHandler('play', player.controls.play);
        navigator.mediaSession.setActionHandler('previoustrack', player.controls.prev);
        navigator.mediaSession.setActionHandler('previoustrack', player.controls.prev);
        navigator.mediaSession.setActionHandler('nexttrack', player.controls.next);
        navigator.mediaSession.setActionHandler('seekto', player.controls.seekto);
    }

}

window.player.queue = {};
window.player.queue.current = 0;
window.player.queue.tracks = [];
