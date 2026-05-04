<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入会员卡号" v-model="searchParams.no"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入手机号" v-model="searchParams.tel"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入姓名" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="memberCardNumber" label="会员卡"></el-table-column>
      <el-table-column prop="cardType" label="卡类型"></el-table-column>
      <el-table-column prop="issueDate" label="开卡日期"></el-table-column>
      <el-table-column prop="holderName" label="持卡人姓名"></el-table-column>
      <el-table-column prop="holderPhone" label="持卡人电话"></el-table-column>
      <el-table-column prop="cardBalance" label="卡余额"></el-table-column>
      <el-table-column prop="transactionHistory" label="消费记录">
        <template #default="{ row}">
          <el-popover
          placement="top-start"
          title="消费记录"
          :width="200"
          trigger="hover"
          :content="row.transactionHistory"
          >
        <template #reference>
          <el-button class="m-2">消费记录</el-button>
        </template>
        <el-timeline class="compact-timeline">
          <el-timeline-item 
          v-for="(item,index) in row.transactionHistory" 
          :key="index" 
          color="#0bbd87" 
          :time="item.transactionDate"
          >
            <p>消费金额：{{ item.transactionAmount }}</p>
            <p>消费类型：{{ item.transactionType }}</p>
          </el-timeline-item>
        </el-timeline>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="有效期至" prop="vaildUntil"></el-table-column>
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

const searchParams = ref({
  no: '',
  tel: '',
  name: ''
})

const handleReset = () => {
  searchParams.value = {
    no: '',
    tel: '',
    name: ''
  }
  resetPagination()
  loadData()
}
const { 
    dataList,
    loading,
    totals,
    pageInfo,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    resetPagination,
} = useHttp("/memberCardList",searchParams)
</script>

<style scoped>
.compact-timeline {
  padding-left: 0 !important;
}
.compact-timeline :deep(.el-timeline-item__wrapper) {
  padding-left: 18px !important;
}
</style>