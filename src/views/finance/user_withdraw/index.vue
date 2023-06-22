<template>
  <div class="page">
    <ElCard>
      <ElForm class="query-form" inline size="small" :label-width="80" :model="formData">
        <ElFormItem label="用户id :" prop="user_id" style="width: 25%">
          <ElInput v-model="formData.user_id" />
        </ElFormItem>
        <ElFormItem label="钱包地址 :" prop="wallet_address" style="width: 25%">
          <ElInput v-model="formData.wallet_address" />
        </ElFormItem>
        <div class="action-groups">
          <ElButton type="primary" plain @click="onSearch" size="small">查询</ElButton>
          <ElButton type="primary" plain @click="onRest" size="small">重置</ElButton>
        </div>
      </ElForm>
    </ElCard>
    <ElCard>
      <template #header>
        <div class="card-header">
          <ElSpace><span>用户提现记录</span></ElSpace>
          <ElSpace> </ElSpace>
        </div>
      </template>
      <ElTable
        :data="data.data"
        style="width: 100%"
        max-height="400"
        row-key="id"
        empty-text="No Data"
      >
        <ElTableColumn prop="user_id" label="用户id" />
        <ElTableColumn prop="wallet_address" label="钱包地址" />
        <ElTableColumn prop="address_to" label="付款地址" />
        <ElTableColumn prop="status" label="提现状态" />
        <ElTableColumn prop="hex" label="交易hex" />
        <ElTableColumn prop="coin" label="资产类型" />
        <ElTableColumn prop="amount" label="提现资产数量" />
        <ElTableColumn prop="real_fee" label="提现手续费" />
        <ElTableColumn prop="username" label="操作人" />
        <ElTableColumn prop="remark" label="备注" />
        <ElTableColumn prop="name" label="所属员工" />
        <ElTableColumn prop="location" label="地区" />
        <ElTableColumn prop="create_time" label="时间" />
        <ElTableColumn prop="act" label="操作" :width="160">
          <ElSpace>
            <ElButton type="warning" @click="verify">审核</ElButton>
            <ElButton type="primary" @click="getRecord">区块链记录</ElButton>
          </ElSpace>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <ElCard>
      <ElPagination
        layout="sizes,jumper,next,pager,prev,total"
        :total="data.total"
        :page-sizes="[15, 30, 50, 80, 100]"
        v-model:page-size="page.pageSize"
        v-model:current-page="page.current"
        @current-change="getData"
        @size-change="getData"
      />
    </ElCard>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
const data = reactive({
  data: [],
  total: 0,
});
const formData = ref({});
const page = reactive({
  current: 1,
  pageSize: 15,
});
async function getData() {

}
onMounted(() => {
  getData();
});
function onSearch() {
  page.current = 1;
  getData();
}
function onRest() {
  formData.value = {};
}

// 审核
const verify = () => {

}
// 区块链记录
const getRecord = () => {

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
