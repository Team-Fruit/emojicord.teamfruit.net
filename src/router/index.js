import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/user/User'
import Guild from '@/components/user/Guild'

import Store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        isPublic: true,
        isPublicOnly: true
      }
    },
    {
      path: '/login',
      redirect: to => {
        const { query } = to

        if (query.token)
          Store.dispatch('auth/login', query.token)

        if (query.error_description)
          Store.dispatch('alert/create', { message: query.error_description, type: 'error' })

        return { path: '/', query: null }
      },
      meta: {
        isPublic: true,
        isPublicOnly: true
      }
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'guild',
          name: 'guild',
          component: Guild
        },
        {
          path: '',
          redirect: { name: 'guild' }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.isPublicOnly) && Store.state.auth.token)
    next('/user')
  else if (to.matched.some(page => page.meta.isPublic) || Store.state.auth.token)
    next()
  else
    next('/')
})

export default router