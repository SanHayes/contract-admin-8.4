<template>
  <el-row class="pd_b_20 pd_t_20">
    <el-col :span="24">
      <ElForm ref="formRef" label-width="300px" :model="form" :rules="rules">
        <el-row>
          <el-col :span="16">
            <ElFormItem
              class="flex_start"
              label="检测查询总共开关"
              prop="isQuery"
            >
              <el-switch
                v-model="form.isQuery"
                active-text="开启"
                active-value="1"
                inactive-text="关闭"
                inactive-value="0"
                size="large"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem
              label="检测真实金额大于多少的用户(USD)"
              prop="userAmount"
            >
              <ElInput
                v-model="form.userAmount"
                placeholder="检测真实金额大于多少的用户(USD)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="若被其他平台授权将执行">
              <ElSelect v-model="form.queryGap" class="whole_width">
                <ElOption
                  v-for="(item, index) in queryGapMap"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                >
                  {{ item.label }}
                </ElOption>
              </ElSelect>
            </ElFormItem>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="16">
            <ElFormItem label="检测记录">
              <ElButton round type="success" @click="checkRecord">
                点击查看授权检测记录
              </ElButton>
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
    isQuery: [
      { required: true, message: '请选择检测查询总开关', trigger: 'blur' },
    ],
  })
  const queryGapMap = ref([])

  const $baseMessage = inject('$baseMessage')

  const emits = defineEmits(['fetch-data'])

  // 查看授权检测记录
  const checkRecord = () => {}

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
