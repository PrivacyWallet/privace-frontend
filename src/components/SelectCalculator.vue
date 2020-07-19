<template>
  <div>
    <q-select v-model="calculator" :options="options" />
  </div>
</template>

<script>
import { EthTest } from 'src/scripts/eth'

const Eth = new EthTest()

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
    this.options = Eth.getCalculators()
  },
}
</script>

<style>
</style>
