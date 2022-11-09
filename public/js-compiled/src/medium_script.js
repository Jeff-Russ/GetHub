"use strict";
var handlingExisting = Object.assign(function () {
    var element = document.getElementById("listened1");
    element === null || element === void 0 ? void 0 : element.addEventListener("click", listenerFunction);
    function listenerFunction(event) {
        event.preventDefault();
        console.log('arguments.length =', arguments.length);
        console.log('arguments[0] =', arguments[0]);
        console.log('this =', this);
        console.log('event =', event);
        if (this.style.backgroundColor === "red") {
            this.style.backgroundColor = "blue";
        }
        else {
            this.style.backgroundColor = "red";
        }
        handlingExisting.args = [this, event, Array.from(arguments)];
    }
    return handlingExisting;
});
var handlingCreated = Object.assign(function () {
    var element = document.createElement('div');
    element.setAttribute('id', 'listened2');
    element.setAttribute('style', 'height: 200px; width: 200px; background-color: blue');
    document.body.append(element);
    element.addEventListener("click", listenerFunction);
    function listenerFunction(event) {
        event.preventDefault();
        console.log('arguments.length =', arguments.length);
        console.log('arguments[0] =', arguments[0]);
        console.log('this =', this);
        console.log('event =', event);
        if (this.style.backgroundColor === "red") {
            this.style.backgroundColor = "blue";
        }
        else {
            this.style.backgroundColor = "red";
        }
        handlingCreated.args = [this, event, Array.from(arguments)];
    }
    return handlingCreated;
});
function f1(arg1) {
    console.log(arg1);
    // make sure `this` is unusable in this standalone function
}
function f2(that, arg1) {
    console.log(arg1);
    // make sure `this` is unusable in this standalone function
}
/**
 * Place in html script:
 * const he = handlingExisting();
 * const hc =handlingCreated();
 *
 * they try in Chrome console:
 *
 * hc.args // undefined
 * hc.args // undefined
 *
 * // then click both divs
 * hc.args // [arg1, arg2, arguments]
 * hc.args // [arg1, arg2, arguments]
 *
 *
 */ 
//# sourceMappingURL=medium_script.js.map