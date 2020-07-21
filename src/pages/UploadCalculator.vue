<template>
  <q-page class="full-width row flex justify-center items-center">
    <q-list bordered padding>
      <q-item-label header class="text-dark text-h6">外包计算者合约地址</q-item-label>

      <q-item clickable v-ripple v-for="(i,idx) in calculators" :key="'c'+idx">
        <q-item-section>
          <q-item-label>{{i}}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-input
          class="full-width"
          v-model="newCalculatorAddress"
          placeholder="0xdeadbeaf..."
          hint="以 0x 开头"
          label="添加一个新的外包计算者地址"
        />
        <div class="q-pa-md q-gutter-sm">
          <q-btn flat color="primary" icons="upload" style="width: 80px;" @click="func">提交</q-btn>
        </div>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { getCalculators, addCalculator } from 'src/scripts/eth'
export default {
  data: () => ({
    newCalculatorAddress: '',
    calculators: [],
  }),
  mounted() {
    this.updateCalculators()
  },
  methods: {
    updateCalculators() {
      this.calculators = getCalculators()
    },
    func() {
      addCalculator(this.newCalculatorAddress)
      this.updateCalculators()
    },
  },
}
</script>

<style scoped>
.q-list {
  min-width: 500px;
}
</style>
