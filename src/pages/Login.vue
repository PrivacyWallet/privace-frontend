<template>
  <q-page class="full-width row flex justify-center items-center">

      <q-card class="my-carditems-center col-md-5 col-sm-8 col-xs-10">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">登录</div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter q-col-gutter-xl">
            <q-input
              filled
              v-model="name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              type="number"
              v-model="age"
              label="Your age *"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div class="row justify-end">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>

        <q-separator />

        <!-- <q-card-actions align="right">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
        </q-card-actions>-->
      </q-card>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      age: null,

      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>

<style scoped>
.my-card {
  /* width: 500px; */
}
</style>
