window.on = {};

window.on.input = {};
window.on.input.volume = target=>{
    var val = (event.target.value - event.target.getAttribute('min')) / (event.target.getAttribute('max') - event.target.getAttribute('min'));
    event.target.previousElementSibling.style.background = '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + 0 + ', #0072bb), ' + 'color-stop(' + val + ', #0096c7), ' + 'color-stop(' + val + ', #CCC)' + ')';
}

window.on.touch = {};
window.on["touch"]["tap"] = async(event)=>{
    var elem = target = event.target;

    elem = target.closest("[data-href]");
    if (elem) {
        var href = elem.dataset.href;
        var params = elem.dataset.params ? JSON.parse(elem.dataset.params) : null;
        href.router(params);
    }

    elem = target.closest("[data-tap]");
    if (elem) {
        var x = eval(elem.dataset.tap);
        typeof x === "function" ? x() : null;
    }
}
