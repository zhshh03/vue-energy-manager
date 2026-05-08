<template>
  <div class="step-form-wrap">
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
      ></el-step>
    </el-steps>
    <div class="mt" v-if="currentStep == 0">
      <slot name="step-1"></slot>
    </div>
    <div class="mt" v-if="currentStep == 1">
      <slot name="step-2"></slot>
    </div>
    <div class="mt" v-if="currentStep == 2">
      <slot name="step-3"></slot>
    </div>
    <div class="step-button mt">
      <el-button v-if="currentStep > 0" @click="currentStep--"
        >上一步</el-button
      >
      <el-button type="primary" @click="nextStep">{{
        currentStep === steps.length - 1 ? "提交" : "下一步"
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["steps", "form1", "form2", "form3"]);
const emit = defineEmits(["submit"]);

const currentStep = ref<number>(0);

const nextStep = () => {
  const forms = [props.form1, props.form2, props.form3];
  const currentForm = forms[currentStep.value];
  currentForm?.validate((valid: boolean) => {
    if (valid) {
      if (currentStep.value < props.steps.length - 1) {
        currentStep.value++;
      } else {
        emit("submit"); 
      }
    }
  });
};
</script>

<style scoped lang="less">
.step-form-wrap {
  max-width: 760px;
  margin: 0 auto;
}

:deep(.el-steps) {
  padding: 8px 6px 4px;
  border-radius: 12px;
  background: #1a3152;
  border: 1px solid #355b8e;
}

:deep(.el-step__title) {
  color: #cfe0fb !important;
  font-size: 14px;
  font-weight: 600;
}

:deep(.el-step__title.is-process),
:deep(.el-step__title.is-success) {
  color: #f3f8ff !important;
}

:deep(.el-step__head.is-process .el-step__icon) {
  border-color: #7dc2ff;
  background: #2d5a91;
  color: #ffffff;
}

:deep(.el-step__head.is-success .el-step__icon) {
  border-color: #4fd38a;
  background: #2b7c56;
  color: #ffffff;
}

:deep(.el-step__line) {
  background-color: #3c648f !important;
}

.mt {
  margin-top: 16px;
}

.step-form-wrap > .mt {
  padding: 16px 14px 8px;
  border-radius: 12px;
  background: #182d4a;
  border: 1px solid #2f527f;
}

.step-button {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>

