<template>
  <div class="page">
    <ElForm
      class="query-form"
      inline
      :label-width="80"
      :model="formData"
    >
      <ElFormItem label="用户名 :" prop="username" style="width: 25%">
        <ElInput v-model="formData.username" />
      </ElFormItem>
      <ElFormItem label="到账地址 :" prop="address_to" style="width: 25%">
        <ElInput v-model="formData.address_to" />
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
      <ElTableColumn label="用户名" prop="user.username" width="80" />
      <ElTableColumn label="到账地址" prop="address_to" width="360" />
      <ElTableColumn label="币种" prop="token.symbol" />
      <ElTableColumn label="数量" prop="amount" />
      <!--        <ElTableColumn label="手续费" prop="fee" />-->
      <!--        <ElTableColumn label="实际发币数量" prop="pay_amount">
          <template #default="{ row }">
            <span class="weightFont">{{ row.pay_amount }}</span>
          </template>
        </ElTableColumn>-->
      <ElTableColumn
        :formatter="statusFormatter"
        label="提现状态"
        prop="status"
      />
      <ElTableColumn label="时间" prop="create_time" width="160" />
      <ElTableColumn label="操作" prop="act" :width="240">
        <template #default="{ row }">
          <ElSpace>
            <ElPopconfirm
              v-if="row.status == 0"
              cancel-button-text="取消"
              confirm-button-text="确认"
              icon-color="#626AEF"
              title="确定审核通过？"
              @confirm="audit(row, 1)"
            >
              <template #reference>
                <ElButton size="small" type="success">通过</ElButton>
              </template>
            </ElPopconfirm>
            <ElPopconfirm
              v-if="row.status == 0"
              cancel-button-text="取消"
              confirm-button-text="确认"
              icon-color="#626AEF"
              title="确定审核拒绝？"
              @confirm="audit(row, 2)"
            >
              <template #reference>
                <ElButton size="small" type="danger">拒绝</ElButton>
              </template>
            </ElPopconfirm>
            <!--              <ElButton size="small" type="primary" @click="getRecord(row)">
                区块链记录
              </ElButton>-->
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
  import { getUserWithdrawalList, financeAudit } from '@/api/finance'

  const $baseMessage = inject('$baseMessage')
  const $baseTableHeight = inject('$baseTableHeight')

  const loading = ref(false)
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight() - 44
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
    const res = await getUserWithdrawalList(params)
    loading.value = false
    data.data = res?.data.data
    data.total = res?.data.total
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

  // 审核
  const audit = async (row, status) => {
    const { code, msg } = await financeAudit({
      id: row.id,
      status,
    })
    if (code === 200) {
      $baseMessage(msg, 'success', 'vab-hey-message-success')
    } else {
      $baseMessage(msg, 'error', 'vab-hey-message-error')
    }
    getData()
  }
  // 区块链记录
  const getRecord = (row) => {}

  const statusFormatter = (row, column) => {
    const v = row.status
    switch (v) {
      case 0:
        return `未审核`
      case 1:
        return `审核通过`
      case 2:
        return `审核拒绝`
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

  .weightFont {
    color: orange;
  }
</style>
