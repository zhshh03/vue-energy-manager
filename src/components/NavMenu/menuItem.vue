<template>

  <el-sub-menu v-if="item.children" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{item.name}}</span>
    </template>
    <my-menu v-for="child in item.children" :key="child.name" :item="child"></my-menu>
  </el-sub-menu>
  
  <el-menu-item v-else :index="item.url" v-show="!(item.name === '订单详情')">
    <el-icon>
    <component :is="item.icon"></component>
    </el-icon>
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

<style lang="less" scoped>
.el-menu-item.is-active{
  background-color: rgb(34, 136, 255) !important;
  color: #fff !important;
  div{
    span{
      color: #fff;
    }
  }
}
.el-menu-item:not(.is-active):hover{
  background-color: transparent !important;
  color: rgb(34, 136, 255) !important;
}
::v-deep .el-sub-menu:not(.is-active) .el-sub-menu__title:hover{
  background-color: transparent !important;
  color: rgb(34, 136, 255) !important;
}
</style>