<template>
  <el-card>
    <div class="mb">
      <el-select
        v-model="value"
        filterable
        clearable
        style="width: 300px"
        placeholder="选择站点名称"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </div>
    <div style="margin-bottom: 30px">
      <el-radio-group size="large" v-model="radio">
        <el-radio-button
          v-for="s in statusConfig"
          :key="s.value"
          :label="
            isManualMode ? `${s.label}(${statusCounts[s.value]})` : s.label
          "
          :value="s.value"
        />
      </el-radio-group>
    </div>
    <el-row :gutter="20" v-loading="loading">
      <el-col
        :span="6"
        v-for="item in displayList"
        :key="item.stationName + '-' + item.id"
      >
        <div class="station-card">
          <div class="station-tag" v-if="!isManualMode">
            {{ item.stationName }}
          </div>
          <div class="item">
            <div class="pic" :class="'status-' + item.status">
              <p>{{ statusMap[item.status] }}</p>
              <i class="iconfont icon-chongdianzhuang"></i>
              <p v-if="item.status === 2">{{ item.percent }}</p>
            </div>
            <div class="info">
              <h3>{{ item.id }}</h3>
              <p>电压：{{ item.votage }}</p>
              <p>电流：{{ item.current }}</p>
              <p>功率：{{ item.power }}</p>
              <p>温度：{{ item.tem }}</p>
            </div>
          </div>
          <div class="btn">
            <div class="divder"></div>
            <div class="btn-footer">
              <span class="warn-text">暂无预警</span>
              <div>
                <el-popover placement="left" :width="100" trigger="hover">
                  <template #reference>
                    <el-button size="small">维保记录</el-button>
                  </template>
                  <div class="usage-timeline">
                    <h3>暂无维保记录</h3>
                  </div>
                </el-popover>
                <el-popover placement="right" :width="250" trigger="hover">
                  <template #reference>
                    <el-button size="small" type="primary">使用记录</el-button>
                  </template>
                  <div class="usage-timeline" v-if="item.recode.length > 0">
                    <h3 class="usage-title">使用记录</h3>
                    <el-timeline>
                      <el-timeline-item
                        v-for="record in item.recode"
                        :timestamp="record.time"
                        placement="top"
                      >
                        {{ record.msg }}
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                  <div class="usage-timeline" v-else>
                    <h3>暂无使用记录</h3>
                  </div>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 无限滚动：底部哨兵元素 -->
    <div ref="sentinel" class="scroll-sentinel">
      <div v-if="isLoadingMore" class="loading-tip">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>加载中...</span>
      </div>
      <div v-else-if="hasMoreRender" class="loading-tip">
        <span>向下滚动加载更多...</span>
      </div>
      <div
        v-else-if="isAllLoaded && !isManualMode && options.length > 1"
        class="loading-tip"
      >
        <span>— 到底啦 —</span>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <transition name="fade-up">
      <div v-if="showBackTop" class="back-top" @click="scrollToTop">
        <el-icon :size="20"><Top /></el-icon>
      </div>
    </transition>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentListApi } from "@/api/chargingstation";
import {
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";

// ==================== 常量配置 ====================
const PAGE_SIZE = 16; // 每批渲染的卡片数

const statusMap: Record<number, string> = {
  1: "空闲中",
  2: "充电中",
  3: "连接中",
  4: "排队中",
  5: "已预约",
  6: "故障/离线",
};

const statusConfig = [
  { label: "全部", value: 0 },
  { label: "空闲中", value: 1 },
  { label: "充电中", value: 2 },
  { label: "连接中", value: 3 },
  { label: "排队中", value: 4 },
  { label: "已预约", value: 5 },
  { label: "故障/离线", value: 6 },
];

// ==================== 基础状态 ====================
const loading = ref(false);
const options = ref<any[]>([]);
const value = ref("");
const radio = ref(0);

// ==================== 无限滚动状态 ====================
const dataList = ref<any[]>([]);
const loadedStationIndex = ref(0);
const isLoadingMore = ref(false);
const isAllLoaded = ref(false);
const isManualMode = ref(false);
const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

// ==================== 渲染分页 ====================
const renderLimit = ref(PAGE_SIZE);

// 根据 radio 筛选后的完整列表
const filteredList = computed(() => {
  if (radio.value === 0) return dataList.value;
  return dataList.value.filter((item) => item.status === radio.value);
});

// 实际渲染的列表（限制数量，提升性能）
const displayList = computed(() =>
  filteredList.value.slice(0, renderLimit.value),
);

// 是否还有更多卡片可渲染
const hasMoreRender = computed(
  () => renderLimit.value < filteredList.value.length,
);

// 一次遍历计算所有状态计数，O(n) 替代原来 6 次 filter 的 O(6n)
const statusCounts = computed(() => {
  const counts: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  for (const item of dataList.value) {
    counts[item.status]++;
  }
  counts[0] = dataList.value.length;
  return counts;
});

// ==================== 工具函数 ====================
const tagStationList = (list: any[], stationName: string) =>
  list.map((item) => ({ ...item, stationName }));

// ==================== IntersectionObserver ====================
const setupObserver = () => {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) onReachBottom();
    },
    { threshold: 0.1, rootMargin: "100px" },
  );
  if (sentinel.value) observer.observe(sentinel.value);
};

const disconnectObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
};

// 触底时：优先渲染更多卡片，卡片全部渲染完后再加载下一个充电站
const onReachBottom = () => {
  if (hasMoreRender.value) {
    renderLimit.value += PAGE_SIZE;
    return;
  }
  loadNextStation();
};

// ==================== 数据加载 ====================
const loadData = async () => {
  loading.value = true;
  const { data } = await getCurrentListApi();
  options.value = data;
  // 首次只加载第一个充电站
  isAllLoaded.value = data.length <= 1;
  dataList.value = tagStationList(data[0].list, data[0].name);
  loadedStationIndex.value = 1;
  loading.value = false;
  await nextTick();
  setupObserver();
};

const loadNextStation = () => {
  if (isManualMode.value || isLoadingMore.value || isAllLoaded.value) return;
  if (loadedStationIndex.value >= options.value.length) {
    isAllLoaded.value = true;
    return;
  }
  isLoadingMore.value = true;
  setTimeout(() => {
    const station = options.value[loadedStationIndex.value];
    dataList.value = [
      ...dataList.value,
      ...tagStationList(station.list, station.name),
    ];
    loadedStationIndex.value++;
    if (loadedStationIndex.value >= options.value.length) {
      isAllLoaded.value = true;
    }
    isLoadingMore.value = false;
  }, 500);
};

// ==================== 模式切换 ====================
const resetAutoScroll = () => {
  isManualMode.value = false;
  radio.value = 0;
  renderLimit.value = PAGE_SIZE;
  loadedStationIndex.value = 1;
  isAllLoaded.value = options.value.length <= 1;
  dataList.value =
    options.value.length > 0
      ? tagStationList(options.value[0].list, options.value[0].name)
      : [];
  nextTick(() => setupObserver());
};

watch(value, (newVal) => {
  if (newVal) {
    isManualMode.value = true;
    const station = options.value.find((item) => item.name === newVal);
    dataList.value = tagStationList(station?.list || [], station?.name || "");
    radio.value = 0;
    renderLimit.value = PAGE_SIZE;
  } else {
    resetAutoScroll();
  }
});

// 切换筛选时重置渲染数量
watch(radio, () => {
  renderLimit.value = PAGE_SIZE;
});

// ==================== 回到顶部 ====================
const showBackTop = ref(false);
let scrollContainer: HTMLElement | null = null;

const handlePageScroll = () => {
  if (scrollContainer) {
    showBackTop.value = scrollContainer.scrollTop > 300;
  }
};

const scrollToTop = () => {
  scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
};

// ==================== 生命周期 ====================
onMounted(() => {
  loadData();
  // 滚动容器是 DefaultLayout 中的 .el-main，而非 window
  scrollContainer = document.querySelector(".el-main");
  scrollContainer?.addEventListener("scroll", handlePageScroll, {
    passive: true,
  });
});
onBeforeUnmount(() => {
  disconnectObserver();
  scrollContainer?.removeEventListener("scroll", handlePageScroll);
  scrollContainer = null;
});
</script>

<style scoped lang="less">
.el-col {
  margin-bottom: 20px;
}

.station-card {
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s;
  background: #fff;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .item {
    display: flex;

    .pic {
      width: 130px;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 10px;

      p:first-child {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .iconfont {
        font-size: 44px;
        margin-bottom: 8px;
      }

      p:last-child {
        font-size: 20px;
        font-weight: bold;
      }
    }

    // 空闲中 - 绿色
    .status-1 {
      background: linear-gradient(135deg, #f0f9eb 0%, #e1f3d8 100%);

      p:first-child,
      .iconfont,
      p:last-child {
        color: #67c23a;
      }
    }

    // 充电中 - 蓝色
    .status-2 {
      background: linear-gradient(135deg, #ecf5ff 0%, #d9ecff 100%);

      p:first-child,
      .iconfont {
        color: #409eff;
      }
    }

    // 连接中 - 橙色
    .status-3 {
      background: linear-gradient(135deg, #fdf6ec 0%, #faecd8 100%);

      p:first-child,
      .iconfont {
        color: #e6a23c;
      }
    }

    // 排队中 - 紫色
    .status-4 {
      background: linear-gradient(135deg, #f3e8ff 0%, #e6d5f8 100%);

      p:first-child,
      .iconfont {
        color: #9b59b6;
      }
    }

    // 已预约 - 青色
    .status-5 {
      background: linear-gradient(135deg, #e8f8f5 0%, #d1f2eb 100%);

      p:first-child,
      .iconfont {
        color: #1abc9c;
      }
    }

    // 故障/离线 - 红色
    .status-6 {
      background: linear-gradient(135deg, #fef0f0 0%, #fde2e2 100%);

      p:first-child,
      .iconfont {
        color: #f56c6c;
      }
    }

    .info {
      flex: 1;
      padding: 14px 18px;

      h3 {
        font-size: 15px;
        color: #303133;
        font-weight: 600;
        margin: 0 0 10px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #ebeef5;
      }

      p {
        font-size: 13px;
        color: #606266;
        line-height: 2;
        margin: 0;
      }
    }
  }

  .btn {
    padding: 0 18px 12px;

    .divder {
      border-top: 1px solid #ebeef5;
      margin-bottom: 8px;
    }

    .btn-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .warn-text {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.usage-timeline {
  padding: 4px 0;

  .usage-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  :deep(.el-timeline) {
    padding-left: 0;
  }

  :deep(.el-timeline-item__wrapper) {
    padding-left: 20px;
  }

  :deep(.el-timeline-item__timestamp) {
    font-size: 12px;
    color: #909399;
    line-height: 1;
  }

  :deep(.el-timeline-item__content) {
    font-size: 14px;
    color: #606266;
    margin-top: 4px;
  }

  :deep(.el-timeline-item__tail) {
    border-left: 2px solid #e4e7ed;
  }

  :deep(.el-timeline-item__node) {
    background: #409eff;
  }
}

.station-tag {
  font-size: 11px;
  color: #909399;
  padding: 4px 10px 0;
  text-align: right;
}

.scroll-sentinel {
  padding: 16px 0;
  min-height: 40px;
}

.loading-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #909399;
  font-size: 13px;
  padding: 8px 0;
}

.back-top {
  position: fixed;
  right: 40px;
  bottom: 60px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  transition:
    background 0.25s,
    transform 0.25s;
  z-index: 999;

  &:hover {
    background: #66b1ff;
    transform: translateY(-3px);
  }
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
