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
  <Editor
    v-model="editorContent"
    id="<uid>"
    apiKey="setjn0fktlffj9vhof8klk6toldh4ntm2hrznq4a2jtha91t"
      :init="{
        language_url: '/langs/zh_CN.js',
        language: 'zh_CN',
        plugins: 'lists link image table code help wordcount',
        branding: false,
      }"
    />
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
.el-tag{
  cursor: pointer;
}
</style>

<style>
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
