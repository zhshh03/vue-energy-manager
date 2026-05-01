<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-card>
        <map-contain :key="mapKey"></map-contain>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="des">
        <div>1.累计充电站数量：<el-text type="primary">34个</el-text></div>
        <div>
          2.单省份最多充电桩：<el-text type="primary">北京(4个)</el-text>
        </div>
        <div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div>
        <div>4.暂无充电站省份：<el-text type="primary">22个</el-text></div>
        <div>5.累计充电站：<el-text type="primary">北京(4个)</el-text></div>
        <div>
          6.单日营收最高：<el-text type="primary">北京西单充电站</el-text>
        </div>
        <div>
          7.单日营收最低：<el-text type="primary">南宁清秀山充电站</el-text>
        </div>
        <div>
          8.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>新增站点地图</h3>
          </div>
        </template>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          style="max-width: 600px; height: 355px"
          label-width="85px"
          hide-required-asterisk
        >
          <el-form-item label="站点名称：" prop="name">
            <el-input
              placeholder="请输入站点名称"
              v-model.trim="formData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="站点地址：" prop="region">
            <el-input
              placeholder="请输入站点地址"
              v-model.trim="formData.region"
            ></el-input>
          </el-form-item>
          <el-form-item label="经度：" prop="location1">
            <el-input
              placeholder="请输入经度"
              v-model.trim="formData.location1"
            ></el-input>
          </el-form-item>
          <el-form-item label="纬度：" prop="location2">
            <el-input
              placeholder="请输入纬度"
              v-model.trim="formData.location2"
            ></el-input>
          </el-form-item>
          <el-form-item label="立即使用：">
            <el-switch v-model="formData.now"></el-switch>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model.trim="formData.remarks"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleCreate">创建</el-button>
            <el-button @click="handleReset">清空</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import mapContain from "@/components/map/mapContain.vue";
import { ref, reactive } from "vue";
import { addMapApi } from "@/api/map";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const formRef = ref<FormInstance>();
const mapKey = ref(0);

const formData = ref({
  name: "",
  region: "",
  location1: "",
  location2: "",
  now: false,
  remarks: "",
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入站点名称", trigger: "blur" }],
  region: [{ required: true, message: "请输入站点地址", trigger: "blur" }],
  location1: [
    { required: true, message: "请输入经度", trigger: "blur" },
    {
      pattern: /^-?\d+(\.\d+)?$/,
      message: "请输入有效的经度数值",
      trigger: "blur",
    },
  ],
  location2: [
    { required: true, message: "请输入纬度", trigger: "blur" },
    {
      pattern: /^-?\d+(\.\d+)?$/,
      message: "请输入有效的纬度数值",
      trigger: "blur",
    },
  ],
});

const handleCreate = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      addMapApi({
        position: [
          Number(formData.value.location1),
          Number(formData.value.location2),
        ],
        title: formData.value.region,
        status: formData.value.now ? "1" : "2",
        count: Number(formData.value.remarks) || 0,
      }).then((res: any) => {
        if (res.success) {
          ElMessage.success("创建成功");
          mapKey.value++;
          handleReset();
        }
      });
    }
  });
};

const handleReset = () => {
  formRef.value?.resetFields();
};
</script>

<style lang="less" scoped>
.des {
  line-height: 35px;
}
</style>
