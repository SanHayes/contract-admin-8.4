<script setup>
  import { editMessage } from '@/api/message'
  const state = reactive({
    dialogFormVisible: false,
    form: {},
    confirm_password: '',
  })

  const formRef = ref()

  const $baseMessage = inject('$baseMessage')

  const emits = defineEmits(['fetch-data'])

  const showEdit = (row) => {
    console.log(`showEdit`)
    if (!row) {
      state.name = '添加'
    } else {
      state.name = '编辑'
      state.form = JSON.parse(JSON.stringify(row))
    }
    state.dialogFormVisible = true
  }

  const onSubmit = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const { code, msg } = await editMessage(state.form)
        if (code === 200) {
          $baseMessage(msg, 'success', 'vab-hey-message-success')
        } else {
          $baseMessage(msg, 'error', 'vab-hey-message-error')
        }
        emits('fetch-data')
        close()
      }
    })
  }

  const close = () => {
    formRef.value.resetFields()
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
    width="850px"
    @close="close"
  >
    <ElForm ref="formRef" :model="state.form">
      <ElFormItem label="标题:">
        <ElInput v-model="state.form.title" placeholder="标题" />
      </ElFormItem>
      <ElFormItem label="内容:">
        <ElInput v-model="state.form.content" placeholder="内容" />
      </ElFormItem>
      <ElFormItem label="语言:">
        <ElInput v-model="state.form.language" placeholder="语言" />
      </ElFormItem>
      <ElFormItem label="用户名:">
        <ElInput v-model="state.form.user_name" placeholder="用户名" />
      </ElFormItem>
      <ElFormItem label="用户ID:">
        <ElInput v-model="state.form.user_id" placeholder="用户ID" />
      </ElFormItem>
      <ElFormItem label="代理组:">
        <ElInput v-model="state.form.group" placeholder="代理组" />
      </ElFormItem>
      <!--      <ElFormItem label="是否使用:">
        <ElSwitch
          v-model="state.form.status"
          :active-value="1"
          :inactive-value="0"
        />
      </ElFormItem>-->
      <ElFormItem>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss"></style>
