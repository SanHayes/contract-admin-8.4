<template>
  <div class="page">
    <ElCard>
      <template #header>
        <div class="card-header">
          <ElSpace><span>白皮书设置</span></ElSpace>
          <ElSpace />
          <ElSpace>
            <ElButton
              class="button"
              plain
              type="primary"
              @click="editRow($event)"
            >
              新增
            </ElButton>
          </ElSpace>
        </div>
      </template>
      <ElTable
        :data="data.data"
        empty-text="No Data"
        max-height="400"
        row-key="id"
        style="width: 100%"
      >
        <ElTableColumn label="图片" prop="icon">
          <template #default="{ row }">
            <ElImage
              fit="contain"
              :src="row.icon"
              style="width: 100px; height: 100px"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn label="标题" prop="title" />
        <ElTableColumn label="文件链接" prop="file" />
        <ElTableColumn label="操作" prop="act" :width="160">
          <template #default="{ row }">
            <ElSpace>
              <ElButton link type="success" @click="editRow(row)">
                编辑
              </ElButton>
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
    <Edit ref="editRef" @fetch-data="getData" />
  </div>
</template>
<script setup>
  import { onMounted, ref, reactive } from 'vue'
  import Edit from './components/Edit.vue'
  import { getWhitePaperList, deleteWhitePaper } from '@/api/paper'

  const loading = ref(false)
  const editRef = ref()
  const $baseMessage = inject('$baseMessage')

  const data = reactive({
    data: [],
    total: 0,
  })

  // 新增 / 编辑
  const editRow = (row) => {
    console.log(`editRow`, row)
    if (row.id) {
      editRef.value.showEdit(row)
    } else {
      editRef.value.showEdit()
    }
  }

  const page = reactive({
    current: 1,
    pageSize: 15,
  })
  async function getData() {
    /* 调用接口查询 */
    loading.value = true
    const res = await getWhitePaperList(toRaw(data))
    loading.value = false
    data.data = res.data.data
    data.total = res.data.total
  }

  // 删除
  async function deleteRow(row) {
    const { msg } = await deleteWhitePaper({ id: row.id })
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
