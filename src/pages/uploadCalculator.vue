<template>
  <q-page class="full-width row flex justify-center items-center">
    <q-list bordered padding>
      <q-item-label header>外包计算者合约地址</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Content filtering</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            Require password for purchase or use
            password to restrict purchase
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-input class="full-width" v-model="newCalculatorAddress" placeholder="0xdeadbeaf..." hint="以 0x 开头" label="添加一个新的外包计算者地址" />
        <div class="q-pa-md q-gutter-sm">
        <q-btn flat color="primary" icons="upload" style="width: 80px;" >提交</q-btn>
        </div>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    newCalculatorAddress: ''
  }),
}
</script>

<style>
</style>
