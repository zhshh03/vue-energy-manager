<template>
   <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container>
        <el-header>
          <TopHeader />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Menu from '@/components/NavMenu/menu.vue'
import TopHeader from '@/components/TopHeader/topHeader.vue'
</script>


<style lang="less" scoped>
.el-aside{
  height: 100vh;
  background-color: white;
  box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
}
.el-main{
  overflow: auto;
  background-color: #f0f2f5;
}

.el-header{
  padding: 0 !important;
}

</style>