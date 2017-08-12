import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/content/goods.vue';
import ratings from '../components/content/ratings.vue';
import seller from '../components/content/seller.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'act',
  routes: [
      {path: '/goods', component: goods},
      {path: '/ratings', component: ratings},
      {path: '/seller', component: seller}
  ]
});
