<template lang="pug">
header(class="bg-at-light-green text-white")
  nav(class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row")
    div(class="flex items-center gap-x-4")
      img(class="w-14" src="../assets/images/dumbbell-light.png")
      h1(class="text-lg") Active Tracker
    ul(class="flex flex-1 justify-end gap-x-10")
      router-link(class="cursor-pointer" :to="{ name: 'Home' }") Home
      router-link(class="cursor-pointer" :to="{ name: 'Register' }") Register
      router-link(class="cursor-pointer" :to="{ name: 'Login' }") Login
      li(@click='logout' class="cursor-pointer") Logout
</template>

<script setup>
  import { supabase } from '@/supabase/init'
  import { useRouter } from 'vue-router'

  // Get user from store

  // Setup ref to router
  const router = useRouter()
  // Logout function
  const logout = async () => {
    await supabase.auth.signOut()
    router.push({ name: 'Home' })
  }
</script>
