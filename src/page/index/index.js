/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/12
 *
 * ---------------------------------------------------
 */
let Vue = window.Vue;
import Index from './index.vue';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Index/>',
  components: {
    Index
  }
});
