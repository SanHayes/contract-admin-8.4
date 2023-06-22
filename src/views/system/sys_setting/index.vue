<template>
  <div class="page">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane :label="item.label" :name="item.name" v-for="(item, idx) in tabs" :key="idx">
        <component :is="item.comp" v-if="activeName === item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, markRaw } from "vue";
import basic from './components/basic.vue'
import funds from './components/funds.vue'
import withdraw from './components/withdraw.vue'
import authority from './components/authority.vue'

const tabs = ref([
  {label: '基本设置', name: 'basic', comp: markRaw(basic)},
  {label: '资金设置', name: 'funds', comp: markRaw(funds)},
  {label: '用户提现设置', name: 'withdraw', comp: markRaw(withdraw)},
  {label: '其他平台授权检测', name: 'authority', comp: markRaw(authority)},
  {label: '前台问答设置', name: 'question', comp: markRaw(basic)},
  {label: '前台矿池数据', name: 'poolData', comp: markRaw(basic)},
  {label: '邮箱设置', name: 'email', comp: markRaw(basic)},
  {label: '安全设置', name: 'safety', comp: markRaw(basic)},
  {label: '客户设置', name: 'users', comp: markRaw(basic)},
])
const activeName = ref('basic')
</script>

<style>
.page {
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
