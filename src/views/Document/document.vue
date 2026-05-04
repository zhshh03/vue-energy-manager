<template>
  <el-card>
    <div class="mt">
      <span class="title">文档类型：</span>
      <el-tag @click="handleTagClick(-1,0)" :type="currentIndex[0] === -1 ? 'primary' : 'info'">全部</el-tag>
      <el-tag 
        class="ml" 
        :type="currentIndex[0] === index ? 'primary' : 'info'" 
        v-for="(item,index) in documentList.type" 
        :key="item"
        @click="handleTagClick(index,0)"
      >
      {{ item }}
    </el-tag>
    </div>
    <div class="mt">
      <span class="title">重要程度：</span>
      <el-tag @click="handleTagClick(-1,1)" :type="currentIndex[1] === -1 ? 'primary' : 'info'">全部</el-tag>
      <el-tag 
        class="ml" 
        :type="currentIndex[1] === index ? 'primary' : 'info'" 
        v-for="(item,index) in documentList.important" 
        :key="item"
        @click="handleTagClick(index,1)"
      >
      {{ item }}
    </el-tag>
    </div>
    <div class="mt">
      <span class="title">发布渠道：</span>
      <el-tag @click="handleTagClick(-1,2)" :type="currentIndex[2] === -1 ? 'primary' : 'info'">全部</el-tag>
      <el-tag 
        class="ml" 
        :type="currentIndex[2] === index ? 'primary' : 'info'" 
        v-for="(item,index) in documentList.publish" 
        :key="item" 
        @click="handleTagClick(index,2)"
      >
      {{ item }}
    </el-tag>
    </div>
    <el-divider></el-divider>
    <div class="mt">
      <span class="title">已选</span>
      <el-tag type="success" class="ml" closable >item</el-tag>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getDocumentList } from "@/api/document";
import { ref,onMounted } from "vue";

interface Document {
  type:string[],
  important:string[],
  publish:string[],
}

const documentList = ref<Document>({
  type:[],
  important: [],
  publish: [],
});
const currentIndex = ref([-1,-1,-1]);

const handleTagClick = (index: number,num:number) => {
  currentIndex.value[num] = index;
};

onMounted(() => {
  getDocumentList().then((res) => {
    documentList.value = res.data;
  });
});

</script>

<style scoped>
.title {
  font-weight: inline-block;
  width: 80px;
  font-size: 14px;
}
</style>
