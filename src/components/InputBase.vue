<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  modelValue: {
    type: String
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  typeValue: {
    type: String,
    required: true
  }
})
const { modelValue } = toRefs(props)
</script>

<template>
  <div class="custom__input">
    <label class="custom__input label" :for="name">{{ label }}</label>
    <input
      class="custom__input input"
      type="text"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blurEvent')"
    />
    <span v-if="typeValue" class="custom__input value-type">{{ `Type: ${typeValue}` }}</span>
  </div>
</template>

<style scoped>
.custom__input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input {
  padding: 0.5rem;
  min-width: 230px;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.value-type {
  position: absolute;
  top: 4rem;
  padding: 10px 0;
}
</style>