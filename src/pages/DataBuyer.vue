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
            <q-btn flat round dense icon="vpn_key" @click="print(props.rowIndex)" class="q-ml-md" />
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
    <q-dialog v-model="prikeyPrompt" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">请输入解密用的私钥</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="prikey"
            type="textarea"
            cols="120"
            rows="20"
            autofocus
            @keyup.enter="autofillprikey"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="closePrompt" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import CreateTransaction from 'src/components/CreateTransaction'
import { getTransactionsAsDataBuyer } from 'src/scripts/eth'
import { decryptData } from 'src/scripts/api'


const prikey = `-----BEGIN PRIVATE KEY-----
MIIExAIBADANBgkqhkiG9w0BAQEFAASCBK4wggSqAgEAAoIBAQC+0XbXu+EMGN9P
lzJD2QzbdYsHLkqTcbK5/d1aUhve22gOMu+DAR8CA6BEehfDJIz8OCOhq103bfIf
17Yw/hepEheqHsqSHYzAKfLpH1KnQRrrilcVSd6WV/U43L3jQSlCfBlttcMZBqQw
l4mOR3Eozj6tfZmZkPqtGt7QRbwYDVVTzjvnlT2I9cM8yyCdtRBHdq7Vz38jprtc
tZYhjLbjzceXLQ1cCOOmdsoEFAw6bjoeAsemsC2rOZwXr429mAJtIwQ8gON4z1Pk
l2BYYLWZiVrYrjqTlDl2fUTwjBKetgWDQIz4K8bzYAgH1bo5ZKpl17zhKcoZIRwc
aARTRSC/AgMBAAECggEBAIcR0iPHM/fSK1A1YDkyjK1TuMOues9/rdmF34etk1je
yfszBuMeigps8qdGHUfeuYVXX7FykZtI0hjEIozvb2QYEHQ1M4LWM+laSD3IFEOc
DCgqVpYVIeAeBtDnP+p7F2+eVImaHa27S8Gxoob5/xm5VBiOTYmsW4qYIvuGtn+J
XwqWHWC/UaOz6VUX3oFkwQ0luIw7IQc7M/bma1dx9u4dnLe+wNTl69xZheoYkwYI
+MrvVf5qFs8pHw7RyT5HryHEvGD00jcCgJMgOhjZNcQN2QclXZmD2ZXRVonKCzd/
07AvngyUvYNJMGk1SUJ2ZP1RpSX01mluRx+0F8DHSCECgYkA2gEzcjIk6N7G0dRC
pLTvo4kusbY4RdGIzJVqB1nPv2DQBd7hVWFnG+g3hiSloQKZqQ8/Pa5TpyjJtEtd
3L46p2CTHBaOJZuHtopM9p54ltHc/Dd4tUqwNWBi7Bo6nBizlpswZHZRtO6ja/02
c34OoQGwGfM4/ebXau0VKI+WfpdRHUZz1MwABwJ5AOATRiZb7ObLLj8sDRLX1Cne
Nz/DyU2tqPJFysDF1TBV1LcHMhTQi0ItvWLdohRa/1ha6OWEQaPHgsHT0OXrt4yl
4fUxltEdUr75uou9fKJd21He5AupCwFMTdVG7uHHxfFSshERFpYNlmOuzEUmRQgp
dhGTNEy7iQKBiFPvnHA+cEmc5K4LbLFf3Nh5TBouT5JKL8KdUJqN8Nf9nXp1Kwsl
mn57NU2XtJG+n40hCrdj9F9q6+ZYEkaYk5q4K0voP0ipjmIw85sMvt9K5CvT68zZ
eejDOLMxEhnhxNua2tIDYEgqjY9ZieqDwXwqWzRSmkHf7FcF+1yHlGkfN6Lu6lAn
T2cCeQCFZtQnuCilCqfA0lACPN5CAtrvqncpOM9RVX2tINqYSTE3uh/1xmZyAtsy
hfKdncNRbeYj5oZRpFDTZnCCwb/oC0Yn/NrmKkf+DJ0j3q7Z13jgGAu6aWx03GGm
LPHBF3dgAbSjdoH02agENqfEL1F/13dEZVgIqskCgYgXg/hzTgps7fpNOH69mBov
ocaJQ8SRwcf9aCDLEJ+JobEAt3d50m2G8ysF8ev3fdb3e4KOI68VBOxZ5hCYOyU3
topDMrznzv8R9YyuCxHO4eYmXzOrEEUrJZ1LfVKdkB8mZodFC5SCSQ4792TfxeKc
0kF2QV8JqMTlRy4+hIxfPLl7UEZeXxt/
-----END PRIVATE KEY-----
`

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
        prikey,
      }))

      data = data.map(v => ({...v, date: new Date(v.date).toLocaleString()}))
      data = data.map(v => {
        try {
          return {
            ...v,
            result: JSON.parse(v.result),
          }
        } catch (error) {
          // try privkey
          console.error(error)
          try {
            const result = decryptData(v.result, v.prikey)
            console.log('result:', result)
            return { ...v, result: JSON.parse(result) }
          } catch (error) {
          console.error(error)
            return {
              ...v,
              result: {
                result: '未解密',
              },
            }
          }
        }
      })
      data = data.map(v => {
        if (v.result.resultType === '中位数') return v
        else
          return {
            ...v,
            result: {
              ...v.result,
              resultType: `${v.result.resultType}:${v.result.query}`,
            },
          }
      })
      this.data = data.reverse()
    },
    toggleFAB: async function() {
      this.update()
      this.on = !this.on
    },
    print: function(index) {
      this.prikeyPrompt = true
      this.pro = index
      this.prikey = this.data[index].prikey
    },
    closePrompt: function() {
      this.prikeyPrompt = false
      this.data[this.pro].prikey = this.prikey
    },
    autofillprikey() {
      this.prikey = prikey
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
        headerClasses: 'bg-purple-3',
      },
      {
        name: 'resultType',
        label: '查询结果类型',
        field: row => row.result.resultType,
        align: 'center',
        classes: 'text-accent',
        headerClasses: 'bg-purple-3',
      },
      {
        name: 'resultresult',
        label: '查询结果',
        field: row => row.result.result,
        align: 'center',
        classes: 'text-accent',
        headerClasses: 'bg-purple-3',
      },
      { name: 'transactions', label: 'details', field: 'transactions' },
    ],
    on: false,
    data: [],
    prikeyPrompt: false,
    prikey: null,
    pro: null,
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
