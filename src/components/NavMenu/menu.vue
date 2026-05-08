<template>
  <div class="logo">
    <img :src="logo" width="34px" height="34px" /><img />
    <h1>能电管理</h1>
  </div>
  <el-menu class="side-menu" :router="true" :default-active="route.path">
    <menu-item
      v-for="item in menuItemList"
      :key="item.url"
      :item="item"
    ></menu-item>
  </el-menu>
</template>

<script setup>
import { useUserStore } from "@/store/auth";
import { useRoute } from "vue-router";
import MenuItem from "@/components/NavMenu/menuItem.vue";
import logo from "@/assets/images/logo-tech.svg";

const userStore = useUserStore();
const route = useRoute();
const menuItemList = userStore.menu;
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(96, 165, 250, 0.2);
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.16), transparent);

  img {
    margin-left: 4px;
    border-radius: 8px;
    box-shadow: 0 6px 16px rgba(74, 144, 226, 0.35);
  }

  h1 {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
    color: #e7eefb;
    letter-spacing: 1px;
  }
}

.el-menu {
  border-right: none;
  background: transparent;
}

.side-menu {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: #c2d4f2;
  --el-menu-hover-bg-color: rgba(74, 144, 226, 0.16);
  --el-menu-active-color: #ffffff;
}

:deep(.side-menu .el-menu--inline) {
  background: rgba(8, 17, 32, 0.35) !important;
  border-radius: 10px;
  margin: 0 10px 6px;
}

:deep(.side-menu .el-sub-menu.is-opened > .el-sub-menu__title) {
  color: #e7eefb !important;
}

:deep(.side-menu .el-menu-item),
:deep(.side-menu .el-sub-menu__title) {
  color: #c2d4f2;
  border-radius: 10px;
  margin: 6px 10px;
}

:deep(.side-menu .el-menu-item:hover),
:deep(.side-menu .el-sub-menu__title:hover) {
  background: rgba(74, 144, 226, 0.16) !important;
  color: #e7eefb !important;
}
</style>