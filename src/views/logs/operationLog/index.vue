<template>
  <div class="page">
    <ElForm class="query-form" inline :label-width="80" :model="formData">
      <ElFormItem label="IP :" prop="ip" style="width: 25%">
        <ElInput v-model="formData.ip" />
      </ElFormItem>
      <ElFormItem label="请求域名 :" prop="domain" style="width: 25%">
        <ElInput v-model="formData.domain" />
      </ElFormItem>
      <ElFormItem label="用户名 :" prop="admin_id" style="width: 25%">
        <ElInput v-model="formData.admin_id" />
      </ElFormItem>
      <ElFormItem label="URL :" prop="url" style="width: 25%">
        <ElInput v-model="formData.url" />
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
      size="small"
    >
      <!--<ElTableColumn label="id" prop="id" />-->
      <ElTableColumn label="用户名" prop="admin.username" />
      <ElTableColumn label="ip" prop="ip" />
      <ElTableColumn label="请求域名" prop="domain" />
      <ElTableColumn label="url" prop="url" width="240" />
      <ElTableColumn
        :formatter="paramFormatter"
        label="请求参数"
        prop="param"
      />
      <ElTableColumn label="时间" prop="create_time" />
    </ElTable>
    <ElPagination
      v-model:current-page="page.current"
      v-model:page-size="page.pageSize"
      hide-on-single-page
      layout="jumper,next,pager,prev,total"
      :total="data.total"
      @current-change="getData"
      @size-change="getData"
      small
    />
  </div>
</template>
<script setup>
  import { onMounted, ref, reactive } from 'vue'
  import { getOperationList } from '@/api/log'
  const loading = ref(false)
  const $baseTableHeight = inject('$baseTableHeight')
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight(1) - 24,
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
    const res = await getOperationList(params)
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
  const paramFormatter = (row, column) => {
    const v = row.param
    return JSON.stringify(v)
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
