/**
 * Number upgrade in ES6
 * 1. isFinite(), isNaN(), parseInt(), parseFloat()
 * 2. isInteger()
 */
/**
 * Number.isFinite
 * Missing in IE
 */
(function (global) {
    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global.isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);
/**
 * Number.isInteger
 * Missing in IE
 */
(function (global) {
    Object.defineProperty(Number, 'isInteger', {
        value: function isInteger(value) {
            return typeof value === 'number' && global.isFinite(value) && Math.floor(value) === value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);
/**
 * Math upgrade in ES6
 * sign(), trunc()
 */
(function (global) {
    /**
     * Math.cbrt cube root
     * Missing in Chrome,IE,Safari,Opera
     */
    if (!Math.cbrt) {
        Math.cbrt = function(x) {
            let y = Math.pow(Math.abs(x), 1/3);
            return x < 0 ? -y : y;
        }
    }
    /**
     * Math.sign
     * Missing in IE,Safari
     */
    if (!Math.sign) {
        Math.sign = function(x) {
            // If x is NaN, the result is NaN.
            // If x is -0, the result is -0.
            // If x is +0, the result is +0.
            // If x is negative and not -0, the result is -1.
            // If x is positive and not +0, the result is +1.
            x = +x; // convert to a number
            if (x === 0 || isNaN(x)) {
                return Number(x);
            }
            return x > 0 ? 1 : -1;
        }
    }
    /**
     * Math.trunc
     * Missing in IE
     */
    if (!Math.trunc) {
        Math.trunc = function (v) {
            v = +v;
            if (!isFinite(v)) return v;
            return (v - v % 1) || (v < 0 ? -0 : v === 0 ? v : 0);
        }
    }
})(this);

/**
 * Function upgrage in ES6
 */
(function (global) {
    /**
     * Function.prototype.name
     * Missing in IE
     */
    if ( 'name' in Function.prototype === false ) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
        Object.defineProperty( Function.prototype, 'name', {
            get: function () {
                return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];
            }
        } );
    }
})(this);

/**
 * Object upgrade in ES6
 */
(function (global) {

    /**
     * Object.assign
     * Missing in IE
     */
    if ( Object.assign === undefined ) {
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    
        ( function () {
    
            Object.assign = function ( target ) {
    
                'use strict';
    
                if ( target === undefined || target === null ) {
    
                    throw new TypeError( 'Cannot convert undefined or null to object' );
    
                }
    
                var output = Object( target );
    
                for ( var index = 1; index < arguments.length; index ++ ) {
    
                    var source = arguments[ index ];
    
                    if ( source !== undefined && source !== null ) {
    
                        for ( var nextKey in source ) {
    
                            if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {
    
                                output[ nextKey ] = source[ nextKey ];
    
                            }
    
                        }
    
                    }
    
                }
    
                return output;
    
            };
    
        } )();
    
    }
})(this);