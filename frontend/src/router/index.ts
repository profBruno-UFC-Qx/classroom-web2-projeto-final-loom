import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/public/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Dashboard from '@/views/private/Dashboard.vue'
import Admin from '@/views/private/Admin.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { layout: 'default' }
    },

    {
      path: '/login',
      component: Login,
      meta: { layout: 'auth' }
    },

    {
      path: '/register',
      component: Register,
      meta: { layout: 'auth' }
    },

    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        layout: 'default'
      }
    },

    {
      path: '/admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        role: 'ADMIN',
        layout: 'default'
      }
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
