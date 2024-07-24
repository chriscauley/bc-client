import { createRouter, createWebHistory } from 'vue-router'
import views from '@/views'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: views.HomeView },
    { path: '/help/', component: views.HelpView },
    { path: '/vote/', component: views.VoteView },
  ],
})

export default router
