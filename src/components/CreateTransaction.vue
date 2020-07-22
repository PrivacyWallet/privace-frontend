<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated class="stepper">
      <span class="text-h6 q-mx-md">创建新的交易</span>
      <q-step :name="1" title="设置交易参数" icon="settisngs" :done="step > 1">
        <q-select v-model="newTransaction.filter" :options="filterOptions" label="筛选类型"></q-select>
        <q-select v-model="newTransaction.query" :options="filterOptions" label="查询类型"></q-select>
        <q-select v-model="newTransaction.queryType" :options="filterOptions" label="查询结果类型"></q-select>
        <q-input v-model.number="newTransaction.budget" type="number" label="预算"></q-input>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="继续" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="选择拍卖合约" icon="create_new_folder" :done="step > 2">
        <SelectCalculator v-model="calculator" />
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="继续" />
          <q-btn flat @click="step = 1" color="primary" label="返回" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="生成新的合约" icon="add_comment">
        可以返回历史交易记录页面查看最新的合约。
        <q-stepper-navigation>
          <q-btn
            :color="finish? 'positive':'primary'"
            :label="finish? '完成' : '提交'"
            :icon="finish?'done':'cloud_upload'"
            :disable="finish"
            :loading="loading"
            @click="create"
          />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
          <q-btn color="primary" label="关闭" @click="func" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import SelectCalculator from 'src/components/SelectCalculator'
import { createNewTransaction } from 'src/scripts/eth.ts'
export default {
  components: { SelectCalculator },
  props: ['func'],
  methods: {
    create() {
      this.loading = true
      const onsuccess = receipt => {
        console.log(receipt)
        this.loading = false
        this.finish = true
      }
      const onfail = error => {
        this.loading = false
        console.log(error)
      }
      createNewTransaction(
        this.newTransaction.filter,
        this.newTransaction.query,
        this.newTransaction.queryType,
        this.newTransaction.budget,
        this.calculator,
        onsuccess,
        onfail
      )
    },
  },
  data: () => ({
    loading: false,
    finish: false,
    step: 1,
    filterOptions: ['无', 'a', 'test'],
    queryOptions: ['年龄', '身高', 'test'],
    queryTypeOptions: ['平均数', '中位数'],
    newTransaction: {
      filter: '无',
      query: '年龄',
      queryType: '平均数',
      budget: 1,
    },
    calculator: '',
  }),
}
</script>

<style scoped>
.q-stepper {
  min-width: 500px;
}
</style>
