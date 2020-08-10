<template>
  <div>
    <q-input label="年龄" v-model="data.age" :rules="[val => !!val || '此项为必填项']" />
    <q-select
      label="性别"
      v-model="data.gender"
      :options="form.gender"
      :rules="[val => !!val || '此项为必填项']"
    />
    <q-input label="收入" v-model="data.income" :rules="[val => !!val || '此项为必填项']" />
    <q-select
      label="居住地"
      v-model="data.hometown"
      :options="form.hometown"
      :rules="[val => !!val || '此项为必填项']"
    />
    <q-select
      label="学历"
      v-model="data.education"
      :options="form.education"
      :rules="[val => !!val || '此项为必填项']"
    />
    <q-select
      label="婚姻状况"
      v-model="data.maritalStatus"
      :options="form.maritalStatus"
      :rules="[val => !!val || '此项为必填项']"
    />
    <q-select
      label="去往"
      v-model="data.wentTo"
      :options="form.wentTo"
      :rules="[val => !!val || '此项为必填项']"
    />
  </div>
</template>

<script>
import form from 'src/scripts/forms'

export default {
  name: 'Sheet',
  props: ['data'],
  data: () => ({
    form: form,
  }),
  methods: {

  },
}
</script>
