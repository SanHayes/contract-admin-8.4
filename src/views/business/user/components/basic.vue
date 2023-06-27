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
          <ElFormItem label="钱包地址：" prop="wallet_address">
            <ElInput
              v-model="form.wallet_address"
              disabled
              placeholder="钱包地址"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="用户名：" prop="username">
            <ElInput v-model="form.username" placeholder="用户名" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="状态：" prop="is_approve">
            <ElInput
              disabled
              placeholder="状态"
              readonly
              :value="form.is_approve == 1 ? '已授权' : '未授权'"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="推荐上级id：" prop="direct_id">
            <ElInput
              v-model="form.direct_id"
              disabled
              placeholder="推荐上级id"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="用户推广码：" prop="invite_code">
            <ElInput
              v-model="form.invite_code"
              disabled
              placeholder="用户推广码"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="是否重点关注：" prop="is_focus">
            <ElInput
              disabled
              placeholder="是否重点关注"
              readonly
              :value="form.is_focus == 1 ? '是' : '否'"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="用户所属员工：" prop="username">
            <ElInput v-model="username" placeholder="用户所属员工" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="授权地址：" prop="username">
            <ElInput
              v-model="username"
              disabled
              placeholder="授权地址"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="备注：" prop="remark">
            <ElInput v-model="remark" placeholder="备注" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem>
        <ElButton type="plain" @click="cancel">取消</ElButton>
        <ElButton type="primary" @click="submitForm">确定</ElButton>
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

  const emits = defineEmits(['close', 'confirm'])
  // 取消
  const cancel = () => {
    emits('close')
  }
  // 提交表单
  const submitForm = () => {
    formRef.value.validate(async (valid, fields) => {
      if (valid) {
        //   loading.value = true
        //   const { msg } = await editSetting(form.value)
        //   $baseMessage(msg, 'success', 'vab-hey-message-success')
        //   loading.value = false
        //   emits('confirm')
      } else {
          console.log('error submit!', fields)
      }
    })
  }
</script>

<style lang="scss" scoped></style>
