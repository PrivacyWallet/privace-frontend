<template>
  <q-page class="flex flex-center">
    {{$route.matched.map(v=>v.meta)}}
  </q-page>
</template>

<script>
// import { EthTest } from '../scripts/eth'

// const e = new EthTest()
// e.login('test')

export default {
  name: 'PageIndex'
}
</script>
