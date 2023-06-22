<template>
  <el-row class="pd_b_20 pd_t_20">
    <el-col :span="24">
      <ElForm ref="formRef" :model="form" label-width="300px" :rules="rules">
        <el-row>
          <el-col :span="16">
            <ElFormItem label="用户提现最低金额(USD)" prop="minAmount">
              <ElInput
                v-model="form.minAmount"
                placeholder="用户提现最低金额(USD)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="免审核提现金额(USD)" prop="freeAmount">
              <ElInput
                v-model="form.freeAmount"
                placeholder="免审核提现金额(USD)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="提现手续费(%)" prop="tax">
              <ElInput v-model="form.tax" placeholder="提现手续费(%)" type="number" />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="资金变动播报设置" prop="report">
              <ElInput
                v-model="form.report"
                placeholder="设置为-1则为不提醒"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="免审核兑换金额(ETH)" prop="report">
              <ElInput
                v-model="form.report"
                placeholder="免审核兑换金额(ETH)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="授权成功赠送彩金(USD/ETH)" prop="report">
              <ElInput
                v-model="form.report"
                placeholder="授权成功赠送彩金(USD/ETH)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="授权成功推荐人享受彩金(USD/ETH)" prop="report">
              <ElInput
                v-model="form.report"
                placeholder="授权成功推荐人享受彩金(USD/ETH)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="彩金赠送类型" class="flex_start">
              <el-switch
                v-model="form.winningType"
                size="large"
                active-text="USDT"
                inactive-text="ETH"
                active-value="USDT"
                inactive-value="ETH"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="免审核兑换金额(BNB)" prop="exchangeAmount">
              <ElInput
                v-model="form.exchangeAmount"
                placeholder="免审核兑换金额(BNB)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="授权成功赠送彩金(USD/BNB)" prop="exchangeAmount">
              <ElInput
                v-model="form.exchangeAmount"
                placeholder="授权成功赠送彩金(USD/BNB)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="授权成功推荐人享受彩金(USD/BNB)" prop="exchangeAmount">
              <ElInput
                v-model="form.exchangeAmount"
                placeholder="授权成功推荐人享受彩金(USD/BNB)"
                type="number"
              />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="彩金赠送类型" class="flex_start">
              <el-switch
                v-model="form.winningType"
                size="large"
                active-text="USDT"
                inactive-text="ETH"
                active-value="USDT"
                inactive-value="ETH"
              />
            </ElFormItem>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="flex_center mg_t_20">
            <ElButton type="primary" @click="onSubmit" round>确定设置</ElButton>
          </el-col>
        </el-row>
      </ElForm>
    </el-col>
  </el-row>
</template>

<script setup>
const form = reactive({
  domainNames: [],
});
const fileList = ref([]);

const formRef = ref();
// 表单校验规则
const rules = reactive({
  minAmount: [
    { required: true, message: "请输入用户提现最低金额(USD)", trigger: "blur" },
  ],
});

const $baseMessage = inject("$baseMessage");

const emits = defineEmits(["fetch-data"]);

// 接收父组件传递过来的值
const props = defineProps({
  queryGapMap: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

// 提交表单
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
    }
  });
};

// 新增域名 tag input 回显控件
const isAddDomain = ref(false);
// 编辑的域名
const domainName = ref("");
// 关闭域名 tag
const closeDomain = (tag) => {};
// 新增域名
const addDomain = () => {
  isAddDomain.value = true;
};
// 确定输入域名
const confirmDomain = () => {
  if (domainName.value) {
    form.domainNames.push(domainName.value);
  }
  isAddDomain.value = false;
};
</script>

<style scoped lang="scss"></style>
