<template>
  <el-card>
    <el-radio-group v-model="radio" size="large">
      <el-radio-button label="严重警告" :value="1"></el-radio-button>
      <el-radio-button label="紧急警告" :value="2"></el-radio-button>
      <el-radio-button label="重要警告" :value="3"></el-radio-button>
      <el-radio-button label="一般警告" :value="4"></el-radio-button>
    </el-radio-group>
  </el-card>
  <el-card class="mt" v-for="item in visibleAlarmList" :key="item.equNo">
    <el-alert
      :title="`${item.address}充电桩充电异常`"
      type="warning"
      show-icon
    ></el-alert>
    <el-descriptions :column="4" border direction="vertical" class="mt">
      <el-descriptions-item
        v-for="(val, key) in item"
        :label="getLabel(String(key))"
        :key="String(key)"
      >
        <el-tag
          v-if="key === 'level'"
          :type="getLevelTagType(val as AlarmItem['level'])"
          >{{ getLevelText(val as AlarmItem["level"]) }}</el-tag
        >
        <el-text type="danger" v-else-if="key === 'status'">{{
          getStatusText(val as AlarmItem["status"])
        }}</el-text>
        <span v-else>{{ val }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button :type="item.status == 2 ? 'warning' : 'primary'">
          {{ item.status == 1 ? "指派" : item.status == 2 ? "催办" : "查看" }}
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>

  <div ref="loadMoreTrigger" class="load-more-trigger" v-if="hasMore"></div>
  <div class="loading-status" v-if="hasMore">
    <el-icon v-if="loadingMore" class="is-loading"><Loading /></el-icon>
    <span>{{ loadingMore ? "正在加载更多告警..." : "继续下滑加载更多" }}</span>
  </div>
  <div class="loading-status done" v-else>
    <span>已加载全部告警</span>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import { getAlarmListApi } from "@/api/alarm";
import { getLabel } from "@/views/Alarm/fileLabelMap";

type AlarmLevel = 1 | 2 | 3;
type AlarmStatus = 1 | 2 | 3;

interface AlarmItem {
  description: string;
  address: string;
  equNo: string;
  level: AlarmLevel;
  time: string;
  code: number;
  status: AlarmStatus;
}

const radio = ref<1 | 2 | 3 | 4>(1);
const alarmList = ref<AlarmItem[]>([]);

const PAGE_SIZE = 5;
const visibleCount = ref(PAGE_SIZE);
const loadingMore = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const visibleAlarmList = computed(() => {
  return alarmList.value.slice(0, visibleCount.value);
});

const hasMore = computed(() => {
  return visibleCount.value < alarmList.value.length;
});

const getLevelTagType = (level: AlarmLevel): "danger" | "warning" | "info" => {
  return level === 1 ? "danger" : level === 2 ? "warning" : "info";
};

const getLevelText = (level: AlarmLevel): string => {
  return level === 1 ? "严重" : level === 2 ? "紧急" : "一般";
};

const getStatusText = (status: AlarmStatus): string => {
  return status === 1 ? "待指派" : status === 2 ? "处理中" : "处理异常";
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadMore = async () => {
  if (!hasMore.value || loadingMore.value) return;
  loadingMore.value = true;

  // 给用户明确的“正在加载”反馈（真实分页接口时可移除该延迟）
  await sleep(550);
  await nextTick();

  visibleCount.value = Math.min(
    visibleCount.value + PAGE_SIZE,
    alarmList.value.length,
  );

  loadingMore.value = false;
};

const initObserver = () => {
  if (!loadMoreTrigger.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        void loadMore();
      }
    },
    {
      root: null,
      rootMargin: "120px",
      threshold: 0,
    },
  );

  observer.observe(loadMoreTrigger.value);
};

onMounted(async () => {
  const { data } = await getAlarmListApi();
  alarmList.value = data as AlarmItem[];
  visibleCount.value = PAGE_SIZE;

  await nextTick();
  initObserver();
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
.load-more-trigger {
  height: 1px;
}

.loading-status {
  margin-top: 12px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.loading-status.done {
  color: var(--el-text-color-placeholder);
}
</style>
