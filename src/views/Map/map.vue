<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-card>
        <map-contain></map-contain>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import mapContain from "@/components/map/mapContain.vue";
</script>
