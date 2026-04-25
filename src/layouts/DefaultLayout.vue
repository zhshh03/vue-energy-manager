<template>
   <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


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