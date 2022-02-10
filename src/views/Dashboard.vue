<template lang="pug">
div(v-if="dataLoaded" class="container mt-10 px-4")
  //- No Data
  div(v-if="data.length === 0 || !user" class="w-full flex flex-col items-center")
    h1(class="text-2xl") Looks empty here...
    router-link(:to="{ name: 'Create' }" class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
      | Create Workout
  //- Data
  div(v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6")
    router-link(v-for="(workout, index) in data" :key="index" :to="{ name: 'ViewWorkout', params: { workoutId: workout.id }}" class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer")
      //- Cardio Img
      img(v-if="workout.workoutType === 'cardio'" src="@/assets/images/running-light-green.png" class="h-24 w-auto" alt="")

      //- Strength Training
      img(v-else src="@/assets/images/dumbbell-light-green.png" class="h-24 w-auto" alt="")

      p(class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg")
        | {{ workout.workoutType }}
      h1(class="mt-8 mb-2 text-center text-xl text-at-light-green")
        | {{ workout.workoutName }}
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { supabase } from '@/supabase/init'
  import store from '@/store/index'

  // Create data / vars
  const data = ref([])
  const dataLoaded = ref(null)
  const user = computed(() => store.state.user)

  // Get data
  const getData = async () => {
    try {
      const { data: workouts, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.value.id)
      if (error) throw error
      data.value = workouts
      dataLoaded.value = true
    } catch (e) {
      console.warn(e.message)
    }
  }
  // Run data function
  getData()
</script>
