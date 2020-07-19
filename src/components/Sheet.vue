<template>
  <div>
    <q-input label="年龄" v-model="data.age" />
    <q-select label="性别" v-model="data.gender" :options="form.gender" />
    <q-select label="职业" v-model="data.occupation" :options="form.occupation" />
    <q-input label="收入" v-model="data.income" />
    <q-select label="居住地" v-model="data.hometown" :options="form.hometown" />
    <q-select label="学历" v-model="data.education" :options="form.education"/>
    <q-select label="婚姻状况" v-model="data.maritalStatus" :options="form.maritalStatus"/>
    <q-select label="去往" v-model="data.wentTo" :options="form.wentTo"/>
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
}
</script>
