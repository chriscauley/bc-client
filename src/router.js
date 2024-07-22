import { createRouter, createWebHistory } from 'vue-router'
import views from '@/views'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: views.HomeView }
  ],
})

export default router
