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

<style scoped lang="less">
:deep(.el-dialog) {
  border-radius: 14px;
  border: 1px solid #dbe7f7;
  background: #ffffff;
  box-shadow: 0 14px 36px rgba(15, 33, 61, 0.18);
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin-right: 0;
  padding: 16px 20px 14px;
  border-bottom: 1px solid #e8eef7;
  background: linear-gradient(180deg, #f8fbff 0%, #f2f7ff 100%);
}

:deep(.el-dialog__title) {
  color: #1f2d3d;
  font-size: 17px;
  font-weight: 700;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: #5f6b7a;
}

:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #2f78d9;
}

:deep(.el-dialog__body) {
  padding: 20px 20px 8px;
}

:deep(.el-form-item) {
  margin-bottom: 18px;
}

:deep(.el-form-item__label) {
  color: #25364d !important;
  font-weight: 700;
}

/* 输入框：浅色内凹（下陷感） */
:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
  background: linear-gradient(180deg, #eef3fb 0%, #e8eef8 100%) !important;
  border-radius: 10px;
  box-shadow:
    inset 0 2px 5px rgba(129, 149, 179, 0.28),
    inset 0 -1px 0 rgba(255, 255, 255, 0.95),
    0 0 0 1px #d2ddec !important;
  color: #1b2a3d !important;
}


:deep(.el-input__wrapper.is-focus),
:deep(.el-select__wrapper.is-focused) {
  box-shadow:
    inset 0 2px 5px rgba(129, 149, 179, 0.24),
    inset 0 -1px 0 rgba(255, 255, 255, 0.98),
    0 0 0 1px #6ea8f1 !important;
}

:deep(.el-input.is-disabled .el-input__wrapper),
:deep(.el-select.is-disabled .el-select__wrapper) {
  background: linear-gradient(180deg, #f4f7fc 0%, #edf2f9 100%) !important;
  box-shadow:
    inset 0 1px 3px rgba(129, 149, 179, 0.16),
    0 0 0 1px #dee6f2 !important;
}

:deep(.el-input__inner),
:deep(.el-select__selected-item),
:deep(.el-textarea__inner) {
  color: #1b2a3d !important;
  -webkit-text-fill-color: #1b2a3d !important;
  font-weight: 500;
  caret-color: #2f78d9 !important;
}

:deep(.el-input),
:deep(.el-textarea),
:deep(.el-select) {
  --el-input-text-color: #1b2a3d;
  --el-text-color-regular: #1b2a3d;
}

:deep(.el-input__inner::selection),
:deep(.el-textarea__inner::selection) {
  background: rgba(47, 120, 217, 0.22);
  color: #10243b;
}


:deep(.el-input__inner::placeholder),
:deep(.el-textarea__inner::placeholder),
:deep(.el-select__placeholder) {
  color: #7f8ea3 !important;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 8px 4px 6px;
}

:deep(.el-dialog__footer) {
  padding: 12px 20px 16px;
  border-top: 1px solid #e8eef7;
  background: #f8fbff;
}

.dialog-footer :deep(.el-button:not(.el-button--primary)) {
  color: #2d4058;
  background: #ffffff;
  border-color: #cdd9ea;
}

.dialog-footer :deep(.el-button:not(.el-button--primary):hover) {
  color: #1f5fb8;
  border-color: #8fb6ec;
  background: #f3f8ff;
}

:deep(.el-form-item__error) {
  color: #d83c3c;
}
</style>


