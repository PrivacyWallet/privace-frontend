<template>
  <q-page class="flex flex-center row">
    <div class="col-12" style="height: 20vh;"></div>
    <div class="col-8" style="height: 80vh;">
      <div class ="q-mx-md text-h4 text-bold"> <div class="q-my-md text-h2 text-bold"><span class="text-purple-9">Privacy</span><span class="text-cyan-7">Wallet</span></div>
      Trading personal data without leaking privacy.
      </div>
      <div class="q-ma-md text-h6">
        PrivacyWallet 是一个区块链上基于差分隐私与凸优化的拍卖系统。
        <br />本系统能够在保证公平交易和个人隐私保护的情况下，实现链上数据交易。
      </div>
    </div>

    <div class="col-12 row" style="height: 70vh;">
      <div class="col-12 flex flex-center text-h4 q-my-lg">PrivacyWallet 是如何运作的</div>
      <div class="col-4 row flex-center" v-for="(i,idx) in intro.howItWorks" :key="'hiw' + idx">
        <q-card class="col-8 my-card">
          <q-card-section>
            <div class="text-h6">{{i.title}}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">{{ i.text }}</q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-12" style="height: 10vh;"></div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      slide: 'style',
      intro: {
        howItWorks: [
          {
            title: '数据所有者',
            text:
              '数据购买者是数据的收集方。他们希望获得数据背后的统计规律,并愿意为此支付价格。',
          },
          {
            title: '外包计算者',
            text:
              '在本系统中提供了差分隐私处理服务。其响应智能合约的差分隐私计算请求,完成计算后,向智能合约返回统计数据的结果。',
          },
          {
            title: '数据购买者',
            text:
              '数据所有者是指隐私数据的所有者、提供者。他们产生隐私数据,是数据的出售方。数据所有者希望在不泄露隐私的情况下、利用这些数据背后的统计价值获取利益。',
          },
        ],
        features: [],
      },
    }
  },
}
</script>

<style scoped>
.my-card {
  height: 200px;
}
</style>
