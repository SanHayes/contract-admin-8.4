<template>
  <div class="page">
    <ElForm class="query-form" inline :label-width="80" :model="formData">
      <ElFormItem label="标题 :" prop="title" style="width: 25%">
        <ElInput v-model="formData.title" />
      </ElFormItem>
      <ElFormItem label="语言 :" prop="language" style="width: 25%">
        <ElSelect v-model="formData.language">
          <ElOption
            v-for="(item, index) in langs"
            :key="index"
            :label="item"
            :value="index"
          >
            {{ item }}
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <div class="action-groups">
        <ElButton icon="search" plain type="success" @click="onSearch">
          查询
        </ElButton>
        <ElButton icon="RefreshLeft" plain type="warning" @click="onRest">
          重置
        </ElButton>
        <ElButton
          class="button"
          icon="plus"
          plain
          type="primary"
          @click="editRow($event)"
        >
          新增
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
    >
      <!--<ElTableColumn label="id" prop="id" />-->
      <ElTableColumn :formatter="langFormatter" label="语言" prop="language" />
      <ElTableColumn label="标题" prop="title" />
      <!--        <ElTableColumn label="内容" prop="content" />-->
      <ElTableColumn :formatter="statusFormatter" label="状态" prop="status">
        <template #default="{ row }">
          <ElSwitch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="onSwitchChange(row)"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" prop="act" :width="160">
        <template #default="{ row }">
          <ElSpace>
            <ElButton link type="success" @click="editRow(row)">编辑</ElButton>
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
    <ElPagination
      v-model:current-page="page.current"
      v-model:page-size="page.pageSize"
      layout="jumper,next,pager,prev,total"
      hide-on-single-page
      :total="data.total"
      @current-change="getData"
      @size-change="getData"
    />
    <Edit ref="editRef" @fetch-data="getData" />
  </div>
</template>
<script setup>
  import Edit from './components/Edit.vue'
  import { deleteNotice, getNoticeList, switchNotice } from '@/api/help'

  const loading = ref(false)
  const editRef = ref()
  const $baseMessage = inject('$baseMessage')
  const $baseTableHeight = inject('$baseTableHeight')
  const data = reactive({
    data: [],
    total: 0,
    height: $baseTableHeight(1),
  })
  const formData = ref({
    coin_id: undefined,
  })
  const page = reactive({
    current: 1,
    pageSize: 15,
  })

  // @todo 集中管理
  const langs = {
    'zh-TW': '繁体中文',
    en: '英文',
    ja: '日语',
    es: '西班牙语',
    vi: '越南语',
    IN: '印尼语',
    hi: '印地语',
  }

  async function getData() {
    /* 调用接口查询 */
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await getNoticeList(params)
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

  async function deleteRow(row) {
    const { msg } = await deleteNotice({ id: row.id })
    $baseMessage(msg, 'success', 'vab-hey-message-success')
    await getData()
  }

  function editRow(row) {
    console.log(`editRow`, row)
    if (row.id) {
      //todo
      editRef.value.showEdit(row)
    } else {
      //todo
      editRef.value.showEdit()
    }
  }
  const statusFormatter = (row, column) => {
    const v = row.status
    switch (v) {
      case 1:
        return `是`
      case 0:
        return `否`
    }
  }
  const langFormatter = (row, column) => {
    const v = row.language
    return langs[v] ?? ''
  }
  const onSwitchChange = async (row) => {
    loading.value = true
    await switchNotice({ id: row.id, field: `status` })
    loading.value = false
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
    padding: 12px;
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
