<template lang="pug">
header(class="bg-at-light-green text-white")
  nav(class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row")
    div(class="flex items-center gap-x-4")
      img(class="w-14" src="../assets/images/dumbbell-light.png")
      h1(class="text-lg") Active Tracker
    ul(class="flex flex-1 justify-end gap-x-10")
      router-link(v-if='user' class="cursor-pointer" :to="{ name: 'Dashboard' }") Dashboard
      router-link(v-if='user' class="cursor-pointer" :to="{ name: 'Create' }") Create
      router-link(v-if='!user' class="cursor-pointer" :to="{ name: 'Register' }") Register
      router-link(v-if='!user' class="cursor-pointer" :to="{ name: 'Login' }") Login
      li(v-if='user' @click='logout' class="cursor-pointer") Logout
</template>

<script setup>
  import store from '../store/index'
  import { computed } from 'vue'
  import { supabase } from '@/supabase/init'
  import { useRouter } from 'vue-router'

  // Get user from store
  const user = computed(() => store.state.user)

  // Setup ref to router
  const router = useRouter()
  // Logout function
  const logout = async () => {
    await supabase.auth.signOut()
    router.push({ name: 'Login' })
  }
</script>
