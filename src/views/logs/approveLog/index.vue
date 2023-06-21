<template>
  <div class="page">
    <ElCard>
      <ElForm
        class="query-form"
        inline
        :label-width="80"
        :model="formData"
        size="small"
      >
        <ElFormItem label="钱包地址 :" prop="url" style="width: 25%">
          <ElInput v-model="formData.url" />
        </ElFormItem>
        <div class="action-groups">
          <ElButton plain size="small" type="primary" @click="onSearch">
            查询
          </ElButton>
          <ElButton plain size="small" type="primary" @click="onRest">
            重置
          </ElButton>
        </div>
      </ElForm>
    </ElCard>
    <ElCard>
      <template #header>
        <div class="card-header">
          <ElSpace><span>用户授权日志</span></ElSpace>
          <ElSpace />
        </div>
      </template>
      <ElTable
        :data="data.data"
        empty-text="No Data"
        max-height="400"
        row-key="id"
        style="width: 100%"
      >
        <ElTableColumn label="id" prop="id" />
        <ElTableColumn label="登录IP" prop="ip" />
        <ElTableColumn label="钱包地址" prop="url" />
        <ElTableColumn label="授权地址" prop="domain" />
        <ElTableColumn label="交易hash" prop="col1" />
        <ElTableColumn label="代理组" prop="admin_id" />
        <ElTableColumn label="时间" prop="create_time" />
        <ElTableColumn label="操作" prop="act" :width="160">
          <ElSpace>
            <ElButton link type="primary">详情</ElButton>
          </ElSpace>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <ElCard>
      <ElPagination
        v-model:current-page="page.current"
        v-model:page-size="page.pageSize"
        layout="sizes,jumper,next,pager,prev,total"
        :page-sizes="[15, 30, 50, 80, 100]"
        :total="data.total"
        @current-change="getData"
        @size-change="getData"
      />
    </ElCard>
  </div>
</template>
<script setup>
  import { mock } from 'mockjs'
  import { onMounted, ref, reactive } from 'vue'
  const data = reactive({
    data: [],
    total: 100,
  })
  const formData = ref({})
  const page = reactive({
    current: 1,
    pageSize: 15,
  })
  async function getData() {
    /* 调用接口查询 */
    const rowData = await Array.from({ length: page.pageSize }).map((_) =>
      mock({
        id: '@id',
        ip: '@ip',
        url: '@cword(1,10)',
        domain: '@url',
        col1: '@cword(1,10)',
        admin_id: '@cname',
        create_time: '@date',
      })
    )
    data.data = rowData
    data.total = mock('@integer(200, 300)')
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
