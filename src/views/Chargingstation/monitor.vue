<template>
  <el-card>
    <el-row>
      <el-col :span="6">
        <el-statistic title="累计充电量(度)" :value="268900" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计充电次数(次)" :value="1389" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="服务区域(个)" :value="88" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计效益(元)" :value="5622178" />
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          v-model.trim="formParams.input"
          style="max-width: 600px"
          placeholder="请输入站点名称、ID"
          class="input-with-select"
        >
          <template #append>
            <el-select v-model="select" style="width: 115px">
              <el-option label="按名称查询" value="name" />
              <el-option label="按ID查询" value="id" />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="充电站状态" v-model="formParams.value">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="使用中" :value="2"></el-option>
          <el-option label="空闲中" :value="3"></el-option>
          <el-option label="维修中" :value="4"></el-option>
          <el-option label="待维修" :value="5"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-col>
    </el-row>
    <div class="fr mb mr">
      <el-button type="primary" icon="Plus" @click="add">新增充电站</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="name" label="站点名称" />
      <el-table-column prop="id" label="站点id" />
      <el-table-column prop="city" label="所属城市" />
      <el-table-column prop="fast" label="快充数" />
      <el-table-column prop="slow" label="慢充数" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 2" type="primary">使用中</el-tag>
          <el-tag v-if="scope.row.status === 3" type="success">空闲中</el-tag>
          <el-tag v-if="scope.row.status === 4" type="warning">维护中</el-tag>
          <el-tag v-if="scope.row.status === 5" type="danger">待维修</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="now" label="正在充电" />
      <el-table-column prop="fault" label="故障数" />
      <el-table-column prop="person" label="站点负责人" />
      <el-table-column prop="tel" label="负责人电话" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-space>
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </el-space>
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
    <StationForm />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getListApi } from "@/api/chargingstation";
import StationForm from "@/views/Chargingstation/components/StationForm.vue";
import type { RowType } from "@/types/station";

const tableData = ref<RowType[]>([]);
const select = ref("name");
const total = ref<number>(0);
const loading = ref<boolean>(false);

//表单数据
const formParams = reactive({
  input: "",
  value: 1,
});
//分页数据
const pageInfo = ref({
  page: 1,
  pageSize: 10,
});
//获取表格数据
const getList = async () => {
  loading.value = true;
  const res = await getListApi({
    ...pageInfo.value,
    status: formParams.value,
    [select.value]: formParams.input,
  });
  tableData.value = res.data.list;
  total.value = res.data.total;
  loading.value = false;
};
//重置
const resetForm = () => {
  ((formParams.input = ""),
    (formParams.value = 1),
    (pageInfo.value.page = 1),
    (select.value = "name"));
  getList();
};
//编辑
const handleEdit = (row: any) => {
  console.log(row);
};
//删除
const handleDelete = (row: any) => {
  console.log(row);
};
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
//新增充电站
const add = () => {
  console.log("新增充电站");
};

onMounted(() => {
  getList();
});
</script>
