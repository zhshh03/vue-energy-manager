<template>
  <el-dialog v-model="dialogVisible" title="新增充电站">
    <el-form label-width="120" :rules="rules" :model="ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="站点名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="站点id：" prop="id">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>
          <el-form-item label="所属城市：" prop="city">
            <el-input v-model="ruleForm.city"></el-input>
          </el-form-item>
          <el-form-item label="站点负责人：" prop="person">
            <el-input v-model="ruleForm.person"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话：" prop="tel">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="快充数：" prop="fast">
            <el-input v-model="ruleForm.fast"></el-input>
          </el-form-item>
          <el-form-item label="慢充数：" prop="slow">
            <el-input v-model="ruleForm.slow"></el-input>
          </el-form-item>
          <el-form-item label="充电站状态：" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择">
              <el-option label="使用中" :value="2"></el-option>
              <el-option label="空闲中" :value="3"></el-option>
              <el-option label="维修中" :value="4"></el-option>
              <el-option label="待维修" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="正在充电：" prop="now">
            <el-input v-model="ruleForm.now"></el-input>
          </el-form-item>
          <el-form-item label="故障数：" prop="fault">
            <el-input v-model="ruleForm.fault"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import type { RowType } from "@/types/station";

const dialogVisible = ref<boolean>(true);
const rules = reactive<FormRules>({
  name: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  id: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  city: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  persion: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  tel: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  fast: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  slow: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  status: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  now: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  fault: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
});
const ruleForm = reactive<RowType>({
  name: "",
  id: "",
  city: "",
  person: "",
  tel: "",
  fast: "",
  slow: "",
  status: 2,
  now: "",
  fault: "",
});
</script>
