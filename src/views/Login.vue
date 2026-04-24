<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-area">
        <div class="logo-icon">
          <span class="logo-text">D</span>
        </div>
        <h1 class="title">动力港能源管理平台</h1>
      </div>
      <el-form ref="formRef" :model="formData" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    // TODO: 替换为实际登录接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('登录成功')
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/images/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
  width: 420px;
  padding: 40px 36px 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 32px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3370b5;
}

.logo-text {
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  letter-spacing: 1px;
}

.login-btn {
  width: 100%;
  --el-button-bg-color: #4a90e2;
  --el-button-border-color: #4a90e2;
  --el-button-hover-bg-color: #3a80d2;
  --el-button-hover-border-color: #3a80d2;
  letter-spacing: 6px;
}
</style>
