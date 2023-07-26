<template>
  <div class="page">
    <ElTable
      v-loading="loading"
      :data="data.data"
      :height="data.height"
      empty-text="No Data"
      row-key="id"
      style="width: 100%"
      size="small"
    >
      <!--<ElTableColumn label="id" prop="id" />-->
      <ElTableColumn label="钱包地址" prop="user.wallet_address" />
      <ElTableColumn label="钱包余额" prop="act">
        <template #default="{ row }">
          <ElSpace>
            <ElButton size="small" type="warning" @click="getDetail(row)">获取余额</ElButton>
          </ElSpace>
        </template>
      </ElTableColumn>
    </ElTable>
    <ElPagination
      v-model:current-page="page.current"
      v-model:page-size="page.pageSize"
      layout="jumper,next,pager,prev,total"
      hide-on-single-page
      :total="data.total"
      @current-change="getData"
      @size-change="getData"
      small
    />
  </div>
</template>
<script setup>
  import { getWalletBalance, historyAuthAddress } from '@/api/finance'
  const $baseTableHeight = inject('$baseTableHeight')
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight()
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
