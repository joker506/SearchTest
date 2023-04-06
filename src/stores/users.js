import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AJAX_GET } from '@/helpers/api.js'

export const useUsersStore = defineStore('users', () => {
  let usersData = ref([])

  const getUsers = async () => {
    try {
      const { data } = await AJAX_GET('https://642c97e1bf8cbecdb4f3bc06.mockapi.io/api/users/')
      usersData.value = data
    } catch (error) {
      console.log(error)
    }
  }

  return { getUsers, usersData }
})
