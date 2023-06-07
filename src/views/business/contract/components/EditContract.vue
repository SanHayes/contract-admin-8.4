<script setup>
  import { editContract } from '@/api/contract'

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
        const { code, msg } = await editContract(state.form)
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
      <ElFormItem label="合约地址:">
        <ElInput v-model="state.form.contract" placeholder="合约地址" />
      </ElFormItem>
      <ElFormItem label="授权代币:">
        <ElInput v-model="state.form.symbol" placeholder="授权代币" />
      </ElFormItem>
      <ElFormItem label="代币地址:">
        <ElInput v-model="state.form.symbol_code" placeholder="代币地址" />
      </ElFormItem>
      <ElFormItem label="小数位数:">
        <ElInput v-model="state.form.precision" placeholder="小数位数" />
      </ElFormItem>
      <ElFormItem label="链:">
        <el-radio-group v-model="state.form.type" class="ml-4">
          <el-radio label="bsc" size="large">BSC</el-radio>
          <el-radio label="erc" size="large">ETH</el-radio>
          <el-radio label="trc" size="large">TRX</el-radio>
        </el-radio-group>
      </ElFormItem>
      <ElFormItem label="归集地址:">
        <ElInput v-model="state.form.to" placeholder="归集地址" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss"></style>
