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
        <ElFormItem label="币种 :" prop="symbol" style="width: 25%">
          <ElSelect v-model="formData.coin_id">
            <ElOption
              v-for="(item, index) in coin.lists"
              :key="index"
              :label="`${item.symbol}-${item.chain}`"
              :value="item.id"
            >
              {{ item.symbol }}-{{ item.chain }}
            </ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem
          label="合约地址 :"
          prop="contract_address"
          style="width: 25%"
        >
          <ElInput v-model="formData.contract_address" />
        </ElFormItem>
        <ElFormItem label="钱包地址 :" prop="wallet_address" style="width: 25%">
          <ElInput v-model="formData.wallet_address" />
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
          <ElSpace><span>用户列表</span></ElSpace>
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
        <ElTableColumn label="钱包地址" prop="wallet_address" width="130px">
          <template #default="{ row }">
            <el-popover
              :content="row.wallet_address"
              placement="top-start"
              title="钱包地址"
              trigger="hover"
              :width="240"
            >
              <template #reference>
                <p class="elipseText" @dblclick="setWallet(row)">
                  {{ row.wallet_address }}
                </p>
              </template>
            </el-popover>
          </template>
        </ElTableColumn>
        <ElTableColumn label="授权状态" prop="is_approve">
          <template #default="{ row }">
            <el-tag
              effect="light"
              round
              :type="row.is_approve == 1 ? 'success' : 'warning'"
            >
              {{ row.is_approve == 1 ? '已授权' : '未授权' }}
            </el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn
          :formatter="tokenFormatter"
          label="授权币"
          prop="token.symbol"
        />
        <ElTableColumn label="授权数量" prop="approve_amount" />
        <ElTableColumn label="可提数量" prop="wallet_balance" />
        <ElTableColumn label="已提" prop="collect_amount" />
        <ElTableColumn :formatter="statusFormatter" label="状态" prop="status">
          <template #default="{ row }">
            <ElSwitch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="onStatusSwitchChange(row)"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn
          :formatter="isAutoFormatter"
          label="自动提取"
          prop="status"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.is_auto"
              :active-value="1"
              :inactive-value="0"
              @change="onIsAutoSwitchChange(row)"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" prop="act" :width="200">
          <template #default="{ row }">
            <ElSpace>
              <ElPopconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                icon-color="#626AEF"
                title="确定要用此地址提币？"
                @confirm="withdraw(row)"
              >
                <template #reference>
                  <ElButton link type="success">提币</ElButton>
                </template>
              </ElPopconfirm>
              <!--              <ElPopconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                icon-color="#626AEF"
                title="确定设置质押？"
                @confirm="setPledge(row)"
              >
                <template #reference>
                  <ElButton :disabled="row.is_approve == 0" link type="success">
                    设置质押
                  </ElButton>
                </template>
              </ElPopconfirm>-->
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
              <!-- <el-popover placement="bottom" :width="150" trigger="click">
                <template #reference>
                  <el-button link type="primary">更多操作</el-button>
                </template>
                <div class="operationList">
                  <div class="operationItem" v-for="(item, idx) in operationList" :key="`item${idx}`" @click="operate(item)">{{item.label }}</div>
                </div>
              </el-popover> -->
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <ElCard>
      <ElPagination
        v-model:current-page="page.current"
        v-model:page-size="page.pageSize"
        :background="true"
        layout="jumper,next,pager,prev,total"
        :total="data.total"
        @current-change="getData"
        @size-change="getData"
      />
    </ElCard>

    <WalletDetail ref="walletDetailRef" @fetch-data="getData" />
  </div>
</template>
<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import {
    deleteUser,
    getUserLists,
    switchUser,
    userWithdraw,
  } from '@/api/user'
  import { getSymbols } from '@/api/contract'
  import WalletDetail from './components/walletDetail.vue'

  const loading = ref(false)
  const editRef = ref()
  const $baseMessage = inject('$baseMessage')
  const data = reactive({
    data: [],
    total: 0,
  })
  const coin = reactive({
    lists: [],
  })
  const formData = ref({})
  const page = reactive({
    current: 1,
    pageSize: 15,
  })
  const isAutoFormatter = (row, column) => {
    const v = row.is_auto
    switch (v) {
      case 1:
        return `是`
      case 0:
        return `否`
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
  const tokenFormatter = (row, column) => {
    return `${row.token.symbol}-${row.token.chain}`
  }
  async function getData() {
    /* 调用接口查询 */
    loading.value = true
    const p = {
      page: page.current,
    }
    const params = { ...p, ...toRaw(formData.value) }
    const res = await getUserLists(params)
    const coins = await getSymbols()
    coin.lists = coins.data
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
    const { msg } = await deleteUser({ id: row.id })
    $baseMessage(msg, 'success', 'vab-hey-message-success')
    await getData()
  }

  async function withdraw(row) {
    const { msg } = await userWithdraw({ id: row.id })
    $baseMessage(msg, 'success', 'vab-hey-message-success')
    await getData()
  }
  const onIsAutoSwitchChange = async (row) => {
    loading.value = true
    await switchUser({ id: row.id, field: `is_auto` })
    loading.value = false
  }
  const onStatusSwitchChange = async (row) => {
    loading.value = true
    await switchUser({ id: row.id, field: `status` })
    loading.value = false
  }

  // 双击钱包地址编辑钱包信息
  const walletDetailRef = ref()
  const setWallet = (row) => {
    walletDetailRef.value.showEdit(row)
  }

  // 设置质押
  const setPledge = (row) => {}

  // 更多操作
  const operationList = ref([
    { label: '设置重点关注', value: 1 },
    { label: '赠送平台收益', value: 2 },
    { label: '资产变动记录', value: 3 },
    { label: '收益记录', value: 4 },
    { label: '提现记录', value: 5 },
  ])
  const operate = (operate) => {}
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

  .operationList {
    height: auto;
    max-height: 200px;
    box-sizing: border-box;
    overflow: scroll;

    .operationItem {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
    .operationItem:hover {
      color: #66b1ff;
      background: #ecf5ff;
    }
  }
</style>
