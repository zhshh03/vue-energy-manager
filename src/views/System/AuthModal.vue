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
    </el-skeleton>
  </el-dialog>
</template>

<script setup lang="ts"> 
import { useUserStore } from '@/store/auth';
import { nextTick, ref, watch } from 'vue';
import { transformMenu } from '@/utils/transformMenu';

const props =  defineProps<{
  visible: boolean,
  checkedKeys: string[],
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const userStore = useUserStore()
const menuList = transformMenu(userStore.menu)
const treeData = ref(menuList)
const treeRef = ref<any>(null)

const handleDialogVisibleChange = (value: boolean) => {
  emit('update:visible', value)
}

const syncCheckedKeys = async () => {
  if (!props.visible || props.loading) return
  await nextTick()
  treeRef.value?.setCheckedKeys(props.checkedKeys)
}

const handleOpen = async () => {
  await syncCheckedKeys()
}

watch(
  () => [props.visible, props.loading, props.checkedKeys],
  async () => {
    await syncCheckedKeys()
  },
  { deep: true }
)
</script>