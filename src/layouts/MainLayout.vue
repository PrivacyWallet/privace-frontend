<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs separator-color="white" active-color="white">
              <q-breadcrumbs-el v-for="(b,idx) in breadcrumbList" :key="idx" :label="b" />
            </q-breadcrumbs>
            <!-- {{breadcrumbList}} -->
          </div>
          <!-- Quasar App -->
        </q-toolbar-title>
        <div class="q-pa-sm">
          <q-btn-group flat>
            <q-btn color="purple" :disable="currentRoute === '/data-owner'" to="/data-owner" label="数据所有者" icon="timeline" />
            <q-btn color="purple" :disable="currentRoute === '/data-buyer'" to="/data-buyer" label="数据购买者" icon="visibility" />
          </q-btn-group>
        </div>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
      <q-toolbar>
      <div class="q-pa-md">
        账户地址: {{account}}
      </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- <li v-for="(breadcrumb, idx) in breadcrumbList" :key="idx">{{breadcrumb.name}}</li> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  props: ["account"],

  components: {

  },

  watch: {
    $route () {
      this.currentRoute = this.$route.path
      this.breadcrumbList = this.$route.matched.map(v => v.meta.breadcrumb[0].name)
    }
  },
  created () {
    this.currentRoute = this.$route.path
    this.breadcrumbList = this.$route.matched.map(v => v.meta.breadcrumb[0].name)
    console.log(this.breadcrumbList)
  },

  data () {
    return {
      leftDrawerOpen: false,
      breadcrumbList: [],
      essentialLinks: [
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'Github',
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework'
        },
        {
          title: 'Discord Chat Channel',
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev'
        },
        {
          title: 'Forum',
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev'
        },
        {
          title: 'Twitter',
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev'
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev'
        },
        {
          title: 'Quasar Awesome',
          caption: 'Community Quasar projects',
          icon: 'favorite',
          link: 'https://awesome.quasar.dev'
        }
      ]
    }
  }
}
</script>
