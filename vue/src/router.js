import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ViewItems from './views/ViewItems.vue';
import AddProduct from './views/AddProduct.vue';

//children
import Default from './views/children/DefaultGrid.vue'
import Detail from './views/children/Detail.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/items',
      name: 'items',
      component: ViewItems,
      children: [
        {
          path: '',
          name: 'default',
          component: Default,
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail,
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path:'/add-product',
      name: 'addProduct',
      component: AddProduct,
    }
  ],
});
