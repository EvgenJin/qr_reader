import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import qr from '@/components/qr'
import person from '@/components/person'
import order from '@/components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/qr',
      name: 'qr',
      component: qr
    },
    {
      path: '/person',
      name: 'person',
      component: person,
      props: true
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      props: true
    }
  ]
})
