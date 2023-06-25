<template>
  <div class="page">
    <ElCard>
      <template #header>
        <div class="card-header">
          <ElSpace><span>历史授权地址</span></ElSpace>
          <ElSpace />
        </div>
      </template>
      <ElTable
        v-loading="loading"
        :data="data.data"
        empty-text="No Data"
        max-height="400"
        row-key="id"
        style="width: 100%"
      >
        <ElTableColumn label="id" prop="id" />
        <ElTableColumn label="钱包地址" prop="user.wallet_address" />
        <ElTableColumn label="钱包余额" prop="act" :width="160">
          <template #default="{ row }">
            <ElSpace>
              <ElButton type="warning" @click="getDetail(row)">
                获取余额
              </ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <ElCard>
      <ElPagination
        v-model:current-page="page.current"
        v-model:page-size="page.pageSize"
        layout="jumper,next,pager,prev,total"
        :page-sizes="[15, 30, 50, 80, 100]"
        :total="data.total"
        @current-change="getData"
        @size-change="getData"
      />
    </ElCard>
  </div>
</template>
<script setup>
  import { getWalletBalance, historyAuthAddress } from '@/api/finance'
  const data = reactive({
    data: [],
    total: 0,
  })

  const formData = ref({})

  const page = reactive({
    current: 1,
    pageSize: 15,
  })

  const loading = ref(false)

  const $baseMessage = inject('$baseMessage')

  async function getData() {
    /* 调用接口查询 */
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await historyAuthAddress(params)
    loading.value = false
    data.data = res?.data.data
    data.total = res?.data.total
  }

  onMounted(() => {
    getData()
  })
  // 获取余额
  const getDetail = async (row) => {
    const { msg } = await getWalletBalance({ uid: row.user.id })
    $baseMessage(msg, 'success', 'vab-hey-message-success')
  }
</script>
<style>
  .page {
    height: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .page .query-form {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .page .query-form .action-groups {
    margin-left: auto;
  }
  .page .el-card {
    margin-bottom: 4px;
  }
  .page .el-form--inline .el-form-item {
    margin: 0;
    margin-bottom: 10px;
  }
  .page .el-card__body,
  .page .el-card__header {
    padding: 8px;
  }
  .page .card-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
</style>
