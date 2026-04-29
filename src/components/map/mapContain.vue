<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
// import { onMounted, onUnmounted } from "vue";

let map: any = null;
AMapLoader.load({
  key: "ef1ed0ee0ba70bf7f8761a46c26e04a7",
  version: "1.4.15",
  plugins: [],
})
  .then((AMap) => {
    map = new AMap.Map("container", {
      // 设置地图容器id
      viewMode: "3D", // 是否为3D地图模式
      zoom: 5, // 初始化地图级别
      center: [110.327428, 32.90923], // 初始化地图中心点位置
    });
  })
  .catch((e) => {
    console.log(e);
  });
</script>

<style scoped>
#container {
  width: 100%;
  height: 80vh;
}
</style>
