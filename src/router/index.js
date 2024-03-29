import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import NotFound from '@/components/NotFound'
import NewEmoji from '@/components/newemojis/NewEmoji'
// import Test from '@/components/Test'

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
      name: 'login',
      redirect: to => {
        const { query } = to

        if (query.token)
          Store.dispatch('auth/login', query.token)

        if (query.error_description)
          Store.dispatch('alert/create', { message: query.error_description, type: 'error' })

        return { path : Store.getters["auth/getRedirectPath"], query: null }
      },
      meta: {
        isPublic: true,
        isPublicOnly: true
      }
    },
    {
      path: '/connect',
      redirect: to => {
        const { query } = to

        if (query.key && query.port)
          Store.dispatch('minecraft/connect', query)
        return { path: '/newemoji', query: null }
      },
      meta: {
        isPublic: true
      }
    },
    {
      path: '/newemoji',
      name: 'beta',
      component: NewEmoji,
      meta: {
        minecraftMode: true
      }
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test,
    //   meta: {
    //     isPublic: true
    //   }
    // },
    {
      path: '/download',
      meta: {
        isPublic: true
      },
      beforeEnter: () => {
        location.href = 'https://www.curseforge.com/minecraft/mc-mods/emojicord'
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound,
      meta: {
        notfound: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.matched.some(page => page.meta.minecraftMode))
    Store.dispatch("minecraft/disconnect")
  if (!to.matched.some(page => page.meta.isPublic) && Date.now() / 1000 > Store.state.auth.user.exp) {
    Store.dispatch("auth/setRedirectPath", to.path)
    window.location = "https://api1.teamfruit.net/auth/login"
    // Vue.notify({
    //   group: "alert",
    //   text: "The session has expired. Please login again.",
    //   type: 'error',
    // })
    next('/')
  } else if (to.matched.some(page => page.meta.isPublicOnly) && Store.state.auth.token)
    next('/')
  else if (to.matched.some(page => page.meta.isPublic) || Store.state.auth.token)
    next()
  else if (to.matched.some(page => page.meta.notfound))
    next()
  else {
    Store.dispatch("auth/setRedirectPath", to.path)
    window.location = "https://api1.teamfruit.net/auth/login"
  }
})

export default router