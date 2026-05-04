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
        <el-button
          @click="drawer = true"
          :type="item.status == 2 ? 'warning' : 'primary'"
        >
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

  <el-drawer v-model="drawer" title="报警任务指派">
    <div v-loading="loading" style="min-height: 200px">
      <stepForm
        :steps="steps"
        :form1="form1"
        :form2="form2"
        :form3="form3"
        @submit="handleSumbit"
      >
        <template #step-1>
          <el-form :model="formData.basicInfo" :rules="basicRules" ref="form1">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="formData.basicInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="formData.basicInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="phone">
              <el-input v-model="formData.basicInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="工号：" prop="jobNo">
              <el-input v-model="formData.basicInfo.jobNo"></el-input>
            </el-form-item>
            <el-form-item label="是否紧急：">
              <el-switch v-model="formData.basicInfo.urgent"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="formData.basicInfo.other">
                <el-checkbox value="1" label="更换设备"></el-checkbox>
                <el-checkbox value="2" label="仅维修"></el-checkbox>
                <el-checkbox value="3" label="需要拍照"></el-checkbox>
                <el-checkbox value="4" label="需要报备"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注信息：">
              <el-input
                type="textarea"
                placeholder="请输入备注信息"
                v-model="formData.basicInfo.remarks"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #step-2>
          <el-form
            :model="formData.approvalInfo"
            ref="form2"
            :rules="approvalRules"
          >
            <el-form-item label="审批部门" prop="approvalRemarks">
              <el-select
                placeholder="请选择审批部门"
                v-model="formData.approvalInfo.approvalRemarks"
              >
                <el-option label="总裁办" value="1"></el-option>
                <el-option label="运营部" value="2"></el-option>
                <el-option label="维修部" value="3"></el-option>
                <el-option label="市场部" value="4"></el-option>
                <el-option label="财务部" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄送部门" prop="approvalResult">
              <el-select
                placeholder="请选择抄送部门"
                v-model="formData.approvalInfo.approvalResult"
              >
                <el-option label="总裁办" value="1"></el-option>
                <el-option label="运营部" value="2"></el-option>
                <el-option label="维修部" value="3"></el-option>
                <el-option label="市场部" value="4"></el-option>
                <el-option label="财务部" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <template #step-3>
          <el-form
            :model="formData.assigneeInfo"
            ref="form3"
            :rules="assigneeRules"
          >
            <el-form-item label="负责人姓名：" prop="assignee">
              <el-input v-model="formData.assigneeInfo.assignee"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话：" prop="assigneePhone">
              <el-input
                v-model="formData.assigneeInfo.assigneePhone"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
      </stepForm>
      <el-result
        icon="warning"
        title="设备编号CD1001"
        sub-title="该任务已催办一次，正在等待维修部门处理"
      >
        <template #extra>
          <el-button type="primary" @click="drawer = false">我已知晓</el-button>
        </template>
      </el-result>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import { getAlarmListApi } from "@/api/alarm";
import { getLabel } from "@/views/Alarm/fileLabelMap";
import stepForm from "@/components/stepForm/stepForm.vue";
import { ElMessage, type FormInstance } from "element-plus";

interface AlarmItem {
  description: string;
  address: string;
  equNo: string;
  level: number;
  time: string;
  code: number;
  status: number;
}

const radio = ref<number>(1);
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

const getLevelTagType = (level: number): "danger" | "warning" | "info" => {
  return level === 1 ? "danger" : level === 2 ? "warning" : "info";
};

const getLevelText = (level: number): string => {
  return level === 1 ? "严重" : level === 2 ? "紧急" : "一般";
};

const getStatusText = (status: number): string => {
  return status === 1 ? "待指派" : status === 2 ? "处理中" : "处理异常";
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadMore = async () => {
  if (!hasMore.value || loadingMore.value) return;
  loadingMore.value = true;
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

const drawer = ref<boolean>(false);
const form1 = ref<FormInstance>();
const form2 = ref<FormInstance>();
const form3 = ref<FormInstance>();
const loading = ref<boolean>(false);
const steps = [
  { title: "基本信息" },
  { title: "审批信息" },
  { title: "负责人信息" },
];
const formData = ref({
  basicInfo: {
    name: "",
    email: "",
    phone: "",
    jobNo: "",
    urgent: true,
    other: [],
    remarks: "",
  },
  approvalInfo: {
    approvalResult: "",
    approvalRemarks: "",
  },
  assigneeInfo: {
    assignee: "",
    assigneePhone: "",
  },
});

const basicRules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入电话", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
  jobNo: [{ required: true, message: "请输入工号", trigger: "blur" }],
};
const approvalRules = {
  approvalRemarks: [
    { required: true, message: "请选择审批部门", trigger: "change" },
  ],
  approvalResult: [
    { required: true, message: "请选择抄送部门", trigger: "change" },
  ],
};
const assigneeRules = {
  assignee: [{ required: true, message: "请输入指派人", trigger: "blur" }],
  assigneePhone: [
    { required: true, message: "请输入指派人电话", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
};

const handleSumbit = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    drawer.value = false;
    ElMessage.success("指派成功");
  }, 1000);
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
