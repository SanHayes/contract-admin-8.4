const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = {
  createUnPlugin: () => [
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-i18n',
        'vue-router',
        '@vueuse/core',
        {
          axios: [['default', 'axios']],
        },
      ],
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dirs: ['library/components'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts',
    }),
  ],
}
