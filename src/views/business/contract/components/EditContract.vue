<script setup>
  import { editContract } from '@/api/contract'

  const state = reactive({
    dialogFormVisible: false,
    form: {},
    confirm_password: '',
    rules: {
      contract_address: [
        { required: true, trigger: 'blur', message: '请输入合约地址' },
      ],
      token_id: [
        { required: true, trigger: 'blur', message: '请选择授权代币' },
      ],
    },
  })

  const formRef = ref()
  const $baseMessage = inject('$baseMessage')

  const emits = defineEmits(['fetch-data'])

  // 接收父组件传递过来的值
  const props = defineProps(['coin'])

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
    <ElForm ref="formRef" :model="state.form" :rules="state.rules">
      <ElFormItem label="合约地址:" prop="contract_address">
        <ElInput v-model="state.form.contract_address" placeholder="合约地址" />
      </ElFormItem>
      <ElFormItem label="授权代币:" prop="token_id">
        <ElSelect v-model="state.form.token_id">
          <ElOption
            v-for="(item, index) in props.coin.lists"
            :key="index"
            :label="`${item.symbol}-${item.chain}`"
            :value="item.id"
          >
            {{ item.symbol }}-{{ item.chain }}
          </ElOption>
        </ElSelect>
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss"></style>
