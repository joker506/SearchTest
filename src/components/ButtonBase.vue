<script setup>
import { toRefs, computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const { variant, disabled } = toRefs(props)
const classes = computed(() => ['btn', `btn-${variant.value}`, { 'btn-disabled': disabled.value }])

const emit = defineEmits(['customClickBtn'])
const handleClick = () => {
  emit('customClickBtn', 'customClickBtn')
}
</script>
<template>
  <div>
    <button :class="classes" type="submit" @click="handleClick">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>