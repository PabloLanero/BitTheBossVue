import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path:'/',
    redirect: '/Landing',
    component:  import('@/views/Main.vue'),
    children: [{
      path: '/Landing',
      component: import('@/views/Landing/Landing.vue'),
      meta: {
        miVariable: 'SuValor'
      }
      }]
  }],
})

export default router
