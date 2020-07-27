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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.value && col.value.length < 14">{{ col.value }}</span>
            <span v-else-if="col.value && !col.value.startsWith('0x')">{{ col.value }}</span>
            <span v-else-if="col.value">
              {{col.value.substring(0,10)}}
              <q-btn unelevated round v-clipboard="col.value" icon="content_copy"></q-btn>
            </span>
            <span v-else> </span>
          </q-td>
        </q-tr>
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.value && col.value.length < 14">{{ col.value }}</span>
            <span v-else-if="col.value && col.value.startsWith &&!col.value.startsWith('0x')">{{ col.value }}</span>
            <span v-else-if="col.value && typeof(col.value) == 'string'">
              {{col.value.substring(0,10)}}
              <q-btn unelevated round v-clipboard="col.value" icon="content_copy"></q-btn>
            </span>
            <span v-else> {{col.value}} </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="on = !on" />
    </q-page-sticky>
    <q-dialog v-model="on">
      <UploadData :func="toggleFAB" :account="account" />
    </q-dialog>
  </q-page>
</template>

<script>
import UploadData from 'src/components/UploadData'
import { getTransactionsAsDataOwner, getData } from 'src/scripts/eth'

export default {
  name: 'DataOwner',
  props: ['account'],
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
      { name: 'status', label: '状态', field: 'status', align: 'center' },
      { name: 'payment', label: '支付金额', field: 'payment', align: 'center' },
      { name: 'from', label: '购买者', field: 'from', align: 'center' },
      {
        name: 'dataBuyerContractAddress',
        label: '购买者合约地址',
        field: 'dataBuyerContractAddress',
        align: 'center',
      },
    ],
    transactionsHistory: [],
    dataHistoryVisibleColumns: [
      'bidStartID',
      'price',
      'epsilon',
      'calculatorContract',
    ],
    dataHistoryColumns: [
      {
        name: 'bidStartID',
        label: '交易ID',
        field: 'bidStartID',
        align: 'center',
      },
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

    data = await getData()
    for (let i = 0; i < data.length; i += 1) {
      data[i].id = i
    }
    this.dataHistory = data
  },
}
</script>

<style scoped>
</style>
