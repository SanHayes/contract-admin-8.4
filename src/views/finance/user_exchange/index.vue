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
        <ElFormItem label="钱包地址 :" prop="address_to" style="width: 25%">
          <ElInput v-model="formData.address_to" />
        </ElFormItem>
        <ElFormItem label="用户ID:  :" prop="user_id" style="width: 25%">
          <ElInput v-model="formData.user_id" />
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
          <ElSpace><span>用户兑换记录</span></ElSpace>
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
        <ElTableColumn label="用户名" prop="username" />
        <ElTableColumn label="钱包地址" prop="address_to" />
        <ElTableColumn label="兑换状态" prop="status" />
        <ElTableColumn label="兑换资产类型" prop="coin" />
        <ElTableColumn label="兑换资产数量" prop="balance" />
        <ElTableColumn label="兑换USDT数量" prop="pay_amount" />
        <ElTableColumn label="操作人" prop="col11" />
        <ElTableColumn label="备注" prop="assets_type" />
        <ElTableColumn label="所属员工" prop="user_id" />
        <ElTableColumn label="地区" prop="col10" />
        <ElTableColumn label="时间" prop="create_time" />
        <ElTableColumn label="操作" prop="act" :width="160">
          <ElSpace>
            <ElButton link type="primary">审核</ElButton>
          </ElSpace>
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
  import { mock } from 'mockjs'
  import { onMounted, ref, reactive } from 'vue'
  import { getUserExchangeList } from '@/api/finance'
  const loading = ref(false)
  const data = reactive({
    data: [],
    total: 0,
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
        username: '@cname',
        address_to: '@cword(1,10)',
        status: '@cword(1,10)',
        coin: '@cword()',
        balance: '@cname',
        pay_amount: '@cword(1,10)',
        col11: '@cword(1,10)',
        assets_type: '@cword(1,10)',
        user_id: '@cword(1,10)',
        col10: '@cword(1,10)',
        create_time: '@date',
      })
    )
    data.data = rowData
    data.total = mock('@integer(200, 300)')

    /* /!* 调用接口查询 *!/
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await getUserExchangeList(params)
    loading.value = false
    data.data = res.data.data
    data.total = res.data.total*/
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
