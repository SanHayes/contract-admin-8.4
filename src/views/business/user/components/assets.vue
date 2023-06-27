<template>
  <div>
    <ElForm
      ref="formRef"
      v-loading="loading"
      class="form"
      label-width="155px"
      :model="form"
      :rules="rules"
      size="default"
      status-icon
    >
      <ElRow>
        <ElCol>
          <ElFormItem label="初始钱包余额：" prop="old_balance">
            <ElInput
              v-model="form.old_balance"
              disabled
              placeholder="初始钱包余额"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="当前钱包余额：" prop="new_balance">
            <ElInput
              v-model="form.new_balance"
              disabled
              placeholder="当前钱包余额"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="平台余额(主币)：" prop="amount">
            <ElInput
              v-model="form.amount"
              disabled
              placeholder="平台余额(主币)"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
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
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="平台总收益：" prop="amount">
            <ElInput
              v-model="form.amount"
              disabled
              placeholder="平台总收益"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem>
        <ElButton type="plain" @click="cancel">取消</ElButton>
        <ElButton type="primary" @click="cancel">确定</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup>
  const formRef = ref()
  const loading = ref(false)
  const form = ref({})
  const rules = reactive({
    is_focus: [
      { required: true, message: '是否重点关注不能为空', trigger: 'blur' },
    ],
  })
  const props = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
  })

  watch(
    () => props.data,
    () => {
      form.value = JSON.parse(JSON.stringify(props.data))
    },
    {
      deep: true,
      immediate: true,
    }
  )

  const emits = defineEmits(['close'])
  // 取消
  const cancel = () => {
    emits('close')
  }
</script>

<style lang="scss" scoped></style>
