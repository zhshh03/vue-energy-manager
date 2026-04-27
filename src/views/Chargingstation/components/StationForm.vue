<template>
  <el-dialog v-model="dialogVisible" :title="title">
    <el-form ref="formRef" label-width="120" :rules="rules" :model="ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="站点名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="站点id：" prop="id">
            <el-input v-model="ruleForm.id" :disabled="disable"></el-input>
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
            <el-select
              v-model="ruleForm.status"
              placeholder="请选择状态"
              :disabled="disable"
            >
              <el-option label="使用中" :value="2"></el-option>
              <el-option label="空闲中" :value="3"></el-option>
              <el-option label="维修中" :value="4"></el-option>
              <el-option label="待维修" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="正在充电：" prop="now">
            <el-input v-model="ruleForm.now" :disabled="disable"></el-input>
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
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import type { RowType } from "@/types/station";
import { useStationStore } from "@/store/station";
import { addStationApi, editorStationApi } from "@/api/station";
import { ElMessage } from "element-plus";

const stationStore = useStationStore();
const dialogVisible = ref<boolean>(false);
const disable = ref<boolean>(false);
const formRef = ref<FormInstance>();
const title = ref<string>("");
//表单校验规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: "站点名称不能为空", trigger: "blur" }],
  id: [{ required: true, message: "id不能为空", trigger: "blur" }],
  city: [{ required: true, message: "城市名不能为空", trigger: "blur" }],
  person: [{ required: true, message: "负责人不能为空", trigger: "blur" }],
  tel: [
    { required: true, message: "负责人电话不能为空", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号格式",
      trigger: "blur",
    },
  ],
  fast: [{ required: true, message: "快充数不能为空", trigger: "blur" }],
  slow: [{ required: true, message: "慢充数不能为空", trigger: "blur" }],
  status: [{ required: true, message: "充电站状态不能为空", trigger: "blur" }],
  now: [{ required: true, message: "正在充电数不能为空", trigger: "blur" }],
  fault: [{ required: true, message: "故障数不能为空", trigger: "blur" }],
});
const ruleForm = ref<RowType>({
  name: "",
  id: "",
  city: "",
  person: "",
  tel: "",
  fast: "",
  slow: "",
  now: "",
  fault: "",
});

const openDialog = () => {
  dialogVisible.value = true;
  disable.value = stationStore.rowData.id ? true : false;
  title.value = stationStore.rowData.id ? "编辑站点" : "新增站点";
  nextTick(() => {
    formRef.value?.resetFields();
    ruleForm.value = { ...stationStore.rowData };
  });
};

const emit = defineEmits(["submit"]);

const submitForm = async () => {
  await formRef.value?.validate();
  if (disable.value) {
    await editorStationApi(ruleForm.value);
    ElMessage.success("编辑成功");
  } else {
    await addStationApi(ruleForm.value);
    ElMessage.success("新增成功");
  }
  emit("submit");
  dialogVisible.value = false;
};

defineExpose({
  openDialog,
});
</script>
