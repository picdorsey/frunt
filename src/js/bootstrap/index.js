import axios from 'axios';
import lodash from 'lodash';
import vue from 'vue';
import mixin from '../helpers/mixin';
import * as Components from '../components';
import * as Directives from '../directives';

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
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */

// axios.defaults.headers.common['X-CSRF-TOKEN'] = Laravel.csrfToken;
Vue.prototype.$http = axios;

/**
 * We'll register all the application's Mixins, Components, and Directives
 * automatically by attaching each one to the global Vue object. Register a
 * prefix to avoid collision with other HTML tags.
 */

const prefix = '';

 Object.keys(Directives).forEach(key => {
     Vue.directive(prefix + _.kebabCase(key), Directives[key]);
 });

 Object.keys(Components).forEach(key => {
     Vue.component(prefix + _.kebabCase(key), Components[key]);
 });
