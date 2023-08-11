<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user'
  import { toLoginRoute } from '@/utils/routes'
  import { translate } from '@/i18n'
  import { VabRoute } from '/#/router'
  import {ref, reactive} from 'vue'
  import { updatePassword, updateGoogleKey, getGoogleKey } from "@/api/user";


  const route: VabRoute = useRoute()
  const router = useRouter()
  const $baseMessage = inject('$baseMessage')

  const userStore = useUserStore()
  const { avatar, username } = storeToRefs(userStore)
  const { logout, resetAll } = userStore

  const active = ref(false)
  const visible = ref(false)
  const loading = ref(false)
  const formType=ref('password')
  const form = reactive({
    newpwd: '',
    goode_code: '',
  })
  const googleKeyform = reactive({
    google_code: '',
    new_google_key: '',
  })
  const qrcode = ref('')

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
        break
      case 'updateGoogleKey':
        formType.value = 'googleKey'
        visible.value = true
        loading.value = true
        getGoogleKey().then(res=>{
          if (res.code === 200){
            const {secret,url} = res.data
            qrcode.value = url
            googleKeyform.new_google_key = secret
          }
        }).finally(()=>{
          loading.value = false
        })
        break
    }
  }

  const confirm = () => {
    if (formType.value === 'password'){
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
    } else {
      if (!googleKeyform.new_google_key){
        $baseMessage('请填写新谷歌秘钥。','info')
        return
      }
      if (!googleKeyform.google_code){
        $baseMessage('请填写Google验证码。','info')
        return
      }
      updateGoogleKey(googleKeyform).then(async res=>{
        $baseMessage('修改成功', 'success')
        visible.value = false
        setTimeout(()=>{
          resetAll()
          router.push(toLoginRoute(route.fullPath))
        },500)
        // await router.push(toLoginRoute(route.fullPath))
      })
    }
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
        <el-dropdown-item command="updatePassword">
          <vab-icon icon="lock-password-line" />
          <span>{{ translate('修改密码') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="updateGoogleKey">
          <vab-icon icon="shield-keyhole-line" />
          <span>{{ translate('修改谷歌秘钥') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <vab-icon icon="logout-circle-r-line" />
          <span>{{ translate('退出登录') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="visible" title="修改密码" width="30%" align-center center>
    <el-form v-if="formType === 'password'" :model="form" label-width="100px">
      <el-form-item label="新密码">
        <el-input v-model="form.newpwd" type="password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item label="Google验证码">
        <el-input v-model="form.goode_code" autocomplete="off" />
      </el-form-item>
    </el-form>
    <el-form v-else :model="googleKeyform" label-width="100px" v-loading="loading">
      <el-form-item label="新谷歌秘钥">
        <el-input v-model="googleKeyform.new_google_key" autocomplete="off" />
      </el-form-item>
      <div class="qrcode">
        <el-image style="width: 120px;height: 120px" :src="qrcode"/>
        <p class="tips">请用google验证器扫码导入</p>
      </div>
      <el-form-item label="Google验证码">
        <el-input v-model="googleKeyform.google_code" autocomplete="off" />
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
  .qrcode{
    text-align: center;
  }
  .tips{
    font-size: 12px;
    color: #e54d42;
  }
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
