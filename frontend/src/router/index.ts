import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/public/Home.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/private/Dashboard.vue'
import Admin from '@/views/private/Admin.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },

    { path: '/login', component: Login },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/private/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/admin',
      component: Admin,
      meta: { requiresAuth: true, role: 'ADMIN' }
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return '/dashboard'
  }
})

export default router
