<template>
  <el-row class="pd_b_20 pd_t_20">
    <el-col :span="24">
      <ElForm ref="formRef" label-width="300px" :model="form" :rules="rules">
        <el-row>
          <el-col :span="16">
            <ElFormItem
              class="flex_start"
              label="是否自定义体现出金钱包"
              prop="isSetWallet"
            >
              <el-radio-group v-model="form.isSetWallet">
                <el-radio :label="0" size="large">开启</el-radio>
                <el-radio :label="1" size="large">关闭</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="flex_center mg_t_20" :span="24">
            <ElButton round type="primary" @click="onSubmit">确定设置</ElButton>
          </el-col>
        </el-row>
      </ElForm>
    </el-col>
  </el-row>
</template>

<script setup>
  const form = reactive({
    domainNames: [],
  })

  const formRef = ref()
  // 表单校验规则
  const rules = reactive({
    isSetWallet: [
      {
        required: true,
        message: '请选择是否自定义体现出金钱包',
        trigger: 'blur',
      },
    ],
  })

  const $baseMessage = inject('$baseMessage')

  const emits = defineEmits(['fetch-data'])

  // 提交表单
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        console.log('测试')
      }
    })
  }
</script>

<style scoped lang="scss"></style>
