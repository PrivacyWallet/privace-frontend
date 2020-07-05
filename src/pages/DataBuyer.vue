<template>
  <q-page class="flex flex-center">
    {{data}}
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
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
