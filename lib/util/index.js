'use strict';

module.exports = {
    count: require('./count'),
    domReady: require('./dom_ready'),
    toCamelCase: toCamelCase,
    capitaliseFirstLetter: capitaliseFirstLetter,
    forEach: forEach,
    eachKey: eachKey
};


/**
 * Converts dash separated string into camel case
 * 
 * @param  {String} string
 * @return {String}
 */
function toCamelCase(string) {
    var strArr = string.split('-');
    for (var i = 1; i < strArr.length; i++)
        strArr[i] = capitaliseFirstLetter(strArr[i]);

    return strArr.join('');
}


/**
 * Changes the first letter of a string to a capital.
 * 
 * @param  {String} string
 * @return {String}
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Function to iterate an array. Uses native array forEach when available.
 * 
 * @param  {Array}    arr
 * @param  {Function} iterator
 * @param  {Object}   context
 */
function forEach(arr, iterator, context) {
    if (Array.prototype.forEach)
        Array.prototype.forEach.call(arr, iterator.bind(context));
    else
        for (var i = arr.length - 1; i >= 0; i--)
            iterator.call(context, arr[i], i);
}


/**
 * Function to iterate all properties of an object.
 * 
 * @param  {Object}   obj
 * @param  {Function} iterator
 * @param  {Object}   context
 */
function eachKey(obj, iterator, context) {
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            iterator.call(context, obj[key], key);
}
