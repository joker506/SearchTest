<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import ButtonBase from '../components/ButtonBase.vue'
import InputBase from '../components/InputBase.vue'
import { regexType } from '../helpers/regex.js'
import { parsePhoneNumber, isValidPhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js'

import emailValidator from 'email-validator'

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
  let parseNumber = ''
  let isValidNumber = ''
  const searchType = regexTypeList.find(({ regex, type }) => {
    const checkPhone = isPossiblePhoneNumber(searchText.value)
    const validEmail = emailValidator.validate(searchText.value)

    if (type === 'Phone' && !!checkPhone) {
      parseNumber = parsePhoneNumber(searchText.value, 'RU')
      isValidNumber = isValidPhoneNumber(parseNumber.number)
      return type
    } else if (type === 'Email' && validEmail) {
      isValidNumber = true
      return type
    } else if (regex.test(searchText.value)) {
      isValidNumber = true
      return type
    }
  })

  if (searchType && isValidNumber) {
    const { type } = searchType
    const resp = usersData.value.find((item) => {
      const itemType = item[type.toLowerCase()]
      const itemText = searchText.value.toLowerCase().includes('@')
        ? searchText.value.toLowerCase().replace(/^@/, '')
        : searchText.value.toLowerCase()
      return type === 'Phone'
        ? itemType.toLowerCase().replace(/[^\d+]/g, '') === parseNumber.number
        : itemType.toLowerCase() === itemText
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
      typeValue.value = type
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