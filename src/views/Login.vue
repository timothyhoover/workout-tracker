<template lang="pug">
div(class="max-w-screen-sm mx-auto px-4 py-10")
  // Error Handling
  div(v-if='errorMsg' class="mb-10 p-4 rounded-md bg-light-grey shadow-lg")
    p(class="text-red-500") {{ errorMsg }}

  // Login Form
  form(@submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg")
    h1(class="text-3xl text-at-light-green mb-4") Login
    div(class="flex flex-col mb-2")
      label(for="email" class="mb-1 text-sm text-at-light-green") Email
      input(type="text" required class="p-2 text-gray-500 focus:outline-none" id="email" v-model='email')
    div(class="flex flex-col mb-2")
      label(for="password" class="mb-1 text-sm text-at-light-green") Password
      input(type="password" required class="p-2 text-gray-500 focus:outline-none" id="password" v-model='password')
    button(type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
      | Login
    router-link(class="text-sm mt-6 text-center" :to="{ name:'Register' }")
      | Don't have an account?
      span(class="text-at-light-green ml-2") Register
</template>

<script setup>
  import { ref } from 'vue'
  import { supabase } from '@/supabase/init'
  import { useRouter } from 'vue-router'

  // Create data / vars
  const router = useRouter()
  const email = ref(null)
  const password = ref(null)
  const errorMsg = ref(null)

  // Login function
  const login = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      router.push({ name: 'Dashboard' })
    } catch (e) {
      errorMsg.value = `Error: ${e.message}`
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }
</script>
