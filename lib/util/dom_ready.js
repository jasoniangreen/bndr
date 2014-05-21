'use strict';


module.exports = domReady;

function domReady(func) { // , arguments
    var self = this
        , args = Array.prototype.slice.call(arguments, 1);
    if (isReady.call(this))
        return callFunc();
    else
        document.addEventListener('readystatechange', callFunc);

    function callFunc() {
        document.removeEventListener('readystatechange', callFunc);
        return func.apply(self, args);
    }
}

domReady.isReady = isReady;

function isReady() {
    var readyState = document.readyState;
    return readyState == 'loading' ? false : readyState;
}
