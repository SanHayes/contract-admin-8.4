<template>
  <div class="page">
    <ElCard>
      <ElForm class="query-form" inline size="small" :label-width="80" :model="formData">
        <ElFormItem label="钱包地址 :" prop="address_to" style="width: 25%">
          <ElInput v-model="formData.address_to" />
        </ElFormItem>
        <ElFormItem label="用户ID:  :" prop="user_id" style="width: 25%">
          <ElInput v-model="formData.user_id" />
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
          <ElSpace><span>归集记录</span></ElSpace>
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
        <ElTableColumn prop="username" label="用户名" />
        <ElTableColumn prop="group_id" label="代理组" />
        <ElTableColumn prop="address_from" label="付款地址" />
        <ElTableColumn prop="address_to" label="收款地址" />
        <ElTableColumn prop="hex" label="交易hash" />
        <ElTableColumn prop="pay_status" label="状态" />
        <ElTableColumn prop="coin" label="资产类型" />
        <ElTableColumn prop="amount" label="归集金额" />
        <ElTableColumn prop="result" label="实际到账金额" />
        <ElTableColumn prop="create_time" label="归集时间" />
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
import { mock } from "mockjs";
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
  /* 调用接口查询 */
  const rowData = await Array.from({ length: page.pageSize }).map((_) =>
    mock({
      username: "@cname",
      group_id: "@id",
      address_from: "@url",
      address_to: "@url",
      hex: "@cword()",
      pay_status: "@cword(1,10)",
      coin: "@cword(1,10)",
      amount: "@integer(1,10)",
      result: "@integer(1,10)",
      create_time: "@cword(1,10)",
    })
  );
  data.data = rowData;
  data.total = mock("@integer(200, 300)");
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
