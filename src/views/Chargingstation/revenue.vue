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
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total">
          <h1>239824</h1>
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
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total">
          <h1>239824</h1>
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
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total">
          <h1>239824</h1>
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
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total">
          <h1>239824</h1>
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
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total">
          <h1>239824</h1>
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
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total">
          <h1>239824</h1>
          <div class="percent">-21%</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  .round {
    display: flex;
    margin-right: 20px;
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
