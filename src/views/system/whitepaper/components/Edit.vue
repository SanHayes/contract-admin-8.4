<template>
  <ElDialog
    v-model="state.dialogFormVisible"
    :title="state.name"
    width="850px"
    @close="close"
  >
    <ElForm ref="formRef" :model="state.form" :rules="rules" label-width="150px">
      <ElFormItem label="标题" prop="title">
        <ElInput v-model="state.form.title" placeholder="请填写标题" />
      </ElFormItem>
      <ElFormItem label="上传图片" prop="icon">
        <el-upload
          accept="image/png,image/ipeg,image/jpg,image/gif"
          :action="state.uploadUrl"
          style="width: 250px;"
          :before-upload="beforeUploadUpload"
          drag
          class="upload-demo"
          :headers="state.uploadHeaders"
          :on-success="uploadImg"
          :show-file-list="false"
        >
          <ElImage
            v-if="state.form.icon"
            fit="contain"
            :src="state.form.icon"
            style="width: 250px;"
          />
          <el-icon class="el-icon--upload" v-else><upload-filled /></el-icon>
        </el-upload>
      </ElFormItem>
      <ElFormItem label="文件" prop="file">
        <ElUpload
          accept="application/pdf"
          :action="state.uploadUrl"
          :before-upload="beforeUploadUpload"
          class="avatar-uploader"
          :headers="state.uploadHeaders"
          :on-success="handleLogoUploadSuccess"
          :show-file-list="false"
        >
          <div v-if="state.form.file" class="flex_start">
            <div @click.stop="downloadFile(state.form.file)" style="margin-right: 20px;" class="flex_start">
                <el-icon :size="20">
                  <Link />
                </el-icon>
                <el-text type="primary">{{ state.form.file }}</el-text>
            </div>
            <el-icon :size="20" @click.stop="removeFile" color="red">
              <Delete />
            </el-icon>
          </div>
          <ElButton v-else type="primary">点击上传</ElButton>
        </ElUpload>
      </ElFormItem>
      <ElFormItem style="margin-top: -10px;">
        <!-- <span>只能上传pdf文件</span> -->
      </ElFormItem>
      
      <ElFormItem class="mg_t_20">
        <ElButton type="plain" @click="close">取消</ElButton>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script setup>
import { saveWhitePaper } from "@/api/paper";
import { useUserStore } from "@/store/modules/user";
import StartEvent from "@logicflow/extension/es/bpmn/events/StartEvent";
import { ref, reactive } from "vue";

const userStore = useUserStore();
const { token } = userStore;

const state = reactive({
  dialogFormVisible: false,
  uploadUrl: `${process.env.VUE_APP_BASE_URL}/admin/Upload/index`,
  uploadHeaders: {
    Authorization: `Bearer ${token}`,
  },
  form: {},
  confirm_password: "",
});
const language = ref("en");

//   表单部分
const formRef = ref();
const rules = reactive({
  icon: [{ required: true, message: "请上传图片", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur" }],
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
});
// @todo 集中管理
const langs = {
  "zh-TW": "繁体中文",
  en: "英文",
  ja: "日语",
  es: "西班牙语",
  vi: "越南语",
  IN: "印尼语",
  hi: "印地语",
};
// const langFormatter = (row, column) => {
//   const v = row.language
//   return langs[v] ?? ''
// }

const $baseMessage = inject("$baseMessage");

const emits = defineEmits(["fetch-data"]);

// 上传文件/图片
const beforeUploadUpload = (rawFile) => {
  console.log('beforeUploadUpload', rawFile)
};
const handleLogoUploadSuccess = (response, uploadFile) => {
  const { code, data } = response;
  if (code === 200) {
    state.form.file = data.path;
  }
};
// 成功上传图片
const uploadImg = (response, uploadFile) => {
  const { code, data } = response;
  if (code === 200) {
    state.form.icon = data.path;
  }
};
// 删除已上传的文件
const removeFile = () => {
  state.form.file = '';
}
// 下载文件
const downloadFile = (url) => {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.download = state.form.title  || ''
  a.click()
}

const close = () => {
  formRef.value.resetFields();
  state.form = {};
  state.dialogFormVisible = false;
};

const showEdit = (row) => {
  if (!row) {
    state.name = "添加";
  } else {
    state.name = "编辑";
    state.form = JSON.parse(JSON.stringify(row));
  }
  state.dialogFormVisible = true;
};

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      state.form.language = state.form.language || language.value;
      const { code, msg } = await saveWhitePaper(state.form);
      if (code === 200) {
        $baseMessage(msg, "success", "vab-hey-message-success");
      } else {
        $baseMessage(msg, "error", "vab-hey-message-error");
      }
      emits("fetch-data");
      close();
    }
  });
};

defineExpose({
  showEdit,
});
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
