<template lang="pug">
div(class="max-w-screen-sm mx-auto px-4 py-10")
  //- App Msg
  div(v-if="statusMsg || errorMsg" class="mb-10 p-4 rounded-md shadow-md bg-light-grey")
    p(class="text-at-light-green") {{ statusMsg }}
    p(class="text-red-500") {{ errorMsg }}

  div(v-if="dataLoaded")
    //- General Workout Info
    div(class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative")
      div(v-if="user" class="flex absolute left-2 top-2 gap-x-2")
        div(@click="editMode" class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg")
          img(class="h-3.5 w-auto" src="@/assets/images/pencil-light.png" alt="")
        div(class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg")
          img(@click='deleteWorkout' class="h-3.5 w-auto" src="@/assets/images/trash-light.png" alt="")
      img(v-if="data.workoutType === 'cardio'" class="h-24 w-auto" src="@/assets/images/running-light-green.png")
      img(v-else class="h-24 w-auto" src="@/assets/images/dumbbell-light-green.png")
      span(class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md")
        | {{ data.workoutType }}

      div(class="w-full mt-6")
        input(v-model='data.workoutName' v-if="edit" type="text" class="p-2 w-full text-gray-500 focus:outline-none")
        h1(v-else class="text-at-light-green text-2xl text-center") {{ data.workoutName }}

    //- Exercises
    div(class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md")
      //- Strength Training
      div(v-if="data.workoutType === 'strength'" class="flex flex-col gap-y-4 w-full")
        div(class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="(item, index) in data.exercises" :key='index')
          div(class="flex flex-2 flex-col md:w-1/3")
            label(for="exercise-name" class="mb-1 text-sm text-at-light-green") Exercise
            input(v-if="edit" id="exercise-name" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.exercise' type="text")
            p(v-else) {{ item.exercise }}
          div(class="flex flex-1 flex-col md:w-1/3")
            label(for="exercise-sets" class="mb-1 text-sm text-at-light-green") Sets
            input(v-if="edit" id="exercise-sets" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.sets' type="text")
            p(v-else) {{ item.sets }}
          div(class="flex flex-1 flex-col md:w-1/3")
            label(for="exercise-reps" class="mb-1 text-sm text-at-light-green") Reps
            input(v-if="edit" id="exercise-reps" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.reps' type="text")
            p(v-else) {{ item.reps }}
          div(class="flex flex-1 flex-col md:w-1/3")
            label(for="exercise-weight" class="mb-1 text-sm text-at-light-green") Weight
            input(v-if="edit" id="exercise-weight" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.weight' type="text")
            p(v-else) {{ item.weight }}
          img(@click='deleteExercise(item.id)' v-if="edit" class="absolute h-4 w-auto -left-5 cursor-pointer" src="@/assets/images/trash-light-green.png")
          button(@click='addExercise' v-if="edit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
            | Add Exercise

      //- Cardio
      div(v-else class="flex flex-col gap-y-4 w-full")
        div(class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="(item, index) in data.exercises" :key='index')
          div(class="flex flex-2 flex-col md:w-1/3")
            label(for="cardio-type" class="mb-1 text-sm text-at-light-green") Type
            select(v-if="edit" id="cardio-type" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.cardioType')
              option(value='select-type') Select Type
              option(value="run") Run
              option(value="walk") Walk
            p(v-else) {{ item.cardioType }}
          div(class="flex flex-1 flex-col md:w-1/3")
            label(for="distance" class="mb-1 text-sm text-at-light-green") Distance
            input(v-if="edit" id="distance" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.distance' type="text")
            p(v-else) {{ item.distance }}
          div(class="flex flex-1 flex-col md:w-1/3")
            label(for="duration" class="mb-1 text-sm text-at-light-green") Duration
            input(v-if="edit" id="duration" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.duration' type="text")
            p(v-else) {{ item.duration }}
          div(class="flex flex-1 flex-col md:w-1/3")
            label(for="pace" class="mb-1 text-sm text-at-light-green") Pace
            input(v-if="edit" id="pace" class="p-2 w-full text-gray-500 focus:outline-none" v-model='item.pace' type="text")
            p(v-else) {{ item.pace }}
          img(@click='deleteExercise(item.id)' v-if="edit" class="absolute h-4 w-auto -left-5 cursor-pointer" src="@/assets/images/trash-light-green.png")
          button(@click='addExercise' v-if="edit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
            | Add Exercise


    //- Update
    button(@click='update' v-if="edit" type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green")
      | Update
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { supabase } from '@/supabase/init'
  import { useRoute, useRouter } from 'vue-router'
  import store from '@/store/index'
  import { uid } from 'uid'

  // Create data / vars
  const data = ref(null)
  const dataLoaded = ref(null)
  const errorMsg = ref(null)
  const statusMsg = ref(null)
  const route = useRoute()
  const router = useRouter()
  const user = computed(() => store.state.user)
  // Get current Id of route
  const currentId = route.params.workoutId
  // Get workout data
  const getData = async () => {
    try {
      const { data: workouts, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('id', currentId)
      if (error) throw error
      data.value = workouts[0]
      dataLoaded.value = true
      console.log(data.value)
    } catch (e) {
      errorMsg.value = e.message
      setTimeout(() => {
        errorMsg.value = false
      }, 5000)
    }
  }

  getData()
  // Delete workout
  const deleteExercise = (id) => {
    if (data.value.exercises.length > 1) {
      data.value.exercises = data.value.exercises.filter(
        (exercise) => exercise.id !== id,
      )
      return
    }
    errorMsg.value = 'Error: Cannot remove, need to at least have one exercise'
    setTimout(() => {
      errorMsg.value = false
    }, 5000)
  }

  // Edit mode
  const edit = ref(null)

  const editMode = () => {
    edit.value = !edit.value
  }
  // Add exercise
  const addExercise = () => {
    if (data.value.workoutType === 'strength') {
      data.value.exercises.push({
        id: uid(),
        exercise: '',
        sets: '',
        reps: '',
        weight: '',
      })
      return
    }
    data.value.exercises.push({
      id: uid(),
      cardioType: '',
      distance: '',
      duration: '',
      pace: '',
    })
  }

  // Delete exercise
  const deleteWorkout = async () => {
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', currentId)
      if (error) throw error
      router.push({ name: 'Home' })
    } catch (e) {
      errorMsg.value = `Error: ${e.message}`
      setTimeout(() => {
        errorMsg.value = false
      }, 5000)
    }
  }
  // Update Workout
  const update = async () => {
    try {
      const { error } = await supabase
        .from('workouts')
        .update({
          workoutName: data.value.workoutName,
          exercises: data.value.exercises,
        })
        .eq('id', currentId)
      if (error) throw error
      edit.value = false
      statusMsg.value = 'Success: Workout Updated!'
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
