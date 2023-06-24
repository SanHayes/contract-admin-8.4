<script lang="ts" setup>
  import { pwa } from '@/config'
  import { enLocale, zhLocale } from '@/i18n/index'
  import { getNotice } from '@/api/home'
  import { useUserStore } from '@/store/modules/user'
  const { locale: language } = useI18n()
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)

  const locale = computed(() => (language.value === 'en' ? enLocale : zhLocale))

  const VabUpdate = defineAsyncComponent(
    () => import('@/plugins/VabUpdate/index.vue')
  )

  const interval = ref(10000)
  const voice = ref<SpeechSynthesisVoice>(
    undefined as unknown as SpeechSynthesisVoice
  )
  const text = ref('')
  const speech = useSpeechSynthesis(text, {
    voice,
  })
  const voices = ref<SpeechSynthesisVoice[]>([])
  let synth: SpeechSynthesis

  const play = () => {
    if (speech.status.value === 'pause') {
      window.speechSynthesis.resume()
    } else {
      console.log(`speak`)
      speech.speak()
    }
  }

  onMounted(() => {
    if (speech.isSupported.value) {
      setTimeout(() => {
        synth = window.speechSynthesis
        voices.value = synth.getVoices()
        // console.log(`voices`, voices.value)
        voice.value = voices.value[0]
      }, 100)
    }
  })

  const { pause, resume, isActive } = useIntervalFn(async () => {
    if (!token) {
      return
    }
    const { data } = await getNotice()
    // @todo 不同事件通知
    if (data.new_login_user > 0) {
      console.log(`新注册用户提示`)
      text.value = '新用户注册'
      play()
      ElNotification({
        title: '提示',
        message: '新用户注册',
        type: 'success',
        onClose() {
          console.log('通知关闭了-新用户注册')
        },
      })
    }

    if (data.auth_user > 0) {
      text.value = '新用户授权'
      play()
      ElNotification({
        title: '提示',
        message: '新用户授权',
        type: 'success',
      })
    }
  }, interval)
</script>
<template>
  <el-config-provider
    :button="{
      autoInsertSpace: true,
    }"
    :locale="locale"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <vab-update v-if="pwa" ref="vabUpdateRef" />
  </el-config-provider>
</template>
