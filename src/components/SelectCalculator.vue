<template>
  <div>
    <q-select v-model="calculator" :options="options" />
  </div>
</template>

<script>
import { getCalculators } from 'src/scripts/eth'

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    options: [],
  }),
  computed: {
    calculator: {
      get() {
        return this.value
      },
      set(cal) {
        this.$emit('input', cal)
      },
    },
  },
  mounted() {
    this.options = getCalculators()
  },
}
</script>

<style>
</style>
