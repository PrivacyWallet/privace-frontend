<template>
  <div>
    <q-select v-model="calculator" :options="options" />
    <!--<q-input v-model="calculator" /> -->
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
  async mounted() {
    const calculators = await getCalculators()
    this.options =  calculators
    console.group('calculators')
    console.log(calculators)
    console.groupEnd('calculators')
  },
  async created() {
    const calculators = await getCalculators()
    this.options =  calculators
    console.group('calculators')
    console.log(calculators)
    console.groupEnd('calculators')
  },
}
</script>

<style>
</style>
