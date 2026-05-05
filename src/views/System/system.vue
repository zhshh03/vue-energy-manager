<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="searchParams.name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model.trim="searchParams.department" placeholder="请选择部门">
          <el-option label="全部" value=""></el-option>
          <el-option label="总裁办" value="总裁办"></el-option>
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="市场部" value="市场部"></el-option>
          <el-option label="维修部" value="维修部"></el-option>
          <el-option label="运营部" value="运营部"></el-option>
          <el-option label="客服部" value="客服部"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="resetPagination">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="idNo" label="身份证号"></el-table-column>
      <el-table-column prop="position" label="职位">
        <template #default="{row}">
          <el-tag>{{ row.position }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column prop="pageAuthority" label="页面权限">
        <template #default="{row}">
          <el-tag type="success">{{ row.pageAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="btnAuthority" label="按钮权限">
        <template #default="{row}">
          <el-tag type="info">{{ row.btnAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <el-button type="primary" size="small">权限设置</el-button>
        <el-button type="danger" size="small">删除</el-button>
        <el-button type="text" size="small">禁用</el-button>
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
import { ref } from 'vue'
import { useHttp } from '@/hooks/useHttp'

interface SearchParams {
  name: string,
  department: string,
}

const searchParams = ref<SearchParams>({
  name: '',
  department: '',
})


const { dataList,
    loading,
    totals,
    pageInfo,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    resetPagination, } = useHttp('/roleList',searchParams)
</script>
