<template>
  <q-page class="full-width row flex justify-center items-center">
    <div class="q-pa-md full-width">
      <div class="row justify-center">
        <div class="col-lg-3 col-sm-8">
          <template v-if="privateKey">
            <q-card class="my-card">
              <q-card-section class="bg-teal text-white">
                <div class="text-h6">新账户</div>
              </q-card-section>
              <q-seperator></q-seperator>
              <q-card-section class>
                <div class="text-h6">
                  <q-input :value="account" label="账户">
                    <template v-slot:append>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
                      </q-avatar>
                    </template>
                  </q-input>
                  <q-input :value="privateKey" type="password" label="私钥">
                    <template v-slot:append>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
                      </q-avatar>
                    </template>
                  </q-input>
                </div>
              </q-card-section>
              <q-seperator></q-seperator>
              <q-card-actions align="right">
                <!-- <q-btn outline @click="generateAccount">点击以生成新账户</q-btn> -->
              </q-card-actions>
            </q-card>
          </template>
          <template v-else>
            <q-card class="my-card">
              <q-card-section class="bg-teal text-white">
                <div class="text-h6">注册</div>
              </q-card-section>
              <q-seperator></q-seperator>
              <q-card-actions align="right">
                <q-btn outline @click="generateAccount">点击以生成新账户</q-btn>
              </q-card-actions>
            </q-card>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      account: 'xxxx',
      privateKey: '',
      step: 1,
      lorem: 'rsfe asfd asfd asd'
    }
  },
  methods: {
    generateAccount () {
      this.privateKey = 'this is private key'
    }
  }
}
</script>

<style>
</style>
