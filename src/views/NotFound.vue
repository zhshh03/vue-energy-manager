<template>
  <div class="not-found">
    <div class="content">
      <div class="code">404</div>
      <div class="title">页面走丢了</div>
      <div class="desc">抱歉，你访问的页面不存在或已被移除。</div>

      <div class="actions">
        <el-button type="primary" @click="goBack">返回上一页</el-button>
        <el-button plain @click="goLogin">去登录页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const goLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7f9fc 0%, #eef3ff 100%);
  padding: 24px;
}

.content {
  width: 100%;
  max-width: 560px;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  padding: 48px 32px;
  box-shadow: 0 12px 30px rgba(60, 90, 140, 0.12);
}

.code {
  font-size: 92px;
  line-height: 1;
  font-weight: 800;
  color: #409eff;
  letter-spacing: 2px;
}

.title {
  margin-top: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #303133;
}

.desc {
  margin-top: 12px;
  font-size: 15px;
  color: #909399;
}

.actions {
  margin-top: 28px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>