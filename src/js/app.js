/*
 * @app
 * @author Piccirilli Dorsey
 */

(function () {

    'use strict';

    var $ = require('jquery');
    var _ = require('underscore');

    var app = {

        init: function() {
            // Begin!
        }

    };

    // Call the initialize function
    $(function () {
        app.init();
    });

    // Exists?
    $.fn.exists = function () {
        return this.length > 0;
    };

}());
