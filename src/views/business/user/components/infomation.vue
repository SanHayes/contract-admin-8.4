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
          <ElFormItem label="注册IP：" prop="join_ip">
            <ElInput
              v-model="form.join_ip"
              disabled
              placeholder="注册IP"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="所在地区：" prop="location">
            <ElInput
              v-model="form.location"
              disabled
              placeholder="所在地区"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="所属域名：" prop="domain">
            <ElInput
              v-model="form.domain"
              disabled
              placeholder="所属域名"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="注册时间：" prop="join_time">
            <ElInput
              v-model="form.join_time"
              disabled
              placeholder="注册时间"
              readonly
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="最后登录时间" prop="prev_time">
            <ElInput
              v-model="form.prev_time"
              disabled
              placeholder="最后登录时间"
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
  const rules = reactive({})
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
