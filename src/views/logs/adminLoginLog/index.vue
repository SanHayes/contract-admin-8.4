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
        <ElFormItem label="登录IP :" prop="ip" style="width: 25%">
          <ElInput v-model="formData.ip" />
        </ElFormItem>
        <ElFormItem label="请求域名 :" prop="domain" style="width: 25%">
          <ElInput v-model="formData.domain" />
        </ElFormItem>
        <ElFormItem label="用户名 :" prop="admin_id" style="width: 25%">
          <ElInput v-model="formData.admin_id" />
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
          <ElSpace><span>登录日志</span></ElSpace>
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
        <!--        <ElTableColumn label="id" prop="id" />-->
        <ElTableColumn label="登录IP" prop="ip" />
        <ElTableColumn label="请求域名" prop="domain" />
        <ElTableColumn label="用户名" prop="admin_id" />
        <ElTableColumn label="内容" prop="content" />
        <ElTableColumn label="登录时间" prop="create_time" />
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
  import { onMounted, ref, reactive } from 'vue'
  import { getAdminLoginList } from '@/api/log'
  const loading = ref(false)
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
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await getAdminLoginList(params)
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
