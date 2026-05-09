<template>
    <div class="header">
    <div class="personal">
      <el-badge is-dot>
        <el-icon>
          <Bell />
        </el-icon>
      </el-badge>
      <el-avatar
              :src="logo"
            />

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          您好，{{ userName }}
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
import logo from "@/assets/images/logo.png";


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
  border-radius: 14px;
  background: #152844;
  border: 1px solid rgba(125, 194, 255, 0.28);
  box-shadow: 0 12px 28px rgba(2, 8, 20, 0.35);

  .personal {
    display: flex;
    align-items: center;
    gap: 16px;

    .el-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      color: #b4c8ea;
      background: rgba(74, 144, 226, 0.14);
      transition: all 0.25s;

      &:hover {
        color: #fff;
        background: rgba(74, 144, 226, 0.3);
      }
    }

    .el-avatar {
      cursor: pointer;
      border: 2px solid rgba(96, 165, 250, 0.45);
      box-shadow: 0 4px 14px rgba(74, 144, 226, 0.35);
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #dce8fb;
      font-size: 14px;
      outline: none;

      &:hover {
        color: #7dc2ff;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>