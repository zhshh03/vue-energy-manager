<template>
  <el-row :gutter="20">
    <el-col :span=18>
      <!-- 今日设备运行状态 -->
      <el-card class="status-card">
        <div class="card-header">
          <h3>今日设备运行状态</h3>
          <div class="header-right">
            <p>更新时间：2024年8月31日</p>
            <el-icon color="#86909c" class="refresh-icon"><Refresh /></el-icon>
          </div>
        </div>
        <div class="equipment-list">
          <div class="equipment-item" v-for="(item, index) in equipmentData" :key="index">
            <div class="item-top">
              <h4>{{ item.title }}</h4>
              <div class="icon-box" :style="{ background: item.bgColor }">
                <img :src="item.icon" alt="" />
              </div>
            </div>
            <div class="item-value">
              <span class="num">{{ item.current }}</span>
              <span class="split">/</span>
              <span class="total">{{ item.total }}</span>
            </div>
            <div class="item-bottom">
              <div class="abnormal">
                异常设备<el-icon><InfoFilled /></el-icon>{{ item.abnormal }}
              </div>
              <div class="compare">
                相较昨日 {{ item.compare }}%
                <el-icon color="#ff4d4f"><CaretTop /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 常用功能 -->
      <el-card class="function-card">
        <h3>常用功能</h3>
        <div class="function-list">
          <div class="function-item" v-for="(func, index) in functionList" :key="index">
            <div class="func-icon" :style="{ background: func.bgColor }">
              <component :is="func.icon" :size="24" color="#fff" />
            </div>
            <span>{{ func.name }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span=6>
      <el-card></el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  Refresh,
  InfoFilled,
  CaretTop,
  Tools,
  Document,
  List,
  PieChart,
  Wallet,
  Tickets
} from '@element-plus/icons-vue'

const equipmentData = ref([
  {
    title: '充电桩使用率',
    icon: 'https://api.iconify.design/mdi:ev-station.svg?color=%231890ff',
    current: 72,
    total: 95,
    abnormal: 9,
    compare: 24,
    bgColor: '#e6f7ff'
  },
  {
    title: '充电桩使用率',
    icon: 'https://api.iconify.design/mdi:monitor-dashboard.svg?color=%2313c2c2',
    current: 655,
    total: 1233,
    abnormal: 22,
    compare: 24,
    bgColor: '#e6fffb'
  },
  {
    title: '充电桩使用率',
    icon: 'https://api.iconify.design/mdi:solar-power.svg?color=%2352c41a',
    current: 2263,
    total: 3398,
    abnormal: 47,
    compare: 24,
    bgColor: '#f6ffed'
  }
])

const functionList = ref([
  { name: '设备维修', icon: markRaw(Tools), bgColor: '#faad14' },
  { name: '每日日报', icon: markRaw(Document), bgColor: '#1890ff' },
  { name: '任务进度', icon: markRaw(List), bgColor: '#722ed1' },
  { name: '营收占比', icon: markRaw(PieChart), bgColor: '#eb2f96' },
  { name: '营收统计', icon: markRaw(Wallet), bgColor: '#1890ff' },
  { name: '待办事项', icon: markRaw(Tickets), bgColor: '#f5222d' }
])
</script>

<style lang="less" scoped>
.status-card {
  margin-bottom: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h3 {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      color: #1d2129;
    }

    .header-right {
      display: flex;
      align-items: center;

      p {
        color: #86909c;
        font-size: 14px;
        margin: 0;
      }

      .refresh-icon {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }

  .equipment-list {
    display: flex;
    gap: 0;

    .equipment-item {
      flex: 1;
      padding: 24px 20px;
      border-right: 1px solid #f0f0f0;
      display: flex;
      flex-direction: column;

      &:last-child {
        border-right: none;
      }

      .item-top {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 20px;

        h4 {
          color: #4e5969;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 28px;
            height: 28px;
          }
        }
      }

      .item-value {
        margin-bottom: 20px;

        .num {
          font-size: 40px;
          font-weight: bold;
          color: #1d2129;
          line-height: 1.2;
        }

        .split {
          font-size: 28px;
          color: #c9cdd4;
          margin: 0 6px;
        }

        .total {
          font-size: 40px;
          font-weight: bold;
          color: #86909c;
          line-height: 1.2;
        }
      }

      .item-bottom {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 13px;
        color: #86909c;

        .abnormal, .compare {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }
}

.function-card {
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 25px 0;
    color: #1d2129;
  }

  .function-list {
    display: flex;
    gap: 0;

    .function-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 10px 0;

      &:hover {
        opacity: 0.85;
      }

      .func-icon {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        font-size: 13px;
        color: #4e5969;
      }
    }
  }
}
</style>
