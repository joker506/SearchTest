<script setup>
import { useRoute } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useUsersStore()

const { id } = route.params
const { usersData } = storeToRefs(store)
const searchUser = usersData.value.find((item) => item.id == id)
</script>
<template>
  <div>
    <router-link to="/">Back</router-link>
    <div v-if="searchUser">
      <h1>This is an about: {{ searchUser.name }}</h1>
      <div class="card__wrapp">
        <div>
          <img :src="searchUser.avatar" alt="" />
        </div>
        <div>
          <ul>
            <li>Phone: {{ searchUser.phone }}</li>
            <li>Email: {{ searchUser.email }}</li>
            <li>Ip: {{ searchUser.ip }}</li>
            <li>Nickname: {{ searchUser.nickname }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card__wrapp {
  display: flex;
}
</style>
