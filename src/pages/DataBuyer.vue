<template>
  <q-page class="flex flex-center row">
    <q-table
      title="历史交易记录"
      :data="data"
      :columns="columns"
      row-key="bidStartID"
      :visible-columns="visibleColumns"
      class="col-sm-12 col-md-11 col-xl-10"
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
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.value && col.value.length < 14">{{ col.value }}</span>
            <span
              v-else-if="col.value && col.value.startsWith &&!col.value.startsWith('0x')"
            >{{ col.value }}</span>
            <span v-else-if="col.value && typeof(col.value) == 'string'">
              {{col.value.substring(0,10)}}
              <q-btn unelevated round v-clipboard="col.value" icon="content_copy"></q-btn>
            </span>
            <span v-else>{{col.value}}</span>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props" class="my-div">
          <q-td colspan="100%">
            <q-table
              title="交易详情"
              :data="data[props.rowIndex].transactions"
              :columns="detailColumns"
              row-key="to"
              style="width:auto;"
            />
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
  props: ['account'],
  watch: {
    account: function() {
      this.update()
    },
  },
  methods: {
    async update() {
      let data = await getTransactionsAsDataBuyer(this.account)
      data = data.map(v => ({
        ...v,
        result: JSON.parse(v.result),
      }))
      this.data = data.reverse()
    },
    toggleFAB: async function() {
      this.update()
      this.on = !this.on
    },
  },
  data: () => ({
    detailColumns: [
      { name: 'to', label: '数据所有者', field: 'to', align: 'center' },
      { name: 'payment', label: '支付金额', field: 'payment', align: 'center' },
    ],
    visibleColumns: [
      'bidStartID',
      'bidEndID',
      'date',
      // 'status',

      'deployedContract',
      'queryType',
      'resultType',
      'resultresult',
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
        name: 'result',
        label: '结果',
        field: 'result',
        align: 'center',
      },
      {
        name: 'queryType',
        label: '查询类型',
        field: row => row.result.queryType,
        align: 'center',
        classes: 'text-accent',
        headerClasses: 'bg-purple-3'
      },
      {
        name: 'resultType',
        label: '查询结果类型',
        field: row => row.result.resultType,
        align: 'center',
        classes: 'text-accent',
        headerClasses: 'bg-purple-3'
      },
      {
        name: 'resultresult',
        label: '查询结果',
        field: row => row.result.result,
        align: 'center',
        classes: 'text-accent',
        headerClasses: 'bg-purple-3'
      },
      { name: 'transactions', label: 'details', field: 'transactions' },
    ],
    on: false,
    data: [],
  }),
  async mounted() {
    console.log(this.account)
    if (!this.account) return
    this.update()
  },
}
</script>
<style>
.max-width {
  /*width: 100%;*/
  /*margin: auto;*/
}
.my-div {
  /*display: flex;*/
  /*flex: auto;*/
  /*justify-content: center;*/
}
</style>
