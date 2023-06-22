<template>
  <el-row class="pd_b_20 pd_t_20">
    <el-col :span="24">
      <ElForm ref="formRef" :model="form" label-width="300px" :rules="rules">
        <el-row>
          <el-col :span="16">
            <ElFormItem label="网站名称" prop="title">
              <ElInput v-model="form.title" placeholder="网站名称" />
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="首页背景图">
              <el-upload
                class="whole_width"
                v-model:file-list="fileList"
                drag
                :action="uploadUrl"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </ElFormItem>
          </el-col>
          <el-col :span="8" class="flex_center">
            <span class="danger_f">首页顶部显示的背景图</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="系统税率(%)">
              <ElInput v-model="form.tax" placeholder="系统税率" disabled onlyread />
            </ElFormItem>
          </el-col>
          <el-col :span="8" class="form_tip">
            <span>出金操作时，系统平台抽点</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="抓取用户余额周期">
              <ElSelect class="whole_width" v-model="form.queryGap">
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
          <el-col :span="16">
            <ElFormItem label="挖矿结算周期">
              <ElSelect class="whole_width" v-model="form.settlementGap">
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
          <el-col :span="16">
            <ElFormItem label="分享码格式" class="flex_start">
              <el-radio-group v-model="form.code">
                <el-radio :label="0" size="large">默认</el-radio>
                <el-radio :label="1" size="large">强化字母+数字</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="出金是否需要审核" class="flex_start">
              <el-radio-group v-model="form.output">
                <el-radio :label="true" size="large">是</el-radio>
                <el-radio :label="false" size="large">否</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="出金验证谷歌验证码" class="flex_start">
              <el-radio-group v-model="form.isGoogleCode">
                <el-radio :label="true" size="large">是</el-radio>
                <el-radio :label="false" size="large">否</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="挖矿产出类型" class="flex_start">
              <el-radio-group v-model="form.mineType">
                <el-radio :label="'USDT'" size="large">USDT</el-radio>
                <el-radio :label="'MAIN'" size="large">主币</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="邀请码链接" class="flex_start">
              <el-radio-group v-model="form.inviteCode">
                <el-radio :label="true" size="large">开启</el-radio>
                <el-radio :label="false" size="large">关闭</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="虚拟分挖矿" class="flex_start">
              <el-radio-group v-model="form.inviteCode">
                <el-radio :label="true" size="large">开启</el-radio>
                <el-radio :label="false" size="large">关闭</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="限制挖矿天数" class="flex_start">
              <el-radio-group v-model="form.limitDate">
                <el-radio :label="true" size="large">开启</el-radio>
                <el-radio :label="false" size="large">关闭</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
          <el-col :span="8" class="form_tip">
            <span
              >初次开启后,
              默认生成1条等级设置(或取用户设置的第一条挖矿等级设置)初次开启后,
              所有老用户绑定第1条等级设置</span
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <ElFormItem label="挖矿天数修改方式" class="flex_start">
              <el-radio-group v-model="form.limitDate">
                <el-radio :label="true" size="large">覆盖</el-radio>
                <el-radio :label="false" size="large">递增递减</el-radio>
              </el-radio-group>
            </ElFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <ElFormItem label="前台访问主域名" class="flex_start">
              <el-tag
                v-for="tag in form.domainNames"
                :key="tag"
                class="mg_r_10"
                closable
                :disable-transitions="false"
                @close="closeDomain(tag)"
              >
                {{ tag }}
              </el-tag>

              <el-input
                v-if="isAddDomain"
                ref="addDomainRef"
                v-model="domainName"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="confirmDomain"
                @blur="confirmDomain"
                style="width: 120px"
              />
              <el-button
                v-else
                class="button-new-tag ml-1"
                size="small"
                @click="addDomain"
              >
                + New Tag
              </el-button>
            </ElFormItem>
          </el-col>
          <el-col :span="8" class="form_tip">
            <span>请填写允许前台登录的根域名</span>
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
// 上传图片地址
const uploadUrl = ref("https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15");
const form = reactive({
  domainNames: [],
});
const fileList = ref([]);

const formRef = ref();
// 表单校验规则
const rules = reactive({
  title: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
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
