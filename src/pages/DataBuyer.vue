<template>
  <q-page class="flex flex-center">
    {{data}}
    <br />
    {{on}}
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
export default {
  name: 'PageIndex',
  components: { CreateTransaction },
  methods: {
    toggleFAB: function () { this.on = !this.on }
  },
  data: () => ({
    on: false,
    data: [
      {
        datetime: new Date().toISOString(),
        status: '1',
        transaction: [
          {
            userId: 'aaaa',
            amount: '0.3'
          },
          {
            userId: 'bbb',
            amount: '0.5'
          }
        ],
        result: 'encrypted data'
      }
    ]
  })
}
</script>
