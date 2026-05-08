<template>
  <el-card class="mb">
    <div class="mt">
      <span class="title">文档类型：</span>
      <el-tag @click="handleTagClick(-1,0,'全部')" :type="currentIndex[0] === -1 ? 'primary' : 'info'">全部</el-tag>
      <el-tag 
        class="ml" 
        :type="currentIndex[0] === index ? 'primary' : 'info'" 
        v-for="(item,index) in documentList.type" 
        :key="item"
        @click="handleTagClick(index,0,item)"
      >
      {{ item }}
    </el-tag>
    </div>
    <div class="mt">
      <span class="title">重要程度：</span>
      <el-tag @click="handleTagClick(-1,1,'全部')" :type="currentIndex[1] === -1 ? 'primary' : 'info'">全部</el-tag>
      <el-tag 
        class="ml" 
        :type="currentIndex[1] === index ? 'primary' : 'info'" 
        v-for="(item,index) in documentList.important" 
        :key="item"
        @click="handleTagClick(index,1,item)"
      >
      {{ item }}
    </el-tag>
    </div>
    <div class="mt">
      <span class="title">发布渠道：</span>
      <el-tag @click="handleTagClick(-1,2,'全部')" :type="currentIndex[2] === -1 ? 'primary' : 'info'">全部</el-tag>
      <el-tag 
        class="ml" 
        :type="currentIndex[2] === index ? 'primary' : 'info'" 
        v-for="(item,index) in documentList.publish" 
        :key="item" 
        @click="handleTagClick(index,2,item)"
      >
      {{ item }}
    </el-tag>
    </div>
    <el-divider></el-divider>
    <div style="height: 25px;">
      <span class="title">已选：</span>
      <el-tag 
        disable-transitions
        type="primary" 
        style="margin-left: 15px;"
        closable 
        v-for="item in selectedList" 
        :key="item"
        @close="handleTagClick(-1,item.num,'全部')"
      >
      {{ item.name }}
      </el-tag>
    </div>
  </el-card>
  <div v-loading="editorLoading" element-loading-text="编辑器加载中..." class="editor-loading-wrap">
    <Editor
      v-model="editorContent"
      id="<uid>"
      apiKey="setjn0fktlffj9vhof8klk6toldh4ntm2hrznq4a2jtha91t"
      @init="handleEditorInit"
      :init="{
        language_url: '/langs/zh_CN.js',
        language: 'zh_CN',
        plugins: 'lists link image table code help wordcount',
        branding: false,
        content_style:
          'body { background: #f8fbff; color: #1f2d3d; font-size: 14px; line-height: 1.8; padding: 14px 16px; } p { margin: 0 0 10px; } h1,h2,h3,h4,h5,h6 { color: #15263d; margin: 12px 0 8px; } a { color: #2f78d9; } blockquote { border-left: 3px solid #8fb6ec; margin: 8px 0; padding: 6px 10px; background: #eef5ff; } table { border-collapse: collapse; } table td, table th { border: 1px solid #c9d9ef; padding: 6px 8px; }',
      }"
    />
  </div>
    <el-button type="primary" class="mt mb" @click="exportToHtml">导出html文件</el-button>
    <el-button type="primary" :loading="submitLoading" @click="submit" v-permission="'admin'">提交</el-button>
</template>

<script setup lang="ts">
import { getDocumentList } from "@/api/document";
import { ref,onMounted } from "vue";
import { ElMessage } from "element-plus";
import Editor from '@tinymce/tinymce-vue'

interface Document {
  type:string[],
  important:string[],
  publish:string[],
}
interface selectedType {
  name:string,
  num:number,
}

const documentList = ref<Document>({
  type:[],
  important: [],
  publish: [],
});
const currentIndex = ref<number[]>([-1,-1,-1]);
const selectedList = ref<selectedType[]>([]);

const handleTagClick = (index: number,num:number,name:string) => {
  currentIndex.value[num] = index;
  const ind:number = selectedList.value.findIndex(item => item.num === num)
  if(name === '全部') {
    selectedList.value = selectedList.value.filter(item => item.num !== num)
    return
  }
  if(ind === -1) {
    selectedList.value.push({name,num})
  } else {
    selectedList.value[ind] = {name,num}
  }
};

const editorContent = ref('')
onMounted(() => {
  getDocumentList().then((res) => {
    documentList.value = res.data;
  });
});

const exportToHtml = () => {
  const bolb = new Blob([editorContent.value],{type: 'text/html'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(bolb)
  link.download = 'document.html'
  link.click()
  URL.revokeObjectURL(link.href)
}

const submitLoading = ref(false)
const editorLoading = ref(true)

const handleEditorInit = () => {
  editorLoading.value = false
}

const submit = async () => {
  submitLoading.value = true

  const selectedTagArray = selectedList.value.map((item) => item.name);
  const params = {
    content: editorContent.value,
    type: selectedTagArray[0],
    important: selectedTagArray[1],
    publish: selectedTagArray[2],
  }
  console.log(params);
  
  await new Promise((resolve) => setTimeout(resolve, 1000))

  currentIndex.value = [-1, -1, -1]
  selectedList.value = []
  editorContent.value = ""

  submitLoading.value = false
  ElMessage.success("提交成功")
}

</script>

<style scoped>
.title {
  font-weight: inline-block;
  width: 80px;
  font-size: 14px;
}

.el-tag {
  cursor: pointer;
  transition: all 0.2s ease;
}

:deep(.el-tag.el-tag--info) {
  color: #cfe0fb !important;
  border-color: rgba(125, 194, 255, 0.32) !important;
  background: rgba(16, 28, 48, 0.7) !important;
}

:deep(.el-tag.el-tag--primary) {
  color: #ffffff !important;
  border-color: transparent !important;
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.96), rgba(74, 144, 226, 0.64)) !important;
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.35);
}

:deep(.el-tag:hover) {
  transform: translateY(-1px);
}

.editor-loading-wrap {
  min-height: 380px;
  border-radius: 12px;
  border: 1px solid rgba(125, 194, 255, 0.28);
  background: #142741;
  padding: 10px;
  box-shadow: 0 10px 24px rgba(2, 8, 20, 0.28);
}
</style>

<style>
/* TinyMCE 全局样式重塑 */
.tox.tox-tinymce {
  border-radius: 10px !important;
  overflow: hidden !important;
  border: 1px solid rgba(125, 194, 255, 0.32) !important;
  box-shadow: 0 8px 20px rgba(2, 8, 20, 0.25) !important;
}

/* 工具栏深色，按钮清晰 */
.tox .tox-editor-header,
.tox .tox-toolbar,
.tox .tox-toolbar__primary,
.tox .tox-menubar {
  background: #1a3152 !important;
  border-bottom: 1px solid rgba(125, 194, 255, 0.22) !important;
}

.tox .tox-tbtn,
.tox .tox-mbtn,
.tox .tox-mbtn__select-label {
  color: #eaf2ff !important;
  background: #1f3a60 !important;
  border: 1px solid rgba(125, 194, 255, 0.28) !important;
}

.tox .tox-tbtn svg,
.tox .tox-mbtn svg {
  fill: #eaf2ff !important;
  color: #eaf2ff !important;
}

.tox .tox-tbtn:hover,
.tox .tox-mbtn:hover {
  background: #2a4c78 !important;
  border-color: rgba(125, 194, 255, 0.55) !important;
}

.tox .tox-tbtn--enabled,
.tox .tox-tbtn--enabled:hover,
.tox .tox-mbtn--active {
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.95), rgba(74, 144, 226, 0.62)) !important;
  border-color: transparent !important;
  color: #fff !important;
}

/* 下拉面板 */
.tox .tox-collection,
.tox .tox-menu,
.tox .tox-dialog {
  background: #1a3152 !important;
  border: 1px solid rgba(125, 194, 255, 0.3) !important;
}

.tox .tox-collection__item,
.tox .tox-collection__item-label,
.tox .tox-menu-nav__js,
.tox .tox-collection__item-accessory,
.tox .tox-listboxfield .tox-listbox--select {
  color: #eaf2ff !important;
}

.tox .tox-collection__item--enabled,
.tox .tox-collection__item--active,
.tox .tox-collection__item:hover {
  background: rgba(74, 144, 226, 0.24) !important;
}

/* 编辑正文区：白底黑字，确保输入体验 */
.tox .tox-edit-area__iframe,
.tox .tox-edit-area {
  background: #ffffff !important;
}

/* 状态栏 */
.tox .tox-statusbar {
  background: #1a3152 !important;
  border-top: 1px solid rgba(125, 194, 255, 0.22) !important;
  color: #dbe9ff !important;
}

/* 隐藏推广 */
.tox-promotion,
.tox-promotion-link,
.tox .tox-promotion {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  overflow: hidden !important;
}

.tox-statusbar__help-text {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  overflow: hidden !important;
}
</style>
