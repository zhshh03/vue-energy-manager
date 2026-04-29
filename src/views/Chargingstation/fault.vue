<template>
  <el-card>
    <div class="mb">
      <el-select
        v-model="value"
        filterable
        style="width: 300px"
        placeholder="选择站点名称"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </div>
    <div style="margin-bottom: 30px">
      <el-radio-group size="large" v-model="radio" @change="handleChange">
        <el-radio-button :label="`全部(${checkSum})`" :value="0" />
        <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1" />
        <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2" />
        <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3" />
        <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4" />
        <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5" />
        <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6" />
      </el-radio-group>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in dataListCopy" :key="item.id">
        <div class="station-card">
          <div class="item">
            <div class="pic" :class="'status-' + item.status">
              <p v-if="item.status === 1">空闲中</p>
              <p v-if="item.status === 2">充电中</p>
              <p v-if="item.status === 3">连接中</p>
              <p v-if="item.status === 4">排队中</p>
              <p v-if="item.status === 5">已预约</p>
              <p v-if="item.status === 6">故障/离线</p>
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
                <el-button size="small">维保记录</el-button>
                <el-button size="small" type="primary">使用记录</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentListApi } from "@/api/chargingstation";
import { computed } from "@vue/reactivity";
import { ref, onMounted, watch } from "vue";

const options = ref<any>([]);
const value = ref<string>("");
const dataList = ref<any>([]);
const dataListCopy = ref<any>([]);
const loadData = async () => {
  const { data } = await getCurrentListApi();
  options.value = data;
  dataList.value = data[0].list;
  dataListCopy.value = data[0].list;
};

const checkCount = (num: number) => {
  return dataList.value.filter((item: any) => item.status === num).length;
};

const radio = ref<number>(0);

const handleChange = () => {
  dataListCopy.value = dataList.value;
  if (radio.value !== 0) {
    dataListCopy.value = dataListCopy.value.filter(
      (item: any) => item.status === radio.value,
    );
  }
};

const checkSum = computed(
  () =>
    checkCount(1) +
    checkCount(2) +
    checkCount(3) +
    checkCount(4) +
    checkCount(5) +
    checkCount(6),
);

watch(value, () => {
  const res = options.value.filter((item: any) => item.name === value.value);
  dataListCopy.value = res[0]?.list || [];
  dataList.value = res[0]?.list || [];
  radio.value = 0;
});

onMounted(() => {
  loadData();
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
</style>
