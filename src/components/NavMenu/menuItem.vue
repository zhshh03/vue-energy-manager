<template>

  <el-sub-menu v-if="item.children" :index="item.url">
    <template #title>
      <el-icon></el-icon>
      <span>{{item.name}}</span>
    </template>
    <my-menu v-for="child in item.children" :key="child.name" :item="child"></my-menu>
  </el-sub-menu>
  
  <el-menu-item v-else :index="item.url">
    <el-icon></el-icon>
    <span>{{item.name}}</span>
  </el-menu-item>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { MenuItem as MenuItemType } from '@/types/user/index';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'MyMenu',
  props: {
    item: {
      type: Object as PropType<MenuItemType>,
      required: true,
    },
  },
});

</script>