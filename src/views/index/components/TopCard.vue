<template>
  <vab-card class="top-card" :class="'top-card-' + background" shadow="hover">
    <p class="value">
      <vab-count :end-val="value" />
    </p>
    <span>{{ title }}</span>
    <div class="right-icon">
      <vab-icon :icon="icon" />
    </div>
  </vab-card>
</template>

<script>
  import _ from 'lodash'
  import VabCount from '@/plugins/VabCount'

  export default defineComponent({
    name: 'TopCard',
    components: {
      VabCount,
    },
    props: {
      background: {
        type: String,
        default: 'white',
      },
      title: {
        type: String,
        default: 'Test',
      },
      icon: {
        type: String,
        default: 'album-line',
      },
      value: {
        type: Number,
        default: 0,
      },
    },
    setup() {
      const state = reactive({})

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .top-card {
    position: relative;

    p {
      font-size: 28px;
      margin:0 0 20px;
      font-weight: 700;
      color: #3D3D3D;
    }

    .right-icon {
      position: absolute;
      top: 50%;
      right: 20px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      color: var(--el-color-primary);
      text-align: center;
      background: var(--el-color-primary-light-9);
      border-radius: 50%;
      transform: translateY(-50%);

      i {
        font-size: 35px;
      }
    }

    &-blue {
      color: #fff;
      background: var(--el-color-primary);
      background: linear-gradient(
        90deg,
        var(--el-color-primary-light-4),
        var(--el-color-primary)
      );
    }
  }
</style>
