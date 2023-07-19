<template>
  <div class="page">
    <ElForm class="query-form" inline :label-width="80" :model="formData">
      <ElFormItem label="用户名:" prop="username" style="width: 25%">
        <ElInput v-model="formData.username" />
      </ElFormItem>
      <div class="action-groups">
        <ElButton icon="search" plain type="success" @click="onSearch">
          查询
        </ElButton>
        <ElButton icon="RefreshLeft" plain type="warning" @click="onRest">
          重置
        </ElButton>
      </div>
    </ElForm>
    <ElTable
      v-loading="loading"
      :data="data.data"
      empty-text="No Data"
      :height="data.height"
      row-key="id"
      style="width: 100%"
    >
      <!--<ElTableColumn label="id" prop="id" />-->
      <ElTableColumn label="用户名" prop="user.username" />
      <ElTableColumn label="付款地址" prop="user.wallet_address" />
      <ElTableColumn label="币种" prop="token.symbol" />
      <ElTableColumn label="链" prop="token.chain" />
      <ElTableColumn label="数量" prop="amount" />
      <ElTableColumn label="交易hash" prop="txid" />
      <ElTableColumn :formatter="statusFormatter" label="状态" prop="status" />
      <!--        <ElTableColumn label="结果" prop="result" />-->
      <ElTableColumn label="归集时间" prop="update_time" />
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
  import { getCollectionList } from '@/api/finance'
  const $baseTableHeight = inject('$baseTableHeight')
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight(1),
  })
  const loading = ref(false)
  const formData = ref({})
  const page = reactive({
    current: 1,
    pageSize: 15,
  })
  async function getData() {
    /* 调用接口查询 */
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await getCollectionList(params)
    loading.value = false
    data.data = res.data.data
    data.total = res.data.total
  }
  onMounted(() => {
    getData()
  })
  function onSearch() {
    page.current = 1
    getData()
  }
  function onRest() {
    formData.value = {}
  }
  const statusFormatter = (row, column) => {
    const v = row.status
    switch (v) {
      case 1:
        return `已归集`
      case 0:
        return `未归集`
    }
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
