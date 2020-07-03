<template>
  <q-page class="flex flex-center">
    {{$route.matched.map(v=>v.meta)}}
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex'
}
</script>
