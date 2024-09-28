import { createRouter, createWebHistory } from 'vue-router'
import views from '@/views'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: views.TimeView },
    { path: '/help/', component: views.HelpView },
    { path: '/map/', component: views.MapView },
    { path: '/vote/', component: views.VoteView },
    { path: '/settings/', component: views.SettingsView },
    { path: '/session/:session_id/:session_slug/', component: views.SessionDetailView },
  ],
})

export default router
