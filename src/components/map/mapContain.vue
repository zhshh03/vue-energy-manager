<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref } from "vue";
import { getMapApi } from "@/api/map";
import "@/assets/iconfont/iconfont.css";

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
const mapData = ref<any>([]);


getMapApi().then(res => {
  mapData.value = res.data;
  console.log(res);
  mapData.value.forEach((item: any) => {
  const marker = new AMap.Marker({
    position:item.position,
    content: `<svg viewBox="0 0 1024 1024" width="32" height="32"><path d="M512 32A388.49887219 388.49887219 0 0 0 123.54122469 420.49887219c0 214.59861375 388.45877531 571.50112781 388.45877531 571.50112781s388.45877531-356.86241719 388.45877531-571.50112781A388.49887219 388.49887219 0 0 0 512 32z" fill="#67C23A" ></path><path d="M604.74413188 145.915295l-294.07067063 328.03274625h198.03859313L405.98379406 752.54130781l310.39011-376.0688325H510.19563969l94.54849219-230.55718031z" fill="#FFFFFF" ></path></svg>`,
    title: item.title,
});
map.add(marker);
})
  
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
