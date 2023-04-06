<script setup>
import SearchItem from '../components/SearchItem.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted, ref } from 'vue'

const store = useUsersStore()
let showErr = ref(false)
const isError = (e) => (showErr.value = e)

const { getUsers } = store
onMounted(async () => {
  await getUsers()
})
</script>
<template>
  <main>
    <div>
      <SearchItem @is-error="isError" />
      <div class="" v-if="showErr">
        <span class="error">User is not found! </span>
      </div>
    </div>
  </main>
</template>
<style scoped>
.error {
  color: red;
}
</style>

