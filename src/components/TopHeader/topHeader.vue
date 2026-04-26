<template>
  <div class="header">
    <div class="personal">
      <el-badge is-dot>
        <el-icon>
          <Bell />
        </el-icon>
      </el-badge>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你{{ userName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User" command="user"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item icon="SwitchButton" command="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userName = userStore.username;

const handleCommand = (command: string) => {
  if (command === "logout") {
    userStore.logout();
    router.push("/login");
  } else {
    router.push("/personal");
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .personal {
    display: flex;
    align-items: center;
    gap: 16px;

    .el-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 20px;
      color: #606266;
      transition: color 0.3s;

      &:hover {
        color: #409eff;
      }
    }

    .el-avatar {
      cursor: pointer;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #303133;
      font-size: 14px;
      outline: none;

      &:hover {
        color: #409eff;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
