import { createRouter, createWebHistory } from "vue-router"
import UnityGame from "@/components/UnityGame.vue"

const routes = [
  {
    path: "/",
    redirect: "/unity",
  },
  {
    path: "/unity",
    name: "UnityGame",
    component: UnityGame,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router