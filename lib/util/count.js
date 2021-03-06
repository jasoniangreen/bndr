'use strict';

var timestamp = Date.now()
    , count = ''
    , uniqueID = '' + timestamp;


module.exports = uniqueCount;


/**
 * Returns a unique identifier by combining timestamp with a running count
 * @return {String} the unique identifier
 */
function uniqueCount() {
    var newTimestamp = Date.now();
    uniqueID = '' + newTimestamp;
    if (timestamp == newTimestamp) {
        count = count === '' ? 0 : count + 1;
        uniqueID += '_' + count;
    } else {
        timestamp = newTimestamp;
        count = '';
    }

    return uniqueID;
}

uniqueCount.get = function() {
    return uniqueID;
}
