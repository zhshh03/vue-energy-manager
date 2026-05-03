<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <el-input
          style="width: 80%"
          placeholder="请输入关键词"
          v-model="filterText"
        >
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :props="defaultProps"
          :data="treeData"
          class="mt"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <template #header>
          <div class="header-card">
            <h3>{{ title ? title + ":计费模板" : "计费模板" }}</h3>
          </div>
        </template>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          hide-required-asterisk
        >
          <el-form-item label="模板名称：" prop="name" style="max-width: 250px">
            <el-input
              :disabled="!title"
              v-model="ruleForm.name"
              placeholder="请输入模板名称"
            ></el-input>
          </el-form-item>

          <el-form-item
            :label="`时间区间${index + 1}：`"
            v-for="(timeSlot, index) in ruleForm.data"
            :key="index"
          >
            <el-row :gutter="10" style="width: 100%">
              <el-col :span="8">
                <el-form-item
                  :prop="'data.' + index + '.date1'"
                  :rules="[
                    {
                      required: true,
                      message: '请选择开始时间',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-time-picker
                    :disabled="!title"
                    v-model="timeSlot.date1"
                    placeholder="请选择开始时间："
                    style="width: 100%"
                    value-format="hh:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="1" style="text-align: center; line-height: 32px"
                >--</el-col
              >
              <el-col :span="8">
                <el-form-item
                  :prop="'data.' + index + '.date2'"
                  :rules="[
                    {
                      required: true,
                      message: '请选择结束时间',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-time-picker
                    :disabled="!title"
                    v-model="timeSlot.date2"
                    placeholder="请选择结束时间："
                    style="width: 100%"
                    value-format="hh:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  :prop="'data.' + index + '.electricity'"
                  :rules="[
                    { required: true, message: '请输入电费', trigger: 'blur' },
                  ]"
                  label="电费："
                >
                  <el-input
                    :disabled="!title"
                    v-model="timeSlot.electricity"
                    placeholder="请输入电费"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <el-button
            :disabled="!title"
            type="primary"
            class="mb"
            @click="addTimeSlot"
            >添加时间区间</el-button
          >
          <el-form-item label="服务费：" prop="service">
            <el-input
              :disabled="!title"
              v-model="ruleForm.service"
              placeholder="请输入服务费"
              style="max-width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="停车费：" prop="parking">
            <el-input
              :disabled="!title"
              v-model="ruleForm.parking"
              placeholder="请输入停车费"
              style="max-width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="特殊备注：" prop="remarks">
            <el-input
              :disabled="!title"
              v-model="ruleForm.remarks"
              placeholder="请输入备注"
              style="max-width: 100%"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submit"
              :loading="loading"
              :disabled="!title"
              >创建</el-button
            >
            <el-button @click="resetForm" :disabled="!title">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getCityListApi } from "@/api/operation";
import {
  type FilterNodeMethodFunction,
  type TreeInstance,
  type FormInstance,
  type FormRules,
  ElMessage,
} from "element-plus";

interface City {
  label: string;
  children?: City[];
}
interface Tree {
  [key: string]: any;
}

const treeRef = ref<TreeInstance>();
const filterText = ref<string>("");
const treeData = ref<City[]>([]);
const defaultProps = {
  children: "children",
  label: "label",
};

const title = ref<string>("");
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  name: "",
  service: "",
  parking: "",
  remarks: "",
  data: [{ date1: "", date2: "", electricity: "" }],
});
const rules = ref<FormRules>({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  service: [{ required: true, message: "请输入服务费", trigger: "blur" }],
  parking: [{ required: true, message: "请输入停车费", trigger: "blur" }],
  remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
  data: [{ required: true, message: "请输入时间区间", trigger: "blur" }],
});
const addTimeSlot = () => {
  ruleForm.value.data.push({ date1: "", date2: "", electricity: "" });
};

const loading = ref(false);
const submit = () => {
  ruleFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      setTimeout(() => {
        ElMessage.success("创建成功");
        ruleForm.value = {
          name: "",
          service: "",
          parking: "",
          remarks: "",
          data: [{ date1: "", date2: "", electricity: "" }],
        };
        ruleFormRef.value!.resetFields();
        loading.value = false;
      }, 1000);
    }
  });
};
const resetForm = () => {
  ruleForm.value = {
    name: "",
    service: "",
    parking: "",
    remarks: "",
    data: [{ date1: "", date2: "", electricity: "" }],
  };
  ruleFormRef.value!.resetFields();
};

const filterNode: FilterNodeMethodFunction = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

const handleNodeClick = (data: Tree) => {
  if (!data.children) {
    title.value = data.label;
    resetForm();
  }
};

onMounted(async () => {
  const res = await getCityListApi();
  treeData.value = res.data;
});

watch(filterText, (newValue) => {
  treeRef.value!.filter(newValue);
});
</script>
