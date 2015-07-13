/*
 jquery.exists 1.0.4 Copyright (c) 2014 "Richard KnG" Richárd Szakács
 Licensed under the MIT license.
 see: https://github.com/richard-kng/jquery-exists for details
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(["jquery"], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    var win = $(window)[0],
        doc = $(document)[0],
        html = $("html")[0];

    /**
     * Returns whether the element exists.
     * @param {string} [parent] - A string containing a selector expression to match elements against.
     * @returns {boolean}
     */
    $.fn.exists = function(parent) {

        var element,
            elementAtZero,
            elementIndex = this.length,
            elementExists = false;

        parent = typeof parent === "string" ? parent : "html";

        // This solution below is better, more defensive, than just check for .length, also more flexible
        while(elementIndex--) {
            element = this.eq(elementIndex); // get the jQuery object
            elementAtZero = element[0];      // get the raw element to check against document/window/html

            if(elementAtZero !== doc && elementAtZero !== win && elementAtZero !== html) {
                if(element.parents(parent).length > 0) {
                    elementExists = true;
                } else {
                    elementExists = false;
                    break;
                }
            } else { // elementAtZero is strictly equal to document/window or html
                elementExists = true;
            }
        }
        return elementExists;
    };
}));