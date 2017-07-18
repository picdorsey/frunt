import mixin from '../helpers/mixin';
import * as components from '../components';
import * as directives from '../directives';

window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');
    window.Vue = require('vue');
} catch (e) {}

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

Vue.mixin(mixin);

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

// let token = document.head.querySelector('meta[name="csrf-token"]').content;

axios.defaults.headers.common = {
    // 'X-CSRF-TOKEN': token,
    'X-Requested-With': 'XMLHttpRequest'
};

/**
 * We'll register all the application's Mixins, Components, and Directives
 * automatically by attaching each one to the global Vue object. Register a
 * prefix to avoid collision with other HTML tags.
 */

const prefix = '';

 Object.keys(components).forEach(key => {
     Vue.component(prefix + _.kebabCase(key), components[key]);
 });

 Object.keys(directives).forEach(key => {
     Vue.directive(prefix + _.kebabCase(key), directives[key]);
 });
