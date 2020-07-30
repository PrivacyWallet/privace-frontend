<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="accent" animated class="stepper">
      <span class="text-h6 q-mx-md">创建新的交易</span>
      <q-step :name="1" title="设置交易参数" icon="settisngs" color="accent" :done="step > 1">
        <!--<q-select v-model="newTransaction.filter" :options="filterOptions" label="筛选类型"></q-select>-->
        <q-select
          color="accent"
          v-model="newTransaction.queryType"
          :options="queryTypeOptions"
          :rules="[val => !!val || '此项为必填项']"
          label="查询类型"
        ></q-select>
        <q-select
          color="accent"
          v-if="newTransaction.queryType.type === 'String'"
          v-model="newTransaction.query"
          :rules="[val => !!val || '此项为必填项']"
          :options="queryOptions[newTransaction.queryType.value]"
          label="查询值"
        ></q-select>
        <q-input
          readonly
          color="accent"
          v-model="newTransaction.resultType"
          :options="resultTypeOptions"
          label="计算结果类型"
        ></q-input>
        <q-input v-model.number="newTransaction.budget" type="number" label="预算"></q-input>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="继续" class="bg-accent" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="选择拍卖合约" icon="create_new_folder" color="accent" :done="step > 2">
        <SelectCalculator v-model="calculator" />
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="accent" label="继续"  class="bg-accent"/>
          <q-btn flat @click="step = 1" color="accent" label="返回" class="q-ml-sm text-accent" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="生成新的合约" color="accent"  icon="add_comment">
        可以返回历史交易记录页面查看最新的合约。
        <q-stepper-navigation>
          <q-btn
            :color="finish? 'positive':'accent'"
            :label="finish? '完成' : '提交'"
            :icon="finish?'done':'cloud_upload'"
            :disable="finish"
            :loading="loading"
            @click="create"
          />
          <q-btn flat @click="step = 2" color="accent" label="Back" class="q-ml-sm" />
          <q-btn color="accent" label="关闭" @click="func" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import SelectCalculator from 'src/components/SelectCalculator'
import { createNewTransaction } from 'src/scripts/eth.ts'
import form from 'src/scripts/forms.js'
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
        this.newTransaction.queryType.value,
        this.newTransaction.query,
        this.newTransaction.resultType,
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
    queryTypeOptions: [
      { value: 'age', label: '年龄', type: 'Number' },
      { value: 'gender', label: '性别', type: 'String' },
      { value: 'occupation', label: '职业', type: 'String' },
      { value: 'income', label: '收入', type: 'Number' },
      { value: 'hometown', label: '居住地', type: 'String' },
      { value: 'education', label: '学历', type: 'String' },
      { value: 'maritalStatus', label: '婚姻状况', type: 'String' },
      { value: 'wentTo', label: '去往', type: 'String' },
    ],
    queryOptions: form,
    resultTypeOptions: ['平均数', '中位数'],
    newTransaction: {
      resultType: '',
      query: '',
      queryType: '',
      budget: 100000,
    },
    calculator: '',
  }),
  watch: {
    'newTransaction.queryType': function(newVal) {
      this.newTransaction.query = ''
      if (newVal.type === 'String') {
        this.newTransaction.resultType = '统计个数'
      } else {
        this.newTransaction.resultType = '中位数'
      }
    },
  },
}
</script>

<style scoped>
.q-stepper {
  min-width: 500px;
}
</style>
