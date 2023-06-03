<template>
  <div class="personal-center-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card shadow="hover">
          <div class="personal-center-user-info">
            <el-avatar :size="100" :src="avatar" @click="openDialog" />
            <div class="personal-center-user-info-full-name">
              {{ form.fullName }}
            </div>
            <div class="personal-center-user-info-description">
              {{ form.description }}
            </div>
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { useUserStore } from '@/store/modules/user'

  export default defineComponent({
    name: 'PersonalCenter',
    setup() {
      const userStore = useUserStore()
      const { avatar } = storeToRefs(userStore)

      const state = reactive({
        vabCropperRef: null,
        activeName: 'first',
        form: {
          fullName: 'test',
          sex: 2,
          description: 'description',
        },
        inputRef: null,
        inputVisible: false,
        inputValue: '',
      })

      const openDialog = () => {
        state['vabCropperRef'].dialogVisible = true
      }

      return {
        ...toRefs(state),
        avatar,
        openDialog,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $base: '.personal-center';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;

    #{$base}-user-info {
      padding: $base-padding;
      text-align: center;

      :deep() {
        .el-avatar {
          img {
            cursor: pointer;
          }
        }
      }

      &-full-name {
        margin-top: 15px;
        font-size: 24px;
        font-weight: 500;
        color: #262626;
      }

      &-description {
        margin-top: 8px;
      }

      &-follow {
        margin-top: 15px;
      }

      &-list {
        margin-top: 18px;
        line-height: 30px;
        text-align: left;
        list-style: none;

        h5 {
          margin: -20px 0 5px 0;
        }

        :deep() {
          .el-tag {
            margin-right: 10px !important;
          }

          .el-tag + .el-tag {
            margin-left: 0;
          }
        }
      }
    }

    #{$base}-item {
      display: flex;

      i {
        font-size: 40px;
      }

      &-content {
        box-sizing: border-box;
        flex: 1;
        margin-left: $base-margin;

        &-second {
          margin-top: 8px;
        }
      }
    }
  }
</style>
