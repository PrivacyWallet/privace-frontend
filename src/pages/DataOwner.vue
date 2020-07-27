<template>
  <q-page class="flex flex-center row">
    <q-table
      :data="transactionsHistory"
      :columns="transactionsHistoryColumns"
      :visible-columns="transactionsHistoryVisibleColumns"
      row-key="id"
      class="table col-sm-12 col-md-11 col-xl-11"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">交易历史</div>

        <q-space />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
    </q-table>
    <q-table
      title="上传数据历史"
      :data="dataHistory"
      :columns="dataHistoryColumns"
      :visible-columns="dataHistoryVisibleColumns"
      row-key="id"
      class="table col-sm-11 col-md-8 col-xl-6"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">上传数据历史</div>
        <q-space />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="on = !on" />
    </q-page-sticky>
    <q-dialog v-model="on">
      <UploadData :func="toggleFAB" />
    </q-dialog>
  </q-page>
</template>

<script>
import UploadData from 'src/components/UploadData'
import { getTransactionsAsDataOwner, getData } from 'src/scripts/eth'

export default {
  name: 'DataOwner',
  components: {
    UploadData,
  },
  data: () => ({
    transactionsHistoryVisibleColumns: [
      'id',
      'date',
      'status',
      'payment',
      'from',
      'dataBuyerContractAddress',
    ],
    transactionsHistoryColumns: [
      { name: 'id', label: '合约地址', field: 'id', align: 'center' },
      { name: 'date', label: '日期', field: 'date', align: 'center' },
      { name: 'status', label: '状态', field: 'status' },
      { name: 'payment', label: '支付金额', field: 'payment' },
      { name: 'from', label: '购买者', field: 'from' },
      {
        name: 'dataBuyerContractAddress',
        label: '购买者合约地址',
        field: 'dataBuyerContractAddress',
      },
    ],
    transactionsHistory: [],
    dataHistoryVisibleColumns: ['id', 'price', 'epsilon', 'calculatorContract'],
    dataHistoryColumns: [
      { name: 'bidStartID', label: '交易ID', field: 'bidStartID', align: 'center' },
      { name: 'price', label: '价格', field: 'price', align: 'center' },
      {
        name: 'epsilon',
        label: '隐私保护因子',
        field: 'epsilon',
        align: 'center',
      },
      {
        name: 'calculatorContract',
        label: '外包计算者合约地址',
        field: 'calculatorContract',
        align: 'center',
      },
    ],
    dataHistory: [],
    on: false,
  }),
  methods: {
    toggleFAB: function() {
      this.on = !this.on
    },
  },
  async created() {
    let data = await getTransactionsAsDataOwner()
    console.log(data)
    console.log(data)
    this.transactionsHistory = data

    data = getData()
    for (let i = 0; i < data.length; i += 1) {
      data[i].id = i
    }
    this.dataHistory = data
  },
}
</script>

<style scoped>
</style>
