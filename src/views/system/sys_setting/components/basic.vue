<script setup>
import { editContract } from "@/api/contract";

const state = reactive({
  dialogFormVisible: false,
  form: {},
  confirm_password: "",
});
const form = reactive({});

const formRef = ref();

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

</script>

<template>
  <ElForm ref="formRef" :model="form" label-width="140px">
    <el-row>
      <el-col :span="12">
        <ElFormItem label="网站名称:">
          <ElInput v-model="form.title" placeholder="网站名称" />
        </ElFormItem>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ElFormItem label="抓取用户余额周期:">
          <ElSelect v-model="form.queryGap">
            <ElOption
              v-for="(item, index) in props.queryGapMap"
              :key="index"
              :label="item.label"
              :value="item.id"
            >
              {{ item.label }}
            </ElOption>
          </ElSelect>
        </ElFormItem>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ElFormItem label="挖矿结算周期:">
          <ElSelect v-model="form.settlementGap">
            <ElOption
              v-for="(item, index) in props.queryGapMap"
              :key="index"
              :label="item.label"
              :value="item.id"
            >
              {{ item.label }}
            </ElOption>
          </ElSelect>
        </ElFormItem>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ElFormItem label="出金是否需要审核:">
          <el-radio-group v-model="form.output">
            <el-radio :label="true" size="large">是</el-radio>
            <el-radio :label="false" size="large">否</el-radio>
          </el-radio-group>
        </ElFormItem>
      </el-col>
    </el-row>

    <ElFormItem>
      <ElButton type="primary" @click="onSubmit">提交</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style scoped lang="scss"></style>
