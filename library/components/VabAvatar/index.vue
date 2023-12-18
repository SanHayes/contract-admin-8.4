<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user'
  import { toLoginRoute } from '@/utils/routes'
  import { translate } from '@/i18n'
  import { VabRoute } from '/#/router'
  import {ref, reactive} from 'vue'
  import { updatePassword } from "@/api/user";
  import AddAdmin from "@vab/components/VabAvatar/AddAdmin.vue";


  const route: VabRoute = useRoute()
  const router = useRouter()
  const $baseMessage = inject('$baseMessage')

  const userStore = useUserStore()
  const { avatar, username } = storeToRefs(userStore)
  const { logout, resetAll } = userStore

  const addRef = ref(null)
  const active = ref(false)
  const visible = ref(false)
  const title = ref('修改密码')
  const formType=ref('password')
  const form = reactive({
    newpwd: '',
    goode_code: ''
  })

  const handleVisibleChange = (val: boolean) => {
    active.value = val
  }
  const handleCommand = async (command: string) => {
    switch (command) {
      case 'logout':
        await logout()
        await router.push(toLoginRoute(route.fullPath))
        break
      case 'personalCenter':
        await router.push('/setting/personalCenter')
        break
      case 'updatePassword':
        formType.value = 'password'
        visible.value = true
        title.value = '修改密码'
        break
      case 'addAdmin':
        formType.value = 'add'
        title.value = '新增管理员'
        visible.value = true
        break
    }
  }
  const confirm = () => {
    if (formType.value === 'add'){
      // 新增管理员
      addRef.value.submit()
      return;
    }
    if (!form.newpwd){
      $baseMessage('请填写新密码。','info')
      return
    }
    if (!form.goode_code){
      $baseMessage('请填写Google验证码。','info')
      return
    }
    updatePassword(form).then(res=>{
      console.log('updatePassword', res);
      $baseMessage('修改成功', 'success')
      if (res.code === 200){
        setTimeout(()=>{
          resetAll()
          router.push(toLoginRoute(route.fullPath))
        },500)
      }
    })
  }
  const closeDialog = ()=>{
    visible.value = false
  }
</script>

<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="user-name">
        <span class="hidden-xs-only" :title="username">{{ username }}</span>
        <vab-icon
          class="vab-dropdown"
          :class="{ 'vab-dropdown-active': active }"
          icon="arrow-down-s-line"
        />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!--<el-dropdown-item command="personalCenter">
          <vab-icon icon="user-line" />
          <span>{{ translate('个人中心') }}</span>
        </el-dropdown-item>-->
        <el-dropdown-item command="addAdmin">
          <vab-icon icon="user-add-line" />
          <span>{{ translate('添加管理员') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="updatePassword">
          <vab-icon icon="lock-password-line" />
          <span>{{ translate('修改密码') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <vab-icon icon="logout-circle-r-line" />
          <span>{{ translate('退出登录') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="visible" :title="title" width="30%" align-center center>
    <add-admin v-if="formType === 'add'" ref="addRef" :close="closeDialog" />
    <el-form v-else :model="form" label-width="100px">
      <el-form-item label="新密码">
        <el-input v-model="form.newpwd" type="password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item label="Google验证码">
        <el-input v-model="form.goode_code" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      flex-shrink: 0;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      cursor: pointer;
      span {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      [class*='ri-'] {
        margin-left: 3px !important;
      }
    }
  }
  .el-input{
    width: 240px;
  }
</style>
