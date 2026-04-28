<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h4>今日总收入(元)</h4>
        </div>
        <div class="total">
          <h1>{{ formatNumberToThousands(239824) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h4>本月总收入(万元)</h4>
        </div>
        <div class="total">
          <h1>{{ formatNumberToThousands(1624) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h4>会员储值金额(元)</h4>
        </div>
        <div class="total">
          <h1>{{ formatNumberToThousands(125856) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h4>服务费总金额(元)</h4>
        </div>
        <div class="total">
          <h1>{{ formatNumberToThousands(800) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h4>停车费总金额(元)</h4>
        </div>
        <div class="total">
          <h1>{{ formatNumberToThousands(1224) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round">
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <h4>电费总金额(元)</h4>
        </div>
        <div class="total">
          <h1>{{ formatNumberToThousands(10824) }}</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-card class="mt">
    <div ref="chartRef" style="width: 100%; height: 300px"></div>
  </el-card>
</template>

<script setup lang="ts">
import { formatNumberToThousands } from "@/utils/toThousands";
import { useChart } from "@/hooks/useChart";
import { reactive, ref } from "vue";
import { getRevenueChartApi } from "@/api/station";

const chartRef = ref<HTMLElement | null>(null);
const getChartData = async () => {
  const chartOptions: any = reactive({
    title: {
      text: "电量统计",
      left: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
    },
    xAxis: [
      {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "销售",
        position: "left",
      },
      {
        type: "value",
        name: "访问量",
        position: "right",
      },
    ],
    series: [
      {
        name: "",
        type: "bar",
        data: [],
        yAxisIndex: 0,
        itmeStyle: {
          color: "#409eff",
        },
        smooth: true,
      },
      {
        name: "",
        type: "line",
        data: [],
        yAxisIndex: 1,
        itmeStyle: {
          color: "#409eff",
        },
        smooth: true,
      },
    ],
  });
  const res = await getRevenueChartApi();
  chartOptions.legend.data = res.data.list.map((item: any) => item.name);
  for (let i = 0; i < res.data.list.length; i++) {
    chartOptions.series[i].name = res.data.list[i].name;
    chartOptions.series[i].data = res.data.list[i].data;
  }
  return chartOptions;
};

useChart(chartRef, getChartData);
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  .round {
    display: flex;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(234, 236, 245);
    align-items: center;
    justify-content: center;
  }
  h4 {
    color: #666;
  }
}
.total {
  display: flex;
  margin-top: 20px;
  align-items: center;
  h1 {
    font-size: 30px;
    margin-right: 20px;
  }
  .percent {
    display: inline-block;
    height: 20px;
    margin-top: 5px;
    padding: 0 5px 5px 5px;
    color: green;
    font-size: 12px;
    background-color: rgb(235, 247, 239);
    line-height: 25px;
    border-radius: 2px;
  }
}
</style>
