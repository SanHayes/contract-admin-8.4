<script setup>
  import { saveLevelDivided } from '@/api/level'

  const state = reactive({
    dialogFormVisible: false,
    form: {},
    confirm_password: '',
    rules: {
      name: [{ required: true, trigger: 'blur', message: '请输入等级名称' }],
      balance: [
        { required: true, trigger: 'blur', message: '请输入最低USDT数量' },
      ],
      rate1: [{ required: true, trigger: 'blur', message: '请输入一级佣金率' }],
      rate2: [{ required: true, trigger: 'blur', message: '请输入二级佣金率' }],
      rate3: [{ required: true, trigger: 'blur', message: '请输入三级佣金率' }],
    },
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
        const { code, msg } = await saveLevelDivided(state.form)
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
    <ElForm ref="formRef" :model="state.form" :rules="state.rules">
      <ElFormItem label="等级名称:" prop="name">
        <ElInput v-model="state.form.name" placeholder="等级名称" />
      </ElFormItem>
      <ElFormItem label="最低USDT数量:" prop="balance">
        <ElInput v-model="state.form.balance" placeholder="最低USDT数量" />
      </ElFormItem>
      <ElFormItem label="一级佣金率(%):" prop="rate1">
        <ElInput v-model="state.form.rate1" placeholder="一级佣金率(%)" />
      </ElFormItem>
      <ElFormItem label="二级佣金率(%):" prop="rate2">
        <ElInput v-model="state.form.rate2" placeholder="二级佣金率(%)" />
      </ElFormItem>
      <ElFormItem label="三级佣金率(%):" prop="rate3">
        <ElInput v-model="state.form.rate3" placeholder="三级佣金率(%)" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss"></style>
