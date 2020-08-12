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
        <q-input v-model.number="newTransaction.budget" hint="单位: wei" type="number" label="预算"></q-input>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="继续" class="bg-accent" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="选择拍卖合约" icon="create_new_folder" color="accent" :done="step > 2">
        <SelectCalculator v-model="calculator" />
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="accent" label="继续" class="bg-accent" />
          <q-btn flat @click="step = 1" color="accent" label="返回" class="q-ml-sm text-accent" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="上传自己的公钥" icon="create_new_folder" color="accent" :done="step > 2">
        <q-input
          v-model="publicKey"
          placeholder="-----BEGIN PUBLIC KEY-----"
          hint="此公钥将用于结果的加密"
          filled
          v-on:keyup.enter="autoUpdatePublicKey"
          type="textarea"
        ></q-input>
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="accent" label="继续" class="bg-accent" />
          <q-btn flat @click="step = 2" color="accent" label="返回" class="q-ml-sm text-accent" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="生成新的合约" color="accent" icon="add_comment">
        注意：此处将会产生三笔交易。前两笔用于购买者的智能合约的部署和设定参数，
        后者用于向外包计算者发起请求。
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
        console.log('createTransaction 第三笔交易完成')
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
        this.publicKey,
        onsuccess,
        onfail
      )
    },
    autoUpdatePublicKey() {
      this.publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAvtF217vhDBjfT5cyQ9kM23WLBy5Kk3Gyuf3dWlIb3ttoDjLvgwEf
AgOgRHoXwySM/DgjoatdN23yH9e2MP4XqRIXqh7Kkh2MwCny6R9Sp0Ea64pXFUne
llf1ONy940EpQnwZbbXDGQakMJeJjkdxKM4+rX2ZmZD6rRre0EW8GA1VU84755U9
iPXDPMsgnbUQR3au1c9/I6a7XLWWIYy2483Hly0NXAjjpnbKBBQMOm46HgLHprAt
qzmcF6+NvZgCbSMEPIDjeM9T5JdgWGC1mYla2K46k5Q5dn1E8IwSnrYFg0CM+CvG
82AIB9W6OWSqZde84SnKGSEcHGgEU0UgvwIDAQAB
-----END RSA PUBLIC KEY-----
`
    },
  },
  data: () => ({
    loading: false,
    finish: false,
    step: 1,
    queryTypeOptions: [
      { value: 'age', label: '年龄', type: 'Number' },
      { value: 'gender', label: '性别', type: 'String' },
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
      budget: 100000000,
    },
    calculator: '',
    publicKey: '',
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
