<template>
  <el-tabs v-model="currentName" class="demo-tabs" @tab-click="handleClick" type="card" closable 
    @tab-remove="remove">
        <el-tab-pane v-for="tab in tabsStore.tabs" :key="tab.name" :label="tab.name" :name="tab.name">
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
    <router-view></router-view>
</template>


<script lang="ts" setup>
import { useTabsStore } from '@/store/tabs';
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const currentName = computed(() => tabsStore.currentTab.name)

// 刷新时根据当前路由同步 tab 高亮
onMounted(() => {
  const matched = tabsStore.tabs.find(t => t.url === route.path)
  if (matched) {
    tabsStore.setCurrentTab(matched.name, matched.url)
  }
})

const handleClick = ({index}:{index:number}) => {
  router.push(tabsStore.tabs[index].url)
  tabsStore.setCurrentTab(tabsStore.tabs[index].name,tabsStore.tabs[index].url)
}
const remove = (name: string) => {
  if (tabsStore.tabs.length <= 1) return
  const idx = tabsStore.tabs.findIndex(t => t.name === name)
  if (idx === -1) return
  // 如果删除的是当前激活的 tab，自动跳到上一个
  if (tabsStore.currentTab.name === name) {
    const prevIdx = idx > 0 ? idx - 1 : idx + 1 < tabsStore.tabs.length ? idx + 1 : -1
    if (prevIdx !== -1) {
      const prev = tabsStore.tabs[prevIdx]
      tabsStore.setCurrentTab(prev.name, prev.url)
      router.push(prev.url)
    }
  }
  tabsStore.tabs.splice(idx, 1)
}
</script>

<style lang="less" scoped>
.demo-tabs{
  ::v-deep .is-active{
    background-color:rgb(21, 126, 255);
    color: #fff;
  }
}

</style>