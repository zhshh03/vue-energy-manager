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
  <el-card class="mt">
    <el-input
      v-model="name"
      style="max-width: 400px"
      placeholder="请输入充电站名称"
    >
      <template #append>
        <el-button icon="Search" @click="handleSearch"></el-button>
      </template>
    </el-input>
    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column label="充电站名称" prop="name"></el-table-column>
      <el-table-column label="充电站id" prop="id"></el-table-column>
      <el-table-column label="所属城市" prop="city"></el-table-column>
      <el-table-column label="充电桩总量(个)" prop="count"></el-table-column>
      <el-table-column label="月总收入(万元)">
        <template #default="scope">
          <span style="margin-right: 10px">{{ scope.row.month }}</span>
          <el-tag :type="scope.row.mpercnet > 0 ? 'danger' : 'success'">{{
            scope.row.mpercnet + "%"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="电费营收(元)"
        prop="electricity"
      ></el-table-column>
      <el-table-column
        label="停车费营收(元)"
        prop="parkingFee"
      ></el-table-column>
      <el-table-column
        label="服务费营收(元)"
        prop="serviceFee"
      ></el-table-column>
      <el-table-column label="会员储值金(元)" prop="member"></el-table-column>
      <el-table-column label="单日总收入(元)" prop="day">
        <template #default="scope">
          <span style="margin-right: 10px">{{ scope.row.day }}</span>
          <el-tag :type="scope.row.percent > 0 ? 'danger' : 'success'">{{
            scope.row.percent + "%"
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt mb fr"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 15, 20, 25]"
      layout="sizes, prev, pager, next,total"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { formatNumberToThousands } from "@/utils/toThousands";
import { useChart } from "@/hooks/useChart";
import { onMounted, reactive, ref } from "vue";
import { getRevenueChartApi, getListApi } from "@/api/station";

// 图表相关
const chartRef = ref<HTMLElement | null>(null);
const getChartData = async () => {
  const chartOptions: any = reactive({
    title: {
      text: "销售统计",
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

//表格
const tableData = ref([]);
const loading = ref<boolean>(false);
const name = ref<string>("");

const handleSearch = () => {
  getList();
};

const getList = async () => {
  loading.value = true;
  const { data } = await getListApi({ name: name.value, ...pageInfo.value });
  tableData.value = data.list;
  tableData.value = data.list.map((item: any) => {
    return {
      ...item,
      day: item.electricity + item.parkingFee + item.serviceFee + item.member,
    };
  });
  total.value = data.total;
  loading.value = false;
  console.log(data);
};
//分页数据
const total = ref<number>(0);
const pageInfo = ref({
  page: 1,
  pageSize: 10,
});

//更改分页数
const handleSizeChange = (val: number) => {
  pageInfo.value.pageSize = val;
  getList();
};
//切换当前页
const handleCurrentChange = (val: number) => {
  pageInfo.value.page = val;
  getList();
};

onMounted(() => {
  getList();
});
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
