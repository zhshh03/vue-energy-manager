<template>
  <el-tabs
    v-model="currentName"
    class="demo-tabs"
    @tab-click="handleClick"
    type="card"
    closable
    @tab-remove="remove"
  >
    <el-tab-pane
      v-for="tab in tabsStore.tabs"
      :key="tab.name"
      :label="tab.name"
      :name="tab.name"
    >
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is="tab.icon" />
          </el-icon>
          <span>&nbsp;{{ tab.name }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-if="$route.meta.keepAlive"
      ></component>
    </keep-alive>
    <component
      :is="Component"
      :key="$route.name"
      v-if="!$route.meta.keepAlive"
    ></component>
  </router-view>
</template>

<script lang="ts" setup>
import { useTabsStore } from "@/store/tabs";
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const tabsStore = useTabsStore();
const currentName = computed(() => tabsStore.currentTab.name);

// 刷新时根据当前路由同步 tab 高亮
onMounted(() => {
  const matched = tabsStore.tabs.find((t) => t.url === route.path);
  if (matched) {
    tabsStore.setCurrentTab(matched.name, matched.url);
  }
});

const handleClick = ({ index }: { index: number }) => {
  router.push(tabsStore.tabs[index].url);
  tabsStore.setCurrentTab(
    tabsStore.tabs[index].name,
    tabsStore.tabs[index].url,
  );
};
const remove = (name: string) => {
  if (tabsStore.tabs.length <= 1) return;
  const idx = tabsStore.tabs.findIndex((t) => t.name === name);
  if (idx === -1) return;
  // 如果删除的是当前激活的 tab，自动跳到上一个
  if (tabsStore.currentTab.name === name) {
    const prevIdx =
      idx > 0 ? idx - 1 : idx + 1 < tabsStore.tabs.length ? idx + 1 : -1;
    if (prevIdx !== -1) {
      const prev = tabsStore.tabs[prevIdx];
      tabsStore.setCurrentTab(prev.name, prev.url);
      router.push(prev.url);
    }
  }
  tabsStore.tabs.splice(idx, 1);
};
</script>

<style lang="less" scoped>
.demo-tabs {
  margin-bottom: 12px;

  :deep(.el-tabs__header) {
    margin-bottom: 12px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    background-color: rgba(96, 165, 250, 0.25);
  }

  :deep(.el-tabs__item) {
    color: #b8cae7;
    border: 1px solid rgba(96, 165, 250, 0.2) !important;
    background: rgba(14, 24, 42, 0.55);
    transition: all 0.25s;
  }

  :deep(.el-tabs__item:hover) {
    color: #e7eefb;
  }

  :deep(.el-tabs__item.is-active) {
    background: linear-gradient(90deg, rgba(74, 144, 226, 0.9), rgba(74, 144, 226, 0.55));
    color: #fff;
    border-color: transparent !important;
  }

  :deep(.el-tabs__new-tab),
  :deep(.el-tabs__item .is-icon-close) {
    color: #c6d7f4;
  }
}
</style>

