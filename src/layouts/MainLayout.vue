<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      bordered
      class="text-white"
      v-bind:class="{ 'bg-accent' : this.$route.path == '/data-buyer' }"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title>
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs separator-color="white" active-color="white">
              <q-breadcrumbs-el v-for="(b,idx) in breadcrumbList" :key="idx" :label="b" />
            </q-breadcrumbs>
            <!-- {{breadcrumbList}} -->
          </div>
        </q-toolbar-title>

        <q-space />

        <div v-if="$q.screen.gt.sm" class="q-pa-md">账户地址：{{account}}</div>
      </q-toolbar>
      <q-toolbar v-if="!$q.screen.gt.sm" class="q-pa-md">账户地址：{{account}}</q-toolbar>

      <q-tabs align="justify">
        <q-route-tab to="/data-owner" label="数据所有者" />
        <q-route-tab to="/data-buyer" label="数据购买者" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <!-- <li v-for="(breadcrumb, idx) in breadcrumbList" :key="idx">{{breadcrumb.name}}</li> -->
      <router-view :account="account"/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  props: ['account'],

  components: {},

  watch: {
    $route() {
      this.currentRoute = this.$route.path
      this.breadcrumbList = this.$route.matched.map(
        v => v.meta.breadcrumb[0].name
      )
    },
  },
  created() {
    this.currentRoute = this.$route.path
    this.breadcrumbList = this.$route.matched.map(
      v => v.meta.breadcrumb[0].name
    )
    console.log(this.breadcrumbList)
  },

  data() {
    return {
      breadcrumbList: [],
    }
  },
}
</script>
