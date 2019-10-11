import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Guild from '@/components/guilds/Guild'
import Emoji from '@/components/emojis/Emoji'
import NotFound from '@/components/NotFound'
import Test from '@/components/Test'

import Store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        isPublic: true
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
      path: '/guilds',
      name: 'guilds',
      component: Guild
    },
    {
      path: '/emojis',
      name: 'emojis',
      component: Emoji
    },
    // {
    //   path: '/user',
    //   component: User,
    //   children: [
    //     {
    //       path: 'guild',
    //       name: 'guild',
    //       component: Guild
    //     },
    //     {
    //       path: '',
    //       redirect: { name: 'guild' }
    //     }
    //   ]
    // }
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        isPublic: true
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.matched.some(page => page.meta.isPublic) && Date.now() / 1000 > Store.state.auth.user.exp) {
    Store.dispatch('alert/create', { message: "The session has expired. Please login again.", type: 'error' })
    next('/')
  } else if (to.matched.some(page => page.meta.isPublicOnly) && Store.state.auth.token)
    next('/')
  else if (to.matched.some(page => page.meta.isPublic) || Store.state.auth.token)
    next()
  else
    window.location = "https://emojicord.teamfruit.net/api/auth/login"
})

export default router