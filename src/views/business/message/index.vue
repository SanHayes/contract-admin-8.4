<template>
  <div class="page">
    <ElCard>
      <template #header>
        <div class="card-header">
          <ElSpace><span>站内信</span></ElSpace>
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
        <ElTableColumn label="类型" prop="type" />
        <ElTableColumn label="内容" prop="content" />
        <ElTableColumn label="操作" prop="act" :width="160">
          <template #default="{ row }">
            <ElSpace>
              <ElPopconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                icon-color="#626AEF"
                title="确定删除？"
                @confirm="deleteRow(row)"
              >
                <template #reference>
                  <ElButton link type="danger">删除</ElButton>
                </template>
              </ElPopconfirm>
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
  import { onMounted, ref, reactive } from 'vue'
  import { deleteMessage, getMessageList } from '@/api/message'
  const $baseMessage = inject('$baseMessage')
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
    /* 调用接口查询   */
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await getMessageList(params)
    loading.value = false
    data.data = res.data.data
    data.total = res.data.total
  }
  async function deleteRow(row) {
    const { msg } = await deleteMessage({ id: row.id })
    $baseMessage(msg, 'success', 'vab-hey-message-success')
    await getData()
  }
  onMounted(() => {
    getData()
  })
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
