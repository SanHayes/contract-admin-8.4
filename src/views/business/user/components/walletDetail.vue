<script setup>
  import Basic from './basic.vue'
  import Assets from './assets.vue'
  import Infomation from './infomation.vue'

  const state = reactive({
    dialogFormVisible: false,
    form: {},
  })
  const tabName = ref('basic')

  const emits = defineEmits(['fetch-data'])

  const showEdit = (row) => {
    state.name = `用户id：${row.id}`
    state.form = JSON.parse(JSON.stringify(row))
    state.dialogFormVisible = true
  }

  const close = () => {
    state.form = {}
    state.dialogFormVisible = false
  }

  defineExpose({
    showEdit,
  })
</script>

<template>
  <ElDialog
    v-model="state.dialogFormVisible"
    :title="state.name"
    top="5vh"
    width="850px"
    @close="close"
  >
    <ElTabs v-model="tabName" type="border-card">
      <ElTabPane label="基本信息" name="basic">
        <Basic v-if="tabName === 'basic'" :data="state.form" @close="close" />
      </ElTabPane>
      <ElTabPane label="资产详情" name="assets">
        <Assets v-if="tabName === 'assets'" :data="state.form" @close="close" />
      </ElTabPane>
      <ElTabPane label="注册登录信息" name="infomation">
        <Infomation
          v-if="tabName === 'infomation'"
          :data="state.form"
          @close="close"
        />
      </ElTabPane>
    </ElTabs>
  </ElDialog>
</template>

<style scoped lang="scss"></style>
