<template>
  <div class="page">
    <ElCard>
      <template #header>
        <div class="card-header">
          <ElSpace><span>历史授权地址</span></ElSpace>
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
        <ElTableColumn prop="coin" label="币种" />
        <ElTableColumn prop="address_to" label="钱包地址" />
        <ElTableColumn prop="act" label="钱包余额" :width="160">
          <template #default="{ row }">
            <ElSpace>
            <ElButton type="warning" @click="getDetail(row)">获取余额</ElButton>
          </ElSpace>
          </template>
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
import { mock } from "mockjs";
import { onMounted, reactive } from "vue";
const data = reactive({
  data: [],
  total: 100,
});
const page = reactive({
  current: 1,
  pageSize: 15,
});
async function getData() {
  /* 调用接口查询 */
  const rowData = await Array.from({ length: page.pageSize }).map((_) =>
    mock({
      coin: "@cword()",
      address_to: "@url",
    })
  );
  data.data = rowData;
  data.total = mock("@integer(200, 300)");
}
onMounted(() => {
  getData();
});
// 获取余额
const getDetail = row => {}
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
