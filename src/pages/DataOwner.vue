<template>
  <q-page class="flex flex-center row">
    {{transactionsHistory}}
    <br/>
    {{dataHistory}}
    <q-table
      title="交易历史"
      :data="transactionsHistory"
      :columns="transactionsHistoryColumns"
      :visible-columns="transactionsHistoryVisibleColumns"
      row-key="id"
      class="table col-sm-11 col-md-8 col-xl-6"
    ></q-table>
  <q-table
      title="上传数据历史"
      :data="dataHistory"
      :columns="dataHistoryColumns"
      :visible-columns="dataHistoryVisibleColumns"
      row-key="id"
      class="table col-sm-11 col-md-8 col-xl-6"
    ></q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="on = !on" />
    </q-page-sticky>
    <q-dialog v-model="on">
      <UploadData />
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
    transactionsHistoryVisibleColumns: ['id', 'date', 'status', 'payment', 'from', 'dataBuyerContractAddress'],
    transactionsHistoryColumns: [
      { name: 'id', label: '合约地址', field: 'id', align: 'center' },
      { name: 'date', label: '日期', field: 'date', align: 'center' },
      { name: 'status', label: '状态', field: 'status' },
      { name: 'payment', label: '支付金额', field: 'payment' },
      { name: 'from', label: '购买者', field: 'from' },
      { name: 'dataBuyerContractAddress', label: '购买者合约地址', field: 'dataBuyerContractAddress' },
    ],
    transactionsHistory: [],
    dataHistoryVisibleColumns: ['price', 'epsilon','databuyer', 'databuyerContract', 'calculatorContract'],
    dataHistoryColumns: [
      {name: 'price', label:'价格', field: 'price', align: 'center'},
      {name: 'epsilon', label:'隐私保护因子', field: 'epsilon', align: 'center'},
      {name: 'databuyer', label:'购买者', field: 'databuyer', align: 'center'},
      {name: 'databuyerContract', label:'购买者合约地址', field: 'databuyerContract', align: 'center'},
      {name: 'calculatorContract', label:'购买者合约地址', field: 'calculatorContract', align: 'center'},
    ],
    dataHistory:[],
    on: false,
  }),
  methods: {
    toggleFAB: function() {
      this.on = !this.on
    },
  },
  created() {
    let data = getTransactionsAsDataOwner()
    console.log(data)
    data = data.map(v => ({ ...v, date: v.date.toLocaleString() }))
    console.log(data)
    this.transactionsHistory = data

    data = getData();
    for(let i = 0; i< data.length; i+=1){
      data[i].id = i;
    }
    this.dataHistory = data

  },
}
</script>

<style scoped>
</style>
