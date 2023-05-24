import type { App } from 'vue'

// 加载雪碧图
import '@/icon'
// 加载全局样式样式
import './styles/vab.scss'

import { createHead } from '@vueuse/head'

// 加载Icon
import VabIcon from 'vab-icons'
import 'vab-icons/lib/vab-icons.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function setupVab(app: App<Element>) {
  app.use(createHead())
  app.component('VabIcon', VabIcon)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 加载背景
  const Themes = require.context('./styles/background', false, /\.scss$/)
  Themes.keys().map(Themes)
  // 加载插件
  const Plugins = require.context('./plugins', true, /\.ts$/)
  Plugins.keys().forEach((key) => {
    app.use(Plugins(key).default)
  })
}
