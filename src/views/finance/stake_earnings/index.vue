<template>
  <div class="page">
    <ElTable
      v-loading="loading"
      :data="data.data"
      empty-text="No Data"
      :height="data.height"
      row-key="id"
      style="width: 100%"
    >
      <!--<ElTableColumn label="id" prop="id" />-->
      <ElTableColumn label="用户" prop="user.username" />
      <ElTableColumn label="代币" prop="token.symbol" />
      <ElTableColumn label="数量" prop="amount" />
      <ElTableColumn :formatter="rateFormatter" label="收益率" prop="rate" />
      <ElTableColumn label="时间" prop="create_time" />
    </ElTable>
    <ElPagination
      v-model:current-page="page.current"
      v-model:page-size="page.pageSize"
      layout="jumper,next,pager,prev,total"
      hide-on-single-page
      :total="data.total"
      @current-change="getData"
      @size-change="getData"
    />
  </div>
</template>
<script setup>
  import { getStakeList } from '@/api/stake'
  const $baseTableHeight = inject('$baseTableHeight')
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight(),
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
    const res = await getStakeList(params)
    loading.value = false
    data.data = res?.data.data
    data.total = res?.data.total
  }

  onMounted(() => {
    getData()
  })

  const rateFormatter = (row, column) => {
    return `${row.rate}%`
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
    padding: 12px 0;
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
