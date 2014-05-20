'use strict';

/**
 * Binder.js
 * @author  Jason Green
 */


/**
 * [_componentClasses description]
 * @type {Object}
 */
bndr._componentClasses = {};


/**
 * [_components description]
 * @type {Array}
 */
bndr._components = [];


/**
 * [bndr description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function bndr(options) {
    options = options || {};
    options.rootEl = options.rootEl || document.body;

    var classes = bndr._componentClasses;
    bndr.eachKey(classes, function (CompClass, classAttr) {
        var compEls = options.rootEl.querySelectorAll('[' + classAttr + ']');

        bndr.forEach(compEls, function(compEl, i) {
            var compOptions = {}
                , compElAttrs = compEl.attributes;

            bndr.forEach(compElAttrs, function(compElAttr, j) {
                var optAttrName = compElAttr.nodeName;
                
                if (optAttrName !== classAttr && optAttrName.indexOf(classAttr) >= 0) {
                    var optName = optAttrName.slice(classAttr.length+1, optAttrName.length);
                    compOptions[bndr.toCamelCase(optName)] = compElAttr.nodeValue;
                }
            });

            var comp = new CompClass(compEl, compOptions);
            if (!comp) return console.error('bndr: component class ' + CompClass + ' did not return an instance.');
            
            compEl.___bndr_comp = comp;
            bndr._components.push(comp);
        });
    });

    return bndr._components;
}


/**
 * [toCamelCase description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
bndr.toCamelCase = function toCamelCase(string) {
    var strArr = string.split('-');
    for (var i = 1; i < strArr.length; i++)
        strArr[i] = bndr.capitaliseFirstLetter(strArr[i]);

    return strArr.join('');
}


/**
 * [capitaliseFirstLetter description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
bndr.capitaliseFirstLetter = function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * [forEach description]
 * @param  {[type]} arr      [description]
 * @param  {[type]} iterator [description]
 * @param  {[type]} context  [description]
 * @return {[type]}          [description]
 */
bndr.forEach = function forEach(arr, iterator, context) {
    if (Array.prototype.forEach)
        Array.prototype.forEach.call(arr, iterator.bind(context));
    else
        for (var i = arr.length - 1; i >= 0; i--)
            iterator.call(context, arr[i], i);
};


/**
 * [eachKey description]
 * @param  {[type]} obj      [description]
 * @param  {[type]} iterator [description]
 * @param  {[type]} context  [description]
 * @return {[type]}          [description]
 */
bndr.eachKey = function each(obj, iterator, context) {
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            iterator.call(context, obj[key], key);
};


/**
 * [registerClass description]
 * @param  {[type]} attrName  [description]
 * @param  {[type]} classFunc [description]
 * @return {[type]}           [description]
 */
bndr.registerClass = function registerClass(attrName, classFunc) {
    if (typeof classFunc != 'function')
        console.warn('bndr: must pass constructor function to registerClass');
    else
        bndr._componentClasses[attrName] = classFunc;
};


/**
 * [getClass description]
 * @param  {[type]} attrName [description]
 * @return {[type]}          [description]
 */
bndr.getClass = function getClass(attrName) {
    return bndr._componentClasses[attrName];
};


// export for node/browserify
if (typeof module == 'object' && module.exports)    
    module.exports = bndr;

// global bndr for browser
if (typeof window == 'object')
    window.bndr = bndr;

