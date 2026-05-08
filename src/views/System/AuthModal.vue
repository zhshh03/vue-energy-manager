<template>
    <el-dialog
        title="权限设置"
        width="600px"
        class="auth-dialog"
        :model-value="visible"
        @update:model-value="handleDialogVisibleChange"
        @opened="handleOpen"
      >
    <el-skeleton :loading="loading" :rows="6" animated>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>页面权限</span>
          </div>
        </template>
        <el-tree
          ref="treeRef"
          :data="treeData"
          show-checkbox
          style="max-width: 600px;"
          node-key="url"
        >
        </el-tree>
      </el-card>
      <el-card class="mt mb">
        <template #header>
          <div class="card-header">
            <span>按钮权限</span>
          </div>
        </template>
        <el-checkbox-group v-model="initBtnAuth">
          <el-checkbox label="全部" value="all"></el-checkbox> 
          <el-checkbox label="添加" value="add"></el-checkbox> 
          <el-checkbox label="编辑" value="edit"></el-checkbox> 
          <el-checkbox label="删除" value="delete"></el-checkbox>
        </el-checkbox-group>
      </el-card>
      <div class="dialog-footer" style="text-align: right;">
        <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">确认</el-button>
        <el-button @click="handleDialogVisibleChange(false)">取消</el-button>
      </div>
    </el-skeleton>
  </el-dialog>
</template>

<script setup lang="ts"> 
import { useUserStore } from '@/store/auth';
import { nextTick, ref, watch } from 'vue';
import { transformMenu } from '@/utils/transformMenu';
import { setAuthApi } from '@/api/system';
import { ElMessage } from 'element-plus';

const props =  defineProps<{
  visible: boolean,
  checkedKeys: string[],
  loading: boolean,
  btnAuth: string[],
  accountNo: string,
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'reload'): void
}>()

const userStore = useUserStore()
const menuList = transformMenu(userStore.menu)
const treeData = ref(menuList)
const treeRef = ref<any>(null)
const initBtnAuth = ref<string[]>([])
const confirmLoading = ref(false)

const handleDialogVisibleChange = (value: boolean) => {
  emit('update:visible', value)
}

const syncCheckedKeys = async () => {
  if (!props.visible || props.loading) return
  await nextTick()
  treeRef.value?.setCheckedKeys(props.checkedKeys)
  initBtnAuth.value = props.btnAuth
}

const handleOpen = async () => {
  await syncCheckedKeys()
}

const handleConfirm = async() => {
  confirmLoading.value = true
  try {
    const res = await setAuthApi(props.accountNo, treeRef.value.getCheckedKeys(true), initBtnAuth.value)
    if(res.code === 200) {
      ElMessage.success('设置成功')
      handleDialogVisibleChange(false)
    }
  } finally {
    confirmLoading.value = false
    // 通知父组件重新加载数据
    emit('reload')
  }
}

watch(
  () => [props.visible, props.loading, props.checkedKeys],
  async () => {
    await syncCheckedKeys()
  },
  { deep: true }
)
</script>

<style scoped lang="less">
/* ---------- Dialog 外壳 ---------- */
:deep(.auth-dialog) {
  border-radius: 16px !important;
  overflow: hidden;
  border: 1px solid rgba(125, 194, 255, 0.28);
  background: #142741 !important;
  box-shadow: 0 20px 50px rgba(2, 8, 20, 0.55), 0 0 80px rgba(74, 144, 226, 0.08);
}

:deep(.auth-dialog .el-dialog__header) {
  margin-right: 0;
  padding: 18px 24px 16px;
  border-bottom: 1px solid rgba(125, 194, 255, 0.2);
  background: linear-gradient(135deg, #193255, #1a3a5c);
}

:deep(.auth-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: #8aa8cc;
  font-size: 18px;
}

:deep(.auth-dialog .el-dialog__headerbtn:hover .el-dialog__close) {
  color: #ffffff;
}

:deep(.auth-dialog .el-dialog__title) {
  color: #eef5ff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

:deep(.auth-dialog .el-dialog__body) {
  padding: 20px 24px;
  background: #142741 !important;
}

/* ---------- Card 卡片 ---------- */
:deep(.el-card) {
  border: 1px solid rgba(125, 194, 255, 0.22) !important;
  background: rgba(18, 35, 58, 0.85) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(2, 8, 20, 0.25);
}

:deep(.el-card__header) {
  border-bottom: 1px solid rgba(125, 194, 255, 0.16) !important;
  padding: 14px 18px;
}

.card-header span {
  color: #eaf2ff;
  font-weight: 700;
  font-size: 15px;
}

:deep(.el-card__body) {
  padding: 14px 18px;
}

/* ---------- Tree 树形控件 ---------- */
:deep(.el-tree) {
  background: transparent;
  color: #d7e7ff;
  --el-tree-node-hover-bg-color: rgba(74, 144, 226, 0.15);
}

:deep(.el-tree-node__content) {
  height: 36px;
  border-radius: 8px;
  transition: background 0.2s;
}

:deep(.el-tree-node__content:hover) {
  background: rgba(74, 144, 226, 0.18) !important;
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background: rgba(74, 144, 226, 0.25);
}

:deep(.el-tree-node__expand-icon) {
  color: rgba(125, 194, 255, 0.55);
}

:deep(.el-tree-node__expand-icon.is-leaf) {
  color: transparent;
}

/* Tree 复选框 */
:deep(.el-tree .el-checkbox__inner) {
  background: rgba(16, 28, 48, 0.88);
  border-color: rgba(125, 194, 255, 0.3);
  border-radius: 4px;
}

:deep(.el-tree .el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #409eff;
  border-color: #409eff;
}

:deep(.el-tree .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background: #409eff;
  border-color: #409eff;
}

/* ---------- Checkbox 复选框组 ---------- */
:deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
}

:deep(.el-checkbox) {
  margin-right: 0;
}

:deep(.el-checkbox__inner) {
  background: rgba(16, 28, 48, 0.88);
  border-color: rgba(125, 194, 255, 0.3);
  border-radius: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #409eff;
  border-color: #409eff;
}

:deep(.el-checkbox__label) {
  color: #cfe0fb;
  font-size: 14px;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #ffffff;
}

:deep(.el-checkbox:hover .el-checkbox__inner) {
  border-color: rgba(125, 194, 255, 0.6);
}

/* ---------- Skeleton 骨架屏 ---------- */
:deep(.el-skeleton__item) {
  background: linear-gradient(
    90deg,
    rgba(116, 177, 255, 0.08),
    rgba(116, 177, 255, 0.22),
    rgba(116, 177, 255, 0.08)
  );
  border-radius: 8px;
}

/* ---------- 间距工具类 ---------- */
.mt {
  margin-top: 16px;
}

.mb {
  margin-bottom: 16px;
}

/* ---------- 底部按钮 ---------- */
.dialog-footer {
  text-align: right;
  padding-top: 6px;
}

.dialog-footer :deep(.el-button) {
  border-radius: 8px;
  font-weight: 600;
  padding: 10px 28px;
  transition: all 0.25s;
}

.dialog-footer :deep(.el-button--primary) {
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.95), rgba(74, 144, 226, 0.6));
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(74, 144, 226, 0.3);
}

.dialog-footer :deep(.el-button--primary:hover) {
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.45);
}

.dialog-footer :deep(.el-button--default) {
  color: #dce8fb;
  background: rgba(16, 28, 48, 0.9);
  border-color: rgba(125, 194, 255, 0.3);
}

.dialog-footer :deep(.el-button--default:hover) {
  color: #ffffff;
  background: rgba(74, 144, 226, 0.22);
  border-color: rgba(125, 194, 255, 0.55);
}
</style>