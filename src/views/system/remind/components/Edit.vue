<script setup>
  import { saveNotice } from '@/api/notice'

  const state = reactive({
    dialogFormVisible: false,
    form: {},
    confirm_password: '',
  })

  const formRef = ref()

  const $baseMessage = inject('$baseMessage')

  const emits = defineEmits(['fetch-data'])

  const showEdit = (row) => {
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
        const { code, msg } = await saveNotice(state.form)
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

  // @todo 集中管理
  const langs = {
    'zh-TW': '繁体中文',
    en: '英文',
    ja: '日语',
    es: '西班牙语',
    vi: '越南语',
    IN: '印尼语',
    hi: '印地语',
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
      <ElFormItem label="语言 :" prop="language" style="width: 25%">
        <ElSelect v-model="state.form.language">
          <ElOption
            v-for="(item, index) in langs"
            :key="index"
            :label="item"
            :value="index"
          >
            {{ item }}
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="标题:">
        <ElInput v-model="state.form.title" placeholder="标题" />
      </ElFormItem>
      <ElFormItem label="内容:">
        <ElInput v-model="state.form.content" placeholder="内容" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss"></style>
