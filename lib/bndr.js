'use strict';

/**
 * Binder.js
 * @author  Jason Green
 */


/**
 * Property on which to store references to components on elements
 * @type {String}
 */
bndr.COMPONENT_PROPERTY = '___bndr_comp';


/**
 * Object hash of javascript classes. Property key is an attribute name 
 * to bind to.
 * @type {Object}
 */
bndr._componentClasses = {};


/**
 * An array containing all javascript instances that have been bound.
 * @type {Array}
 */
bndr._components = [];


/**
 * The main binding function. All classes in the registry are iterated, binding
 * javascript instances to every element with the matching attribute.
 * Similar attributes are then used to construct an options object for each instance.
 * 
 * @param  {Object} options containing: rootEl - root element to query from
 * @return {Array}          Array of bound components
 */
function bndr(options) {
    options = options || {};
    options.rootEl = options.rootEl || document.body;

    var classes = bndr._componentClasses;

    // Iterate each Class/Attribute pair
    bndr.eachKey(classes, function (CompClass, classAttr) {
        var compEls = options.rootEl.querySelectorAll('[' + classAttr + ']');

        // Iterate each element with the current attribute
        bndr.forEach(compEls, function(compEl, i) {
            var compOptions = {}
                , compElAttrs = compEl.attributes;

            // Iterate each attribute to construct compOptions object
            bndr.forEach(compElAttrs, function(compElAttr, j) {
                var optAttrName = compElAttr.nodeName;
                
                if (optAttrName !== classAttr && optAttrName.indexOf(classAttr) >= 0) {
                    var optName = optAttrName.slice(classAttr.length+1, optAttrName.length);
                    compOptions[bndr.toCamelCase(optName)] = compElAttr.nodeValue;
                }
            });

            var comp = new CompClass(compEl, compOptions);
            if (!comp) return console.error('bndr: component class ' + CompClass + ' did not return an instance.');
            
            // Keep a reference to the component on the element
            compEl[bndr.COMPONENT_PROPERTY] = comp;
            bndr._components.push(comp);
        });
    });

    return bndr._components;
}


/**
 * Get the component managing an element
 * @param  {HTMLElement} el An element
 * @return {Object}         Javascript component instance
 */
bndr.getComponent = function getComponent(el) {
    var comp = el[bndr.COMPONENT_PROPERTY];
    return comp;
}


/**
 * Converts dash separated string into camel case
 * @param  {String} string
 * @return {String}
 */
bndr.toCamelCase = function toCamelCase(string) {
    var strArr = string.split('-');
    for (var i = 1; i < strArr.length; i++)
        strArr[i] = bndr.capitaliseFirstLetter(strArr[i]);

    return strArr.join('');
}


/**
 * Changes the first letter of a string to a capital.
 * @param  {String} string
 * @return {String}
 */
bndr.capitaliseFirstLetter = function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Function to iterate an array. Uses native array forEach when available.
 * @param  {Array}    arr
 * @param  {Function} iterator
 * @param  {Object}   context
 */
bndr.forEach = function forEach(arr, iterator, context) {
    if (Array.prototype.forEach)
        Array.prototype.forEach.call(arr, iterator.bind(context));
    else
        for (var i = arr.length - 1; i >= 0; i--)
            iterator.call(context, arr[i], i);
};


/**
 * Function to iterate all properties of an object.
 * @param  {Object}   obj
 * @param  {Function} iterator
 * @param  {Object}   context
 */
bndr.eachKey = function each(obj, iterator, context) {
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            iterator.call(context, obj[key], key);
};


/**
 * Function to register a javascript constructor with an attribute name
 * @param  {String}   attrName  attribute name that instance should be bound to
 * @param  {Function} classFunc constructor function to instantiate
 */
bndr.registerClass = function registerClass(attrName, classFunc) {
    if (typeof classFunc != 'function')
        console.warn('bndr: must pass constructor function to registerClass');
    else
        bndr._componentClasses[attrName] = classFunc;
};


/**
 * Get the class for an attribute name
 * @param  {String}   attrName the attribute name
 * @return {Function}          constructor function
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

