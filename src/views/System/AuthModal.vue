<template>
    <el-dialog
    title="权限设置"
    width="600px"
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