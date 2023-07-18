<template>
  <div class="index-container">
    <el-tabs v-model="activeName" type="border-card" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="TRC" name="first"/>
      <el-tab-pane label="ETH" name="second"/>
      <el-tab-pane label="BSC" name="third"/>
      <el-row gutter="20">
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="授权成功余额"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="当天授权成功总余额"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="user-follow-line"
            title="已授权总人数"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="user-add-line"
            title="当天新增授权人数"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="当日总变动金额"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="当日总出款金额"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="user-shared-line"
            title="当日总出款人数"
            :value="0"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="当日总归集金额"
            :value="0"
          />
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="平台总归集金额"
            :value="0"
          />
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :xl="4" :xs="24">
          <top-card
            icon="money-cny-circle-line"
            title="平台总出金金额"
            :value="0"
          />
        </el-col>
      </el-row>
    </el-tabs>
    <el-tabs v-model="activeName" type="border-card" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="TRC" name="first"/>
      <el-tab-pane label="ETH" name="second"/>
      <el-tab-pane label="BSC" name="third"/>
      <h4 class="title">重点关注余额排行</h4>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="钱包地址" />
        <el-table-column prop="name" label="当前余额USDT" />
        <el-table-column prop="address" label="操作" />
      </el-table>
      <h4 class="title">当前余额排行</h4>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="钱包地址" />
        <el-table-column prop="name" label="当前余额USDT" />
        <el-table-column prop="address" label="操作" />
      </el-table>
    </el-tabs>
   <!-- <el-row :gutter="20">
      <page-header />
    </el-row>-->
  </div>
</template>

<script setup>
  import PageHeader from './components/PageHeader'
  import TopCard from "@/views/index/components/TopCard.vue";
</script>

<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    background: $base-color-background !important;

    :deep() {
      .page-header {
        margin-bottom: 20px;
      }

      .access,
      .authorization,
      .version-information {
        min-height: 268px;
        margin-bottom: 20px;
      }

      .el-card {
        .el-card__header {
          position: relative;

          .card-header-tag {
            position: absolute;
            top: 15px;
            right: $base-margin;
          }

          > div > span {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }

        .el-card__body {
          position: relative;

          .echarts {
            width: 100%;
            height: 127px;
          }

          .card-footer-tag {
            position: absolute;
            right: $base-margin;
            bottom: 15px;
          }
        }
      }

      .bottom {
        padding-top: 20px;
        margin-top: 5px;
        color: #595959;
        text-align: left;
        border-top: 1px solid $base-border-color;
      }
    }
    .tabs{
      margin-bottom: 16px;
    }
    .title{
      position: relative;
      padding-left: 10px;
      &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 2px;
        width: 3px;
        height: calc(100% - 4px);
        background-color: var(--el-color-primary);
        border-radius: 3px;
      }
    }
  }
</style>
