<template>
  <q-page class="flex flex-center">
  {{data}}
    <q-table
      title="历史交易记录"
      :data="data"
      :columns="columns"
      row-key="id"

      class="table"
    >
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="on = !on" />
    </q-page-sticky>
    <q-dialog v-model="on">
    </q-dialog>
  </q-page>
</template>

<script>
import { EthTest } from 'src/scripts/eth'

export default {
  name: 'DataOwner',
  components: {},
  data: () => ({
    columns: [
      { name: 'id', label: '合约地址', field: 'id', align: 'center' },
      { name: 'date', label: '日期', field: 'date' },
      { name: 'status', label: '状态', field: 'status' },
      { name: 'payment', label: '支付金额', field: 'payment' },
      { name: 'from', label: '购买者', field: 'from' }
    ],
    on: false,
  }),
  methods: {
    toggleFAB: function () {
      this.on = !this.on
    }
  },
  created() {
    const etherTest = new EthTest()
    this.data = etherTest.getTransactionsAsDataOwner()
  },
}
</script>

<style scoped>
.table {
  width: 800px;
}
</style>
