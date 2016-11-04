import vue from 'vue';
import axios from 'axios';
import lodash from 'lodash';
import mixin from '../helpers/mixin';
import * as components from '../components';
import * as directives from '../directives';

/*
 * Load various JavaScript modules that assist Frunt.
 */

window._ = lodash;

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

window.Vue = vue;
Vue.mixin(mixin);

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = Vue.prototype.$http = axios;

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
