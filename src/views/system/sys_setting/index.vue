<template>
  <ElForm
    ref="formRef"
    v-loading="loading"
    class="form"
    label-position="top"
    label-width="155px"
    :model="form"
    :rules="rules"
    size="default"
    status-icon
  >
    <ElFormItem label="网站名称：" prop="web_name">
      <ElInput v-model="form.web_name" placeholder="网站名称" />
    </ElFormItem>
    <ElFormItem label="最小归集数量：" prop="min_collect_num">
      <ElInput v-model="form.min_collect_num" placeholder="最小归集数量" />
    </ElFormItem>

    <ElFormItem label="在线客服：" prop="online_service">
      <ElInput v-model="form.online_service" placeholder="在线客服" />
    </ElFormItem>

    <ElFormItem label="WhatsApp客服：" prop="whatsapp_service">
      <ElInput v-model="form.whatsapp_service" placeholder="WhatsApp客服" />
    </ElFormItem>
    <ElFormItem label="Telegram客服：" prop="telegram_service">
      <ElInput v-model="form.telegram_service" placeholder="Telegram客服" />
    </ElFormItem>

    <ElFormItem label="LOGO，PNG格式:">
      <ElUpload
        :action="state.uploadUrl"
        :before-upload="beforeUploadUpload"
        class="avatar-uploader"
        :headers="state.uploadHeaders"
        :on-success="handleLogoUploadSuccess"
        :show-file-list="false"
      >
        <ElImage
          v-if="form.logo"
          fit="contain"
          :src="form.logo"
          style="width: 100px; height: 100px"
        />
        <ElIcon v-else class="avatar-uploader-icon"><Plus /></ElIcon>
      </ElUpload>
    </ElFormItem>
    <ElFormItem label="首页Banner图:">
      <ElUpload
        :action="state.uploadUrl"
        :before-upload="beforeUploadUpload"
        class="avatar-uploader"
        :headers="state.uploadHeaders"
        :on-success="handleHomeBannerUploadSuccess"
        :show-file-list="false"
      >
        <ElImage
          v-if="form.home_banner"
          fit="contain"
          :src="form.home_banner"
          style="width: 100px; height: 100px"
        />
        <ElIcon v-else class="avatar-uploader-icon"><Plus /></ElIcon>
      </ElUpload>
    </ElFormItem>
    <ElFormItem label="网站开关:">
      <ElSwitch
        v-model="form.is_close"
        :active-value="`1`"
        :inactive-value="`0`"
      />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="submitForm(formRef)">提交</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup>
  import { useUserStore } from '@/store/modules/user'
  import { editSetting, getSettingLists } from '@/api/setting'
  const userStore = useUserStore()
  const { token } = userStore
  const formRef = ref()

  const loading = ref(true)

  const state = reactive({
    uploadUrl: `${process.env.VUE_APP_BASE_URL}/admin/Upload/index`,
    uploadHeaders: {
      Authorization: `Bearer ${token}`,
    },
    loadingInstance: null,
  })

  const form = ref({
    web_name: '',
    online_service: '',
    whatsapp_service: '',
    telegram_service: '',
    logo: '',
    is_close: '',
  })

  const rules = reactive({
    web_name: [
      { required: false, message: '网站名称不能为空', trigger: 'blur' },
    ],
    online_service: [
      { required: false, message: '在线客服不能为空', trigger: 'blur' },
    ],
    whatsapp_service: [
      { required: false, message: 'WhatsApp客服不能为空', trigger: 'blur' },
    ],
    telegram_service: [
      { required: false, message: 'Telegram客服不能为空', trigger: 'blur' },
    ],
    logo: [{ required: false, message: 'LOGO不能为空', trigger: 'blur' }],
  })

  const $baseMessage = inject('$baseMessage')

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        loading.value = true
        const { msg } = await editSetting(form.value)
        $baseMessage(msg, 'success', 'vab-hey-message-success')
        loading.value = false
        await getData()
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  async function getData() {
    const res = await getSettingLists()
    loading.value = false
    // eslint-disable-next-line no-prototype-builtins
    if (!res.data?.hasOwnProperty(`length`)) {
      form.value = res.data
    }
  }

  const handleLogoUploadSuccess = (response, uploadFile) => {
    const { code, data } = response
    if (code === 200) {
      form.value.logo = data.path
    }
  }

  const handleHomeBannerUploadSuccess = (response, uploadFile) => {
    const { code, data } = response
    if (code === 200) {
      form.value.home_banner = data.path
    }
  }

  const beforeUploadUpload = (rawFile) => {
    console.log(`beforeUploadUpload`, rawFile)
  }

  onMounted(() => {
    getData()
  })
</script>
<style>
  .form {
    padding: 10px;
  }

  .text-center {
    text-align: center;
  }
</style>
