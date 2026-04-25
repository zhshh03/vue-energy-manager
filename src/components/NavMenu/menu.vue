<template>
  <el-menu>
        <menu-item v-for="item in menuItemList" :key="item.name" :item="item"></menu-item>
  </el-menu>
</template>
<script setup>
import { useUserStore } from '@/store/auth';
import MenuItem from '@/components/NavMenu/menuItem.vue';

const userStore = useUserStore()
const menuItemList = userStore.menu

</script>