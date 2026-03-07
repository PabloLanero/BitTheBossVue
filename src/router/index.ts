import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Home',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '/Home',
          component: () => import('@/views/Home/Home.vue'),
          meta: {
            miVariable: 'SuValor'
          }
        }
      ]
    },
    {
      path: '/Login',
      component: () => import('@/views/Login/Login.vue'),
    },
    {
      path: '/Register',
      component: () => import('@/views/Register/Register.vue'),
    },
    {
      path: '/Profile',
      component: () => import('@/views/Profile/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/history',
      component: () => import('@/views/Game/GameList.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/history/new',
      component: () => import('@/views/Game/CreateGame.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/game',
      component: () => import('@/views/Unity/UnityGame.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/factions',
      component: () => import('@/views/Factions/Factions.vue'),
    },
    {
      path: '/community',
      component: () => import('@/views/Community/Community.vue'),
    },
    {
      path: '/legal',
      component: () => import('@/views/Legal/LegalNotice.vue'),
    },
    {
      path: '/privacy',
      component: () => import('@/views/Legal/PrivacyPolicy.vue'),
    },
  ],
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true

  const token = localStorage.getItem('token')
  if (token) return true

  return '/Login'
})

export default router
