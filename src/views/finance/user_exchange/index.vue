<template>
  <div class="page">
    <ElForm class="query-form" inline :label-width="80" :model="formData">
      <ElFormItem label="用户名 :" prop="username" style="width: 25%">
        <ElInput v-model="formData.username" />
      </ElFormItem>
      <div class="action-groups">
        <ElButton plain icon="search" type="success" @click="onSearch">
          查询
        </ElButton>
        <ElButton plain icon="RefreshLeft" type="warning" @click="onRest">
          重置
        </ElButton>
      </div>
    </ElForm>
    <ElTable
      :data="data.data"
      empty-text="No Data"
      row-key="id"
      style="width: 100%"
      :height="data.height"
    >
      <ElTableColumn label="用户名" prop="user.username" />
      <ElTableColumn label="币种" prop="token.symbol" />
      <ElTableColumn
        :formatter="assetsTypeFormatter"
        label="账户类型"
        prop="assets_type"
      />
      <ElTableColumn label="旧余额" prop="old_balance" />
      <ElTableColumn label="金额" prop="amount" />
      <ElTableColumn label="新余额" prop="new_balance" />
      <ElTableColumn
        :formatter="transferTypeFormatter"
        label="业务类型"
        prop="transfer_type"
      />
      <ElTableColumn
        :formatter="inOutFormatter"
        label="收入支出"
        prop="in_out"
      />
      <ElTableColumn label="备注" prop="remark" />
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
  import { getUserConversionList } from '@/api/finance'
  const loading = ref(false)
  const $baseTableHeight = inject('$baseTableHeight')
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight(1)
  })
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
    const res = await getUserConversionList(params)
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
  const assetsTypeFormatter = (row, column) => {
    const v = row.assets_type
    switch (v) {
      case `available`:
        return `可用`
      case `frozen`:
        return `冻结`
    }
  }
  const transferTypeFormatter = (row, column) => {
    const v = row.transfer_type
    switch (v) {
      case `exchange`:
        return `兑换`
      case `withdraw`:
        return `提现`
    }
  }
  const inOutFormatter = (row, column) => {
    const v = row.in_out
    switch (v) {
      case `in`:
        return `收入`
      case `out`:
        return `支出`
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
