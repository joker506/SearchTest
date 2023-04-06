<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

import ButtonBase from '../components/ButtonBase.vue'
import InputBase from '../components/InputBase.vue'
import { regexType } from '../helpers/regex.js'

const searchText = ref('')
let typeValue = ref('')
let regexTypeList = reactive([])
regexTypeList = regexType
const store = useUsersStore()
const { usersData } = storeToRefs(store)

const router = useRouter()

const isDisabled = computed(() => (searchText.value.length > 3 ? false : true))

const emit = defineEmits(['isError'])

watch(searchText, () => {
  if (searchText.value.length === 0) {
    emit('isError', false)
  }
})

const sendCheck = () => {
  const searchType = regexTypeList.find(({ regex, type }) => {
    if (regex.test(searchText.value)) {
      return type
    }
  })
  if (searchType) {
    const { type } = searchType
    const resp = usersData.value.find((item) => {
      const itemType = item[type.toLowerCase()]
      return itemType.toLowerCase() === searchText.value.toLowerCase()
    })
    if (resp) {
      typeValue.value = type

      emit('isError', false)
      setTimeout(() => {
        searchText.value = ''
        typeValue.value = ''
        router.push({ path: `/about/${resp.id}` })
      }, 500)
    } else {
      emit('isError', true)
    }
  } else {
    typeValue.value = 'No valid Type'
  }
}
</script>

<template>
  <main>
    <div>
      <InputBase
        label="Enter query"
        name="searchText"
        :model-value="searchText"
        :type-value="typeValue"
        @update:modelValue="searchText = $event"
        @blurEvent="sendCheck"
      />
      <ButtonBase :disabled="isDisabled" @customClickBtn="sendCheck">Send ...</ButtonBase>
    </div>
  </main>
</template>