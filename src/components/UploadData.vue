<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      v-on:keyup.enter="generateRandomData"
      vertical
      color="primary"
      animated
      class="stepper"
    >
      <span class="text-h6 q-mx-md">上传新的数据</span>
      <q-step :name="1" title="填写表单" icon="settisngs" :done="step > 1">
        <Sheet :data="data" />
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="继续" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="设置交易参数" caption icon="create_new_folder" :done="step > 2">
        <q-input
          v-model="epsilon"
          :rules="[val => !!val || '此项为必填项']"
          title="隐私保护因子"
          hint="该值越小，隐私保护程度越高,范围: [1,100]"
        />
        <q-input v-model="price" :rules="[val => !!val || '此项为必填项']" title="价格" hint="购买者将按照该金额支付，单位: wei" />
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="返回" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="3" title="选择外包计算者合约地址" icon="add_comment" :done="step > 3">
        <SelectCalculator v-model="calculator" />
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 2" color="primary" label="返回" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="上传数据" icon="add_comment">
        可以返回历史交易记录页面查看最新的合约。
        <q-stepper-navigation>
          <q-btn
            :color="finish? 'positive':'primary'"
            :label="finish? '完成' : '提交'"
            :icon="finish?'done':'cloud_upload'"
            :disable="finish"
            :loading="loading"
            @click="uploadData"
          />
          <q-btn flat @click="step = 3" color="primary" label="返回" class="q-ml-sm" />
          <q-btn flat @click="func" color="primary" label="关闭" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import Sheet from 'src/components/Sheet'
import SelectCalculator from 'src/components/SelectCalculator'
import { uploadNewData, setData } from 'src/scripts/eth'
import form from 'src/scripts/forms'

export default {
  components: { Sheet, SelectCalculator },
  props: ['func', 'account'],
  data: () => ({
    loading: false,
    finish: false,
    step: 1,
    data: {},
    epsilon: 1,
    price: 42,
    calculator: '',
  }),
  methods: {
    uploadData() {
      this.loading = true
      console.log(this.data, this.epsilon, this.price, this.calculator)
      const that = this
      const onsuccess = async receipt => {
        this.loading = false
        this.finish = true
        await setData(
          receipt.transactionHash,
          this.price,
          this.epsilon,
          this.calculator,
          this.account
        )
      }
      const onfail = error => {
        that.loading = false
        console.log(error)
      }
      uploadNewData(
        this.data,
        this.epsilon,
        this.price,
        this.calculator,
        onsuccess,
        onfail
      )
      console.log('finish')
    },
    generateRandomData() {
      console.log('generate Random data')
      const getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max - 1))
      }
      this.$set(this.data, 'age', getRandomInt(80))
      this.$set(
        this.data,
        'gender',
        form.gender[getRandomInt(form.gender.length)]
      )
      this.$set(
        this.data,
        'education',
        form.education[getRandomInt(form.education.length)]
      )
      this.$set(this.data, 'income', getRandomInt(20000))
      this.$set(
        this.data,
        'hometown',
        form.hometown[getRandomInt(form.hometown.length)]
      )
      this.$set(
        this.data,
        'maritalStatus',
        form.maritalStatus[getRandomInt(form.maritalStatus.length)]
      )
      this.$set(
        this.data,
        'wentTo',
        form.wentTo[getRandomInt(form.wentTo.length)]
      )
    },
  },
}
</script>

<style>
.q-stepper {
  min-width: 500px;
}
</style>
