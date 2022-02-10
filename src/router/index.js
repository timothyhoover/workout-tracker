import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import Create from '@/views/Create.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ViewWorkout from '@/views/ViewWorkout.vue'
import { supabase } from '@/supabase/init'

const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      auth: true,
    },
  },
  {
    name: 'Login',
    path: '/',
    component: Login,
    meta: {
      title: 'Login',
      auth: false,
    },
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: {
      title: 'Register',
      auth: false,
    },
  },
  {
    name: 'Create',
    path: '/create',
    component: Create,
    meta: {
      title: 'Create',
      auth: true,
    },
  },
  {
    name: 'ViewWorkout',
    path: '/view-workout/:workoutId',
    component: ViewWorkout,
    meta: {
      title: 'View Workout',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Workout Tracker`
  next()
})
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: 'Login' })
    return
  }
  next()
})

export default router
