<template lang="pug">
div(class="max-w-screen-md mx-auto px-4 py-10")
  //- Status Message
  div(v-if='statusMsg || errorMsg' class="mb-10 p-4 bg-light-grey rounded-md shadow-lg")
    p(class="text-at-light-green") {{ statusMsg }}
    p(class="text-red-500") {{  errorMsg }}

  //- Create
  div(class="p-8 flex items-start bg-light-grey rounded-md shadow-lg")
    form(@submit.prevent='createWorkout' class="flex flex-col gap-y-5 w-full")
      h1(class="text-2xl text-at-light-green") Record Workout

      //- Workout Name
      div(class="flex flex-col")
        label(for="workout-name" class="mb-1 text-sm text-at-light-green") Workout Name
        input(type="text" required class="p-2 text-gray-500 focus:outline-none" v-model='workoutName')

      //- Workout Type
      div(class="flex flex-col")
        label(for="workout-type" class="mb-1 text-sm text-at-light-green") Workout Type
        select(@change='workoutChange' id="workout-type" class="p-2 text-gray-500 focus:outline-none" required v-model='workoutType')
          option(value='select-workout') Select Workout
          option(value="strength") Strength Training
          option(value="cardio") Cardio

      //- Strength Training Inputs
      div(v-if='workoutType === "strength"' class="flex flex-col gap-y-4")
        div(class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for='(item, index) in exercises' :key='index')
          div(class="flex flex-col md:w-1/3")
            label(for="exercise-name" class="mb-1 text-sm text-at-light-green") Exercise
            input(id="exercise-name" required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.exercise')
          div(class="flex flex-col flex-1")
            label(for="sets" class="mb-1 text-sm text-at-light-green") Sets
            input(id='sets' required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.sets')
          div(class="flex flex-col flex-1")
            label(for="reps" class="mb-1 text-sm text-at-light-green") Reps
            input(id='reps' required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.reps')
          div(class="flex flex-col flex-1")
            label(for="weight" class="mb-1 text-sm text-at-light-green") Weight
            input(id='weight' required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.weight')
          img(@click='deleteExercise(item.id)' src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer")
        button(@click='addExercise' type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
          | Add Exercise

      //- Cardio Inputs
      div(v-if='workoutType === "cardio"' class="flex flex-col gap-y-4")
        div(class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for='(item, index) in exercises' :key='index')
          div(class="flex flex-col md:w-1/3")
            label(for="cardio-type" class="mb-1 text-sm text-at-light-green") Type
            select(id='cardio-type' class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.cardioType')
              option(value="#") Select Type
              option(value="run") Run
              option(value="walk") Walk
          div(class="flex flex-col flex-1")
            label(for="distance" class="mb-1 text-sm text-at-light-green") Distance
            input(id='distance' required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.distance')
          div(class="flex flex-col flex-1")
            label(for="duration" class="mb-1 text-sm text-at-light-green") Duration
            input(id='duration' required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.duration')
          div(class="flex flex-col flex-1")
            label(for="pace" class="mb-1 text-sm text-at-light-green") Pace
            input(id='pace' required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.pace')
          img(@click='deleteExercise(item.id)' src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer")
        button(@click='addExercise' type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
          | Add Exercise
      button(type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
          | Record Workout
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { uid } from 'uid'
  import { supabase } from '@/supabase/init'
  import store from '@/store/index'
  // Create data
  const workoutName = ref('')
  const workoutType = ref('select-workout')
  const exercises = ref([1])
  const statusMsg = ref(null)
  const errorMsg = ref(null)
  const user = computed(() => store.state.user)

  // Add exercise
  const addExercise = () => {
    if (workoutType.value === 'strength') {
      exercises.value.push({
        id: uid(),
        exercise: '',
        sets: '',
        reps: '',
        weight: '',
      })
      return
    }
    exercises.value.push({
      id: uid(),
      cardioType: '',
      distance: '',
      duration: '',
      pace: '',
    })
  }
  // Delete exercise
  const deleteExercise = (id) => {
    if (exercises.value.length > 1) {
      exercises.value = exercises.value.filter((exercise) => exercise.id !== id)
      return
    }
    errorMsg.value = 'Error: Cannot remove, need to at least have one exercise'
    setTimout(() => {
      errorMsg.value = false
    }, 5000)
  }

  // Listens for chaging of workout type input
  const workoutChange = () => {
    exercises.value = []
    addExercise()
  }

  // Create workout
  const createWorkout = async () => {
    try {
      const { error } = await supabase.from('workouts').insert([
        {
          workoutName: workoutName.value,
          workoutType: workoutType.value,
          exercises: exercises.value,
          user_id: user.value.id,
        },
      ])
      if (error) throw error
      workoutName.value = null
      workoutType.value = 'select-workout'
      exercises.value = []
      statusMsg.value = 'Success: Workout Created!'
      setTimeout(() => {
        statusMsg.value = null
      }, 5000)
    } catch (e) {
      errorMsg.value = `Error: ${e.message}`
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }
</script>
