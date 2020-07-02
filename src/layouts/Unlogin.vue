<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>Privace
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="row wrap justify-center items-center content-center">
        <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
// import Login from 'src/components/Login'

export default {
  components: {
    // Login
  },
  data () {
    return {}
  }
}
</script>
