<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>Privace
        </q-toolbar-title>
       <div class="q-pa-sm">
          <q-btn-group flat>
          </q-btn-group>
        </div>
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
  watch: {
    $route () {
      this.currentRoute = this.$route.path
    }
  },
  data () {
    return {}
  },
  created () {
    this.currentRoute = this.$route.path
  }
}
</script>
