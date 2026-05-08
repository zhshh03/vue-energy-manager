<template>
  <el-sub-menu v-if="item.children" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <my-menu
      v-for="child in item.children"
      :key="child.name"
      :item="child"
    ></my-menu>
  </el-sub-menu>

  <el-menu-item
    v-else
    :index="item.url"
    v-show="!(item.name === '订单详情')"
    @click="add(item.name, item.url, item.icon)"
  >
    <el-icon>
      <component :is="item.icon"></component>
    </el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { MenuItem as MenuItemType } from "@/types/user/index";
import type { PropType } from "vue";
import { useTabsStore } from "@/store/tabs";

export default defineComponent({
  name: "MyMenu",
  props: {
    item: {
      type: Object as PropType<MenuItemType>,
      required: true,
    },
  },
  setup() {
    const tabsStore = useTabsStore();
    const add = (name: string, url: string, icon: string) => {
      tabsStore.addTab(name, url, icon);
      tabsStore.setCurrentTab(name, url);
    };
    return {
      add,
    };
  },
});
</script>

<style lang="less" scoped>
.el-menu-item.is-active {
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.92), rgba(74, 144, 226, 0.58)) !important;
  color: #fff !important;
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.35);

  div {
    span {
      color: #fff;
    }
  }
}

:deep(.el-sub-menu .el-menu-item) {
  background: rgba(8, 17, 32, 0.28);
}
</style>


