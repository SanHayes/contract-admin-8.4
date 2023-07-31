<script setup>
  import { getUserAssets, editUserAssets } from '@/api/user'
  import { ElMessage } from 'element-plus'

  const state = reactive({
    dialogFormVisible: false,
    form: {},
    loading: false,
    type: '',
    assets: [],
  })
  const rules = reactive({
    available_balance: [{ required: true, message: '请输入可用余额' }],
    frozen_balance: [{ required: true, message: '请输入冻结余额' }],
    stake_balance: [{ required: true, message: '请输入质押余额' }],
    count_earnings: [{ required: true, message: '请输入总收益' }],
    today_earnings: [{ required: true, message: '请输入今日收益' }],
    pool_earnings: [{ required: true, message: '请输入矿池收益' }],
    usdt_balance: [{ required: true, message: '请输入USDT余额' }],
  })
  const emits = defineEmits(['fetch-data'])
  const formRef = ref()
  const showEdit = (row) => {
    const { token_id, id, assets } = row
    state.dialogFormVisible = true
    const defaultAsset = assets[0]
    state.assets = assets
    state.form = defaultAsset
    // token_id=4 //eth
    // token_id=3 //usdt
    state.type = defaultAsset.token_id === 3 ? 'USDT' : 'ETH'
  }
  watch(
    () => state.type,
    (type) => {
      const obj = {USDT: 3,ETH: 4}
      const id = obj[type]
      console.log('type-id', id);
      state.form = state.assets.find(item=>item.token_id === id)
    }
  )
  const close = () => {
    state.form = {}
    state.dialogFormVisible = false
  }
  const submit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const data = state.form
        const { available_balance, frozen_balance, stake_balance, count_earnings, pool_earnings, usdt_balance, settle_usdt_balance } = data
        const nums = [available_balance, frozen_balance, stake_balance, count_earnings, pool_earnings, usdt_balance, settle_usdt_balance].map(
          (item) => Number(item)
        )
        if (nums.some((a) => a < 0)) {
          ElMessage.info('输入值需大于0')
          return
        }
        editUserAssets(state.form).then((res) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            emits('fetch-data')
            state.dialogFormVisible = false
          }
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  defineExpose({
    showEdit,
  })
</script>

<template>
  <ElDialog
    v-model="state.dialogFormVisible"
    align-center
    width="50%"
    @close="close"
  >
    <ElForm
      ref="formRef"
      v-loading="state.loading"
      class="form"
      label-width="120"
      :model="state.form"
      :rules="rules"
      size="default"
      status-icon
    >
      <div class="radio">
        <el-radio-group v-model="state.type">
          <el-radio-button label="USDT" />
          <el-radio-button label="ETH" />
        </el-radio-group>
      </div>
      <ElRow :gutter="24">
        <ElCol :span="12">
          <ElFormItem label="可用余额：" prop="available_balance">
            <ElInput
              v-model="state.form.available_balance"
              placeholder="可用余额"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="冻结余额：" prop="frozen_balance">
            <ElInput
              v-model="state.form.frozen_balance"
              placeholder="冻结余额"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <div v-show="state.type === 'USDT'">
        <ElRow :gutter="24">
          <ElCol :span="12">
            <ElFormItem label="质押余额：" prop="stake_balance">
              <ElInput
                v-model="state.form.stake_balance"
                placeholder="质押余额"
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="总收益：" prop="count_earnings">
              <ElInput
                v-model="state.form.count_earnings"
                placeholder="总收益"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="24">
          <ElCol :span="12">
            <ElFormItem label="今日收益：" prop="today_earnings">
              <ElInput
                v-model="state.form.today_earnings"
                placeholder="今日收益"
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="矿池收益：" prop="pool_earnings">
              <ElInput
                v-model="state.form.pool_earnings"
                placeholder="矿池收益"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="24">
          <ElCol :span="12">
            <ElFormItem label="USDT余额：" prop="usdt_balance">
              <ElInput
                v-model="state.form.usdt_balance"
                placeholder="USDT余额"
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <!--结算USDT余额-->
            <ElFormItem label="最小余额U：" prop="settle_usdt_balance ">
              <ElInput
                v-model="state.form.settle_usdt_balance"
                placeholder="最小余额U(计算收益)"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </div>
      <div class="btns">
        <ElButton type="plain" @click="close">取消</ElButton>
        <ElButton type="primary" @click="submit(formRef)">确定</ElButton>
      </div>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss">
  .btns {
    text-align: center;
  }

  .radio {
    margin-left: 40px;
    margin-bottom: 12px;
  }
</style>
