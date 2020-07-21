<template>
  <q-page class="flex flex-center row">
    <q-table
      title="历史交易记录"
      :data="data"
      :columns="columns"
      row-key="bidStartID"
      :visible-columns="visibleColumns"
      class="col-sm-11 col-md-8 col-xl-6"
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
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <!-- {{props}} -->
            <q-list bordered separator>
              <q-item-label header>交易详情</q-item-label>
              <q-item v-ripple>
                <q-item-section>owner</q-item-section>
                <q-item-section>payment</q-item-section>
              </q-item>
              <q-item
                v-for="(transaction,idx) in data[props.rowIndex].transactions"
                :key="'s'+idx"
                clickable
                v-ripple
              >
                <!-- <q-item-section avatar>
                  <q-icon name="signal_wifi_off" />
                </q-item-section>-->
                <q-item-section>{{transaction.to}}</q-item-section>
                <q-item-section>{{transaction.payment}}</q-item-section>
              </q-item>
            </q-list>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- {{data}} -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="on = !on" />
    </q-page-sticky>
    <q-dialog v-model="on">
      <CreateTransaction :func="toggleFAB"></CreateTransaction>
    </q-dialog>
  </q-page>
</template>

<script>
import CreateTransaction from 'src/components/CreateTransaction'
import { getTransactionsAsDataBuyer } from 'src/scripts/eth'

export default {
  name: 'PageIndex',
  components: { CreateTransaction },
  methods: {
    toggleFAB: function() {
      this.on = !this.on
    },
  },
  data: () => ({
    visibleColumns: [
      'bidStartID',
      'bidEndID',
      'date',
      'status',
      'deployedContract',
      'calculatorContract',
      'result'
    ],
    columns: [
      {
        name: 'bidStartID',
        label: '交易发起地址',
        field: 'bidStartID',
        align: 'center',
      },
      {
        name: 'bidEndID',
        label: '交易结束地址',
        field: 'bidEndID',
        align: 'center',
      },
      { name: 'date', label: '日期', field: 'date', align: 'center' },
      { name: 'status', label: '状态', field: 'status', align: 'center' },
      {
        name: 'deployedContract',
        label: '部署合约',
        field: 'deployedContract',
        align: 'center',
      },
      {
        name: 'calculatorContract',
        label: '外包计算者合约',
        field: 'calculatorContract',
        align: 'center',
      },
      {
        name: 'result',
        label: '结果',
        field: 'result',
        align: 'center',
      },
      { name: 'transactions', label: 'details', field: 'transactions' },
    ],
    on: false,
    data: [],
  }),
  created() {
    let data = getTransactionsAsDataBuyer()
    console.log(data)
    data = data.map(v => ({ ...v, date: v.date.toLocaleString() }))
    this.data = data
  },
}
</script>
