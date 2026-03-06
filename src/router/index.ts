import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    redirect: '/Landing',
    children: [
      {
        path: '/Landing',
        name: 'Landing',
        component: () => import('@/views/Landing/Landing.vue'),
        meta: {
          miVariable: 'SuValor',
        },
      },
      {
        path: '/unity',
        name: 'UnityGame',
        component: () => import('@/components/UnityGame.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
