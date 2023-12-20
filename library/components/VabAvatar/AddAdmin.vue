<script setup lang="ts">
import { reactive, defineExpose, ref, defineProps } from "vue";
import { addAdmin } from "@/api/user";
import { vLoading } from "element-plus";

const props = defineProps(['close'])
const formEl = ref(null)
const form = reactive({
  username: "",
  password: "",
  manage_uid: ""
});
const $baseMessage = inject('$baseMessage')
const loading = ref(false)
const reset = ()=>{
  form.username = ''
  form.password = ''
  form.manage_uid = ''
}
const submit = async () => {
  await formEl.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      addAdmin(form).then(res=>{
        $baseMessage(res.msg || '添加成功', 'success')
        reset()
        setTimeout(()=>{
          props.close()
        }, 500)
      }).catch(err=>{
        // $baseMessage(err.msg || '添加失败', 'error')
      }).finally(()=>{
        loading.value = false
      })
    } else {
      console.log('error submit!', fields)
    }
  })
};
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
  ],
  manage_uid: [
    { required: true, message: "请输入用户ID", trigger: "blur" }
  ]
});
defineExpose({submit})
</script>

<template>
  <el-form label-width="100px" ref="formEl" :model="form" :rules="rules" v-loading="loading">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" autocomplete="off" show-password type="password" />
    </el-form-item>

    <el-form-item label="绑定用户id" prop="manage_uid">
      <el-input v-model="form.manage_uid" autocomplete="off" />
      <el-text type="info" size="small">
        绑定后可管理此ID的直推用户
      </el-text>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
