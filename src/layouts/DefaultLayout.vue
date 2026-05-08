<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container>
        <el-header>
          <TopHeader />
        </el-header>
        <el-main>
          <tabs-layout></tabs-layout>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from "@/components/NavMenu/menu.vue";
import TopHeader from "@/components/TopHeader/topHeader.vue";
import TabsLayout from "./TabsLayout.vue";
</script>

<style lang="less" scoped>
.common-layout {
  height: 100vh;
  background: transparent;
}

.el-container {
  height: 100%;
  background: transparent;
}

.el-aside {
  height: 100%;
  margin: 14px 0 14px 14px;
  border-radius: 14px;
  overflow: hidden;
  background: #0f1d31;
  border: 1px solid rgba(96, 165, 250, 0.24);
  box-shadow: 0 16px 36px rgba(2, 8, 20, 0.42);
}

.el-header {
  padding: 14px 14px 0 !important;
  height: 74px;
  background: transparent;
}

.el-main {
  overflow: auto;
  margin: 0 14px 14px;
  padding: 12px;
  border-radius: 14px;
  background: #1a304f;
  border: 1px solid rgba(125, 194, 255, 0.28);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
</style>

