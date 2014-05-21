'use strict';
var util = require('./util')
    , count = util.count;

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
 * Prefix used to name component instances
 * @type {String}
 */
bndr.COMP_PREFIX = 'bndr_';


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
bndr._components = {};


/**
 * The main binding function. All classes in the registry are iterated, binding
 * javascript instances to every element with the matching attribute.
 * Similar attributes are then used to construct an options object for each instance.
 * Instantiated components will get passed `el`, `name`, and `options`.
 *
 * @param  {Function} callback function to be called when binding is complete, gets passed `components` array
 * @param  {Object}   options  containing: rootEl - root element to query from
 */
function bndr(callback, options) {
    util.domReady(function() {
        options = options || {};
        options.rootEl = options.rootEl || document.body;

        var components = _bndr(options);
        callback && callback(components);
    });
}


/**
 * Does the actual work of the binding process after main bndr function prepares options.
 *
 * @private
 * @param  {Object} options Prepared options
 * @return {Array}          array of components
 */
function _bndr(options) {
    // Iterate each Class/Attribute pair
    util.eachKey(bndr._componentClasses, function (CompClass, attrName) {
        var compEls = options.rootEl.querySelectorAll('[' + attrName + ']');

        // Iterate each element with the current attribute
        util.forEach(compEls, function(compEl, i) {
            var compOptions = {}
                , compElAttrs = compEl.attributes;

            // Iterate each attribute to construct compOptions object
            util.forEach(compElAttrs, function(compElAttr, j) {
                var optAttrName = compElAttr.nodeName;
                
                if (optAttrName !== attrName && optAttrName.indexOf(attrName) >= 0) {
                    var optName = optAttrName.slice(attrName.length+1, optAttrName.length);
                    compOptions[util.toCamelCase(optName)] = compElAttr.nodeValue;
                }
            });

            _prepareAndCreateComponent(compEl, compOptions, attrName, CompClass);
        });
    });
    return bndr._components;
}

function _prepareAndCreateComponent(compEl, compOptions, attrName, CompClass) {
    var compName = compEl.getAttribute(attrName);
    compName = compName || bndr.COMP_PREFIX + count();
    
    var comp = new CompClass(compEl, compName, compOptions);
    if (!comp) return console.error('bndr: component class ' + CompClass + ' did not return an instance.');
    
    // Keep a reference to the component on the element
    compEl[bndr.COMPONENT_PROPERTY] = comp;

    if (bndr._components[compName])
        logger.warn('bndr: component with name ' + compName + ' already created');

    bndr._components[compName] = comp;
}


/**
 * Get the component by element or by name
 * 
 * @param  {HTMLElement|String} elOrName An element
 * @return {Object}                      Javascript component instance
 */
bndr.getComponent = function getComponent(elOrName) {
    if (typeof elOrName == 'string')
        return bndr._components[elOrName]
    else
        return elOrName && elOrName[bndr.COMPONENT_PROPERTY];
}


/**
 * Function to register a javascript constructor with an attribute name
 * 
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
 * 
 * @param  {String}   attrName the attribute name
 * @return {Function}          constructor function
 */
bndr.getClass = function getClass(attrName) {
    return bndr._componentClasses[attrName];
};


/**
 * Utility functions
 * @type {Object}
 */
bndr.util = util;


// export for node/browserify
if (typeof module == 'object' && module.exports)    
    module.exports = bndr;

// global bndr for browser
if (typeof window == 'object')
    window.bndr = bndr;

