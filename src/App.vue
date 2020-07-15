<template>
  <div id="q-app">
    <router-view :account="account"/>
    <div id="demo">
      <vue-metamask userMessage="msg" @onComplete="onComplete"></vue-metamask>
    </div>
  </div>
</template>

<script>
import VueMetamask from 'vue-metamask'

let account = null

window.ethereum.on('accountsChanged', newAccount => {
  console.log(newAccount)

  if (account!==null) {
    window.location.reload()
  }
})

export default {
  name: 'App',
  components: {
    VueMetamask,
  },
  data() {
    return {
      msg: 'This is demo net work',
      account: "",
    }
  },
  methods: {
    onComplete(data) {
      console.log('data: ', data)
      account = data.account
      this.account = data.metaMaskAddress
    },
  },
}
</script>
