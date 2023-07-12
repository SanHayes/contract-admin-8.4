<script setup>
  import { getUserAssets, editUserAssets } from '@/api/user'
  import { ElMessage } from 'element-plus'

  const state = reactive({
    dialogFormVisible: false,
    form: {},
    loading: false,
  })
  const rules = reactive({
    available_balance: [{ required: true, message: '请输入可用余额' }],
    frozen_balance: [{ required: true, message: '请输入冻结余额' }],
    stake_balance: [{ required: true, message: '请输入质押余额' }],
  })
  const emits = defineEmits(['fetch-data'])
  const formRef = ref()
  const showEdit = (row) => {
    const { token_id, id } = row
    state.dialogFormVisible = true
    state.loading = true
    getUserAssets({
      token_id,
      user_id: id,
    })
      .then((res) => {
        if (res.code === 200) {
          state.form = res.data
        }
      })
      .finally(() => {
        state.loading = false
      })
  }

  const close = () => {
    state.form = {}
    state.dialogFormVisible = false
  }
  const submit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const data = state.form
        const {available_balance,frozen_balance,stake_balance} = data
        const nums = [available_balance,frozen_balance,stake_balance].map(item=> Number(item))
        if (nums.some(a=>a<0)) {
          ElMessage.info('输入值需大于0')
          return
        }
        editUserAssets(state.form).then((res) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            emits('fetch-data')
            state.dialogFormVisible = false
          }
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  defineExpose({
    showEdit,
  })
</script>

<template>
  <ElDialog v-model="state.dialogFormVisible" width="400" @close="close">
    <ElForm
      ref="formRef"
      v-loading="state.loading"
      class="form"
      :model="state.form"
      :rules="rules"
      size="default"
      status-icon
    >
      <ElRow>
        <ElCol>
          <ElFormItem label="可用余额：" prop="available_balance">
            <ElInput
              v-model="state.form.available_balance"
              placeholder="可用余额"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="冻结余额：" prop="frozen_balance">
            <ElInput
              v-model="state.form.frozen_balance"
              placeholder="冻结余额"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="质押余额：" prop="stake_balance">
            <ElInput
              v-model="state.form.stake_balance"
              placeholder="质押余额"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <!--<ElRow>
        <ElCol>
          <ElFormItem label="平台余额(USDT)：" prop="amount">
            <ElInput
              v-model="form.amount"
              disabled
              placeholder="平台余额(USDT)"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>-->
      <div class="btns">
        <ElButton type="plain" @click="close">取消</ElButton>
        <ElButton type="primary" @click="submit(formRef)">确定</ElButton>
      </div>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss">
  .btns {
    text-align: center;
  }
</style>
