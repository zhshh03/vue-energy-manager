<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入订单号"
          v-model="searchParams.orderOn"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="订单状态" v-model="searchParams.status">
          <el-option label="全部" value="1"></el-option>
          <el-option label="进行中" value="2"></el-option>
          <el-option label="已完成" value="3"></el-option>
          <el-option label="异常" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="设备编号" v-model="searchParams.no"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt">
      <el-col :span="6">
        <el-input
          placeholder="请输入站点名称"
          v-model="searchParams.name"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="/"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
          value-format="YYYY-MM-DD"
          @change="handleDateChange"
        />
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-button type="danger" @click="handleDelete" :disabled="disabled"
      >批量删除</el-button
    >
    <el-button type="primary" icon="Download" :disabled="disabled"
      >导出订单数据到Excel</el-button
    >
  </el-card>
  <el-card class="mt">
    <el-table
      :data="dataList"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="订单号" prop="orderNo"></el-table-column>
      <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
      <el-table-column label="订单日期" prop="date"></el-table-column>
      <el-table-column label="开始时间" prop="startTime"></el-table-column>
      <el-table-column label="结束时间" prop="ednTime"></el-table-column>
      <el-table-column label="金额" prop="money"></el-table-column>
      <el-table-column label="支付方式" prop="pay"></el-table-column>
      <el-table-column label="订单状态" prop="status">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status === 2">进行中</el-tag>
          <el-tag type="primary" v-else-if="scope.row.status === 3"
            >已完成</el-tag
          >
          <el-tag type="warning" v-if="scope.row.status === 4">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleDetail(scope.row.orderNo)"
            >详情</el-button
          >
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt mb fr"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 15, 20, 25]"
      layout="sizes, prev, pager, next,total"
      :total="totals"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useHttp } from "@/hooks/useHttp";
import { batchDelete } from "@/api/operation";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useTabsStore } from "@/store/tabs";

const date = ref([]);

interface SearchParams {
  orderOn: string;
  status?: number;
  no: string;
  name: string;
  startTime: string;
  endTime: string;
}

interface Order {
  orderNo: string;
  equipmentNo: string;
  date: string;
  startTime: string;
  endTime: string;
  money: number;
  pay: string;
  status: number;
}

const searchParams = ref<SearchParams>({
  orderOn: "",
  status: undefined,
  no: "",
  name: "",
  startTime: "",
  endTime: "",
});

const handleDateChange = (val: any) => {
  searchParams.value.startTime = val[0];
  searchParams.value.endTime = val[1];
};

const handleReset = () => {
  searchParams.value = {
    orderOn: "",
    status: undefined,
    no: "",
    name: "",
    startTime: "",
    endTime: "",
  };
  date.value = [];
  resetPagination();
  loadData();
};

const selectionList = ref<Order[]>([]);
const handleSelectionChange = (val: Order[]) => {
  selectionList.value = val;
};

const disabled = computed(() => selectionList.value.length === 0);

const handleDelete = async () => {
  console.log(selectionList.value);

  const res = await batchDelete(
    selectionList.value.map((item) => item.orderNo),
  );
  console.log(res);

  if (res.code === 200) {
    ElMessage.success("删除成功");
    loadData();
  }
};

const router = useRouter();
const tabsStore = useTabsStore();
const handleDetail = (orderNo: string) => {
  tabsStore.addTab("订单详情", "/operation/detail", "Share");
  tabsStore.setCurrentTab("订单详情", "/operation/detail");
  router.push("/operation/detail?orderNo=" + orderNo);
};

const {
  dataList,
  loading,
  totals,
  pageInfo,
  loadData,
  handleSizeChange,
  handleCurrentChange,
  resetPagination,
} = useHttp<Order>("/orderList", searchParams);
</script>
