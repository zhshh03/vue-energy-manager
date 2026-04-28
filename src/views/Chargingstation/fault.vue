<template>
  <el-card>
    <div class="mb">
      <el-select
        v-model="value"
        filterable
        style="width: 300px"
        placeholder="选择站点名称"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </div>
    <div style="margin-bottom: 30px">
      <el-radio-group size="large">
        <el-radio-button label="全部" value="0" />
        <el-radio-button label="空闲中" value="1" />
        <el-radio-button label="充电中" value="2" />
        <el-radio-button label="连接中" value="3" />
        <el-radio-button label="排队中" value="4" />
        <el-radio-button label="已预约" value="5" />
        <el-radio-button label="故障/离线" value="6" />
      </el-radio-group>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="station-card">
          <div class="item">
            <div class="pic">
              <p>空闲中</p>
              <i class="iconfont icon-chongdianzhuang"></i>
              <p>80%</p>
            </div>
            <div class="info">
              <h3>CD1001</h3>
              <p>电压：314v</p>
              <p>电流：212.2A</p>
              <p>功率：21KW</p>
              <p>温度：32°C</p>
            </div>
          </div>
          <div class="btn">
            <div class="divder"></div>
            <div class="btn-footer">
              <span class="warn-text">暂无预警</span>
              <div>
                <el-button size="small">维保记录</el-button>
                <el-button size="small" type="primary">使用记录</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentListApi } from "@/api/chargingstation";
import { ref, onMounted } from "vue";

const options = ref<any>([]);
const value = ref("");
const dataList = ref<any>([]);
const loadData = async () => {
  const { data } = await getCurrentListApi();
  options.value = data;
  dataList.value = data.list;
  console.log(data);
};

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="less">
.el-col {
  margin-bottom: 20px;
}

.station-card {
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s;
  background: #fff;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .item {
    display: flex;

    .pic {
      width: 130px;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 10px;
      background: linear-gradient(135deg, #f0f9eb 0%, #e1f3d8 100%);

      p:first-child {
        font-size: 13px;
        color: #67c23a;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .iconfont {
        font-size: 44px;
        color: #67c23a;
        margin-bottom: 8px;
      }

      p:last-child {
        font-size: 20px;
        color: #67c23a;
        font-weight: bold;
      }
    }

    .info {
      flex: 1;
      padding: 14px 18px;

      h3 {
        font-size: 15px;
        color: #303133;
        font-weight: 600;
        margin: 0 0 10px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #ebeef5;
      }

      p {
        font-size: 13px;
        color: #606266;
        line-height: 2;
        margin: 0;
      }
    }
  }

  .btn {
    padding: 0 18px 12px;

    .divder {
      border-top: 1px solid #ebeef5;
      margin-bottom: 8px;
    }

    .btn-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .warn-text {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
