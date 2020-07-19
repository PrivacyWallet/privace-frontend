<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated class="stepper">
      <span class="text-h6 q-mx-md">上传新的数据</span>
      <q-step :name="1" title="填写表单" icon="settisngs" :done="step > 1">
        <Sheet :data="data" />
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="继续" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="设置交易参数" caption icon="create_new_folder" :done="step > 2">
        <q-input v-model="epsilon" title="隐私保护因子" hint="该值越小，隐私保护程度越高" />
        <q-input v-model="price" title="价格" hint="购买者将按照该金额支付" />
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="3" title="选择外包计算者合约地址" icon="add_comment" :done="step > 3">
        <SelectCalculator v-model="calculator" />
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="上传数据" icon="add_comment">
        可以返回历史交易记录页面查看最新的合约。
        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" @click="uploadData" />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import Sheet from 'src/components/Sheet'
import SelectCalculator from 'src/components/SelectCalculator'
import { EthTest } from 'src/scripts/eth'

const eth = new EthTest()

export default {
  components: {
    Sheet,
    SelectCalculator,
  },
  data: () => ({
    step: 1,
    data: { },
    epsilon: 1,
    price: 42,
    calculator: '',
  }),
  methods: {
    uploadData() {
      console.log(this.data, this.epsilon, this.price, this.calculator)
      eth.uploadNewData(this.data, this.epsilon, this.price, this.calculator)
    },
  },
}
</script>

<style>
.q-stepper {
  min-width: 500px;
}
</style>
