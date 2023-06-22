<template>
    <el-row class="pd_b_20 pd_t_20">
      <el-col :span="24">
        <ElForm ref="formRef" :model="form" label-width="300px" :rules="rules">
        <el-row>
          <el-col :span="16">
            <ElFormItem label="检测查询总共开关" class="flex_start" prop="isQuery">
                <el-switch
                v-model="form.isQuery"
                size="large"
                active-text="开启"
                inactive-text="关闭"
                active-value="1"
                inactive-value="0"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="检测真实金额大于多少的用户(USD)" prop="userAmount">
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
              <ElSelect class="whole_width" v-model="form.queryGap">
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
                <ElButton type="success" @click="checkRecord" round>点击查看授权检测记录</ElButton>
            </ElFormItem>
          </el-col>
        </el-row>
  
          <el-row>
            <el-col :span="24" class="flex_center mg_t_20">
              <ElButton type="primary" @click="onSubmit" round>确定设置</ElButton>
            </el-col>
          </el-row>
        </ElForm>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
  const form = reactive({
    domainNames: [],
  });
  
  const formRef = ref();
  // 表单校验规则
  const rules = reactive({
    isQuery: [
      { required: true, message: '请选择检测查询总开关', trigger: 'blur' }
    ]
  })
  const queryGapMap = ref([])
  
  const $baseMessage = inject("$baseMessage");
  
  const emits = defineEmits(["fetch-data"]);

  // 查看授权检测记录
  const checkRecord = () => {

  }

  
  // 提交表单
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        
      }
    })
  }
  
  </script>
  
  <style scoped lang="scss"></style>
  