<template>
  <div class="logo">
   <img :src="logo" width="34px" height="34px"><img>
    <h1>动力港</h1>
  </div>
  <el-menu :router="true" default-active="$route.path">
        <menu-item v-for="item in menuItemList" :key="item.url" :item="item"></menu-item>
  </el-menu>
</template>
<script setup>
import { useUserStore } from '@/store/auth';
import MenuItem from '@/components/NavMenu/menuItem.vue';
import logo from '@/assets/images/logo.png'

const userStore = useUserStore()
const menuItemList = userStore.menu
</script>

<style lang="less" scoped>
.logo{
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 0;
  img{
    margin-left: 20px;
  }
   h1{
    margin-left: 5px;
    font-size: 22px;
    font-weight: 600;
    color: #333;
   }
}
.el-menu{
  border-right: none;
}

</style>