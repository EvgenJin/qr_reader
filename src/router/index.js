import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import qr from '@/components/qr'
import person from '@/components/person'
import order from '@/components/order'
import Login from '@/components/Login'

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('jwt')) {
    next();
    return
  }
  next('/login')
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/qr',
      name: 'qr',
      component: qr,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/person',
      name: 'person',
      component: person,
      props: true,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      props: true,
      beforeEnter: ifAuthenticated
    }
  ]
});

