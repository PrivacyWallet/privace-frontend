<template>
  <q-page class="flex flex-center row">
    {{data}}
    <q-table
      title="历史交易记录"
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="id"
      class="table col-sm-11 col-md-8 col-xl-6"
    ></q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="on = !on" />
    </q-page-sticky>
    <q-dialog v-model="on"></q-dialog>
  </q-page>
</template>

<script>
import { EthTest } from 'src/scripts/eth'

export default {
  name: 'DataOwner',
  components: {},
  data: () => ({
    visibleColumns: ['id', 'date', 'status'],
    columns: [
      { name: 'id', label: '合约地址', field: 'id', align: 'center' },
      { name: 'date', label: '日期', field: 'date', align: 'center' },
      { name: 'status', label: '状态', field: 'status' },
      { name: 'payment', label: '支付金额', field: 'payment' },
      { name: 'from', label: '购买者', field: 'from' },
    ],
    on: false,
  }),
  methods: {
    toggleFAB: function() {
      this.on = !this.on
    },
  },
  created() {
    const etherTest = new EthTest()
    let data = etherTest.getTransactionsAsDataOwner()
    console.log(data)
    data = data.map( v=> ({...v, date: v.date.toLocaleString()}) )
    console.log(data)

    this.data = data
  },
}
</script>

<style scoped>
</style>
