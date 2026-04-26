<template>
  <el-row :gutter="20">
    <el-col :span=18>

      <!-- 今日设备运行状态 -->
      <el-card class="status-card">
        <template #header>
          <div class="card-header">
          <h3>今日设备运行状态</h3>
          <div class="header-right">
            <p>更新时间：2026年4月30日</p>
            <el-icon color="#86909c" class="refresh-icon"><Refresh /></el-icon>
          </div>
        </div>
        </template>
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
        <template #header>
          <div class="card-header">
            <h3>常用功能</h3>
          </div>
        </template>
        <div class="function-list">
          <div class="function-item" v-for="(func, index) in functionList" :key="index">
            <div class="func-icon" :style="{ background: func.bgColor }">
              <component :is="func.icon" :size="24" color="#fff" />
            </div>
            <span>{{ func.name }}</span>
          </div>
        </div>
      </el-card>

      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>能源统计</h3>
          </div>
        </template>
        <el-row>
          <el-col :span="6">
            <div ref="chartRef2" style="width: 100%; height: 400px;"></div>
          </el-col>
          <el-col :span="18">
            <div ref="chartRef" style="width: 100%; height: 400px;"></div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :span=6>
      <el-card>
        <template #header>
          <div class="card-header">
            <h3>设备总览</h3>
          </div>
        </template>
        <div ref="chartRef3" style="width: 100%;height: 240px;"></div>
      </el-card>

      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>营收统计表</h3>
          </div>
        </template>
        <ul class="ranking-list">
          <li class="ranking-item">
            <span class="rank top-rank" style="background: #52c41a;">1</span>
            <span class="store-name">广州</span>
            <span class="sales">52,457</span>
            <span class="percent up">24%<el-icon><CaretTop /></el-icon></span>
          </li>
          <li class="ranking-item">
            <span class="rank top-rank" style="background: #1890ff;">2</span>
            <span class="store-name">上海</span>
            <span class="sales">323,234</span>
            <span class="percent down">24%<el-icon><CaretBottom /></el-icon></span>
          </li>
          <li class="ranking-item">
            <span class="rank top-rank" style="background: #faad14;">3</span>
            <span class="store-name">佛山</span>
            <span class="sales">192,255</span>
            <span class="percent down">24%<el-icon><CaretBottom /></el-icon></span>
          </li>
          <li class="ranking-item">
            <span class="rank">4</span>
            <span class="store-name">珠海</span>
            <span class="sales">17,540</span>
            <span class="percent up">24%<el-icon><CaretTop /></el-icon></span>
          </li>
          <li class="ranking-item">
            <span class="rank">5</span>
            <span class="store-name">深圳</span>
            <span class="sales">662,337</span>
            <span class="percent down">24%<el-icon><CaretBottom /></el-icon></span>
          </li>
          <li class="ranking-item">
            <span class="rank">6</span>
            <span class="store-name">厦门</span>
            <span class="sales">22,941</span>
            <span class="percent up">24%<el-icon><CaretTop /></el-icon></span>
          </li>
          <li class="ranking-item">
            <span class="rank">7</span>
            <span class="store-name">长沙</span>
            <span class="sales">565,221</span>
            <span class="percent up">24%<el-icon><CaretTop /></el-icon></span>
          </li>
        </ul>
      </el-card>

      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>故障警报</h3>
          </div>
        </template>
        <el-timeline class="alarm-timeline">
          <el-timeline-item timestamp="2026/4/12" placement="top" type="danger" :hollow="true">
            <el-card>
              <h4>矿业北路通讯中断</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2026/4/3" placement="top" type="warning" :hollow="true">
            <el-card>
              <h4>黄河南路超出服务区域</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2026/4/2" placement="top" type="danger" :hollow="true">
            <el-card>
              <h4>6号机组异常断电</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
            </el-card>
          </el-col>
        </el-row>
</template>

<script setup lang="ts">
import { ref, markRaw, reactive} from 'vue'
import {Refresh,InfoFilled,CaretTop,CaretBottom,Tools,Document,List,PieChart,Wallet,Tickets} from '@element-plus/icons-vue'
import { useChart } from '@/hooks/useChart'
import { getChartDataAPI,getChartData2API,getChartData3API } from '@/api/dashboard'

const chartRef = ref<HTMLElement | null>(null)
const chartRef2 = ref<HTMLElement | null>(null)
const chartRef3 = ref<HTMLElement | null>(null)

const getChartData = async () => {
  const chartOptions:any = reactive({
  title: {
    text: '电量统计',
    left: 0
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: '5%',
    data: []
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', "20:00","21:00"]
  },
  yAxis: {
    type: 'value',
    axisLabel:{
      formatter:"{value}kw"
    }
  },
  series: [
    {
      name: '',
      type: 'line',
      data: [],
      lineStyle:{
        width:4
      },
      itemStyle:{
        color:"purple",
        shadowBlur:5,
        shadowColor:"rgba(0,255,0,0.5)"
      },
      smooth: true
    },
    {
      name: '',
      type: 'line',
      data: [],
       lineStyle:{
        width:4
      },
      itemStyle:{
        color:"lightgreen",
        shadowBlur:5,
        shadowColor:"rgba(0,255,0,0.5)"
      },
      smooth:true
    },
    {
      name: '',
      type: 'line',
      data: [],
       lineStyle:{
        width:4
      },
      itemStyle:{
        color:"skyblue",
        shadowBlur:5,
        shadowColor:"rgba(0,255,0,0.5)"
      },
      smooth:true
    }
  ]
});
  const res = await getChartDataAPI()
  chartOptions.legend.data = res.data.list.map((item:any) => item.name)
  for(let i=0; i<res.data.list.length; i++){
    chartOptions.series[i].name = res.data.list[i].name
    chartOptions.series[i].data = res.data.list[i].data
  }
  return chartOptions
}

const getChartData2 = async () => {
  const chartOptions:any = reactive({
  legend: {
    top: 'bottom'
  },
  tooltip:{
    trigger:"item",
    formatter:"{a}<br/>{b}：{c}"
  },
  series: [
    {
      name: '营收占比',
      type: 'pie',
      radius: ["50%", "70%"],
      center: ['50%', '50%'],
      roseType: 'area',
      emphasis:{
        label:{
          show:true,
          fontSize:"16",
          fontWeight:"bold"
        }
      },
      data: []
    }
  ],
  graphic:{
    type:'text',
    left:"center",
    top:'center',
    style:{
      text:"营收占比",
      fontSize:20,
      fill:"#333"
    }
  }
})
  const res = await getChartData2API()
  chartOptions.series[0].data = res.data.list
return chartOptions
}

const getChartData3 = async () => {
  const chartOptions:any = reactive(
    {
  radar: {
    indicator: [
      { name: '闲置数', max: 65 },
      { name: '使用数', max: 160 },
      { name: '故障数', max: 300 },
      { name: '维修数', max: 380 },
      { name: '更换数', max: 520 },
      { name: '报废数', max: 250 }
    ]
  },
  series: [
    {
      name: '设备总览',
      type: 'radar',
      data: [
        {
          value: [],
          name: '设备总览'
        }
      ]
    }
  ]
}
  )
  const res = await getChartData3API()
  chartOptions.series[0].data[0].value = res.data.list
  return chartOptions
}

useChart(chartRef,getChartData)
useChart(chartRef2,getChartData2)
useChart(chartRef3,getChartData3)

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
    margin-bottom: 10px;

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

.ranking-list {
  list-style: none;
  padding: 0;
  margin: 0;

  .ranking-item {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border-bottom: 1px solid #f2f3f5;

    &:nth-child(even) {
      background-color: #f2f3f5;
      border-radius: 8px;
      margin: 0 -8px;
      padding-left: 18px;
      padding-right: 18px;
    }

    &:last-child {
      border-bottom: none;
    }

    .rank {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #4e5969;
      flex-shrink: 0;

      &.top-rank {
        color: #fff;
        font-weight: bold;
      }
    }

    .store-name {
      margin-left: 10px;
      font-size: 15px;
      color: #1d2129;
      flex: 1;
    }

    .sales {
      font-size: 16px;
      font-weight: 600;
      color: #86909c;
      margin-right: 20px;
    }

    .percent {
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 2px;

      &.up {
        color: #00b42a;
      }

      &.down {
        color: #f53f3f;
      }
    }
  }
}

.alarm-timeline {
  padding-left: 0;

  :deep(.el-timeline-item) {
    padding-bottom: 10px;

    .el-timeline-item__wrapper {
      padding-left: 18px;
    }

    .el-timeline-item__node {
      top: 50%;
      transform: translateY(-50%);
    }

    .el-timeline-item__tail {
      top: calc(50% + 10px);
    }

    .el-timeline-item__timestamp {
      margin-bottom: 4px;
      font-size: 12px;
      color: #86909c;
    }

    .el-card {
      margin: 0 !important;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

      :deep(&__body) {
        padding: 6px 12px;
      }

      h4 {
        font-size: 13px;
        color: #1d2129;
        margin: 0;
        font-weight: normal;
      }
    }
  }
}
</style>
