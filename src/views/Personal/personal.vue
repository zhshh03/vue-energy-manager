<template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
        <el-descriptions
          title="个人信息"
          direction="vertical"
          border
        >
          <el-descriptions-item
            :rowspan="2"
            :width="140"
            label="头像"
            align="center"
          >
          <el-image
            style="width: 100px; height: 100px"
            :src="logo"
          />
          </el-descriptions-item>
          <el-descriptions-item label="姓名">度</el-descriptions-item>
          <el-descriptions-item label="电话">18600001111</el-descriptions-item>
          <el-descriptions-item label="地址">安徽省芜湖市</el-descriptions-item>
          <el-descriptions-item label="标签">
          <el-tag type="success" size="small" class="mr">18岁</el-tag>
          <el-tag type="info" size="small"class="mr">未婚</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        </el-card>
        <el-card class="mt">
          <el-calendar v-model="value" controller-type="select" class="compact-calendar" />
        </el-card>
        <el-card class="mt">
          <template #header>
            <div class="card-header">
              <span>完善个人资料</span>
            </div>
          </template>
          <el-row :gutter="70">
            <el-col :span="16">
              <step-form :steps="steps" :form1="form1" :form2="form2" @submit="handleSubmit">
                <template #step-1>
                  <el-form :model="formData.basicInfo" ref="form1">
                    <el-form-item label="姓名">
                      <el-input v-model="formData.basicInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="formData.basicInfo.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                      <el-input v-model="formData.basicInfo.address"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
                <template #step-2>
                  <el-form :model="formData.job" ref="form2">
                    <el-select placeholder="请选择在职信息" v-model="formData.job.status">
                      <el-option label="工作中" value="1"></el-option>
                      <el-option label="请假中" value="2"></el-option>
                      <el-option label="出差中" value="3"></el-option>
                      <el-option label="年假中" value="4"></el-option>
                    </el-select>
                  </el-form>
                </template>
              </step-form>
            </el-col>
            <el-col :span="8">
              <div style="display: flex; align-items: center; flex-direction: column;">
                <h3 style="margin-bottom: 50px;">资料完善度</h3>
                <el-progress type="circle" :percentage="75" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col> 
      <el-col :span="12">
        <el-card>
          <el-badge :value="12" class="mr">
            <el-button>待办事项</el-button>
          </el-badge>
          <el-badge :value="3" class="mr">
            <el-button>指派给我</el-button>
          </el-badge>
          <el-badge :value="6" class="mr">
            <el-button>部门公告</el-button>
          </el-badge>
          <el-badge :value="9" class="mr">
            <el-button>站内信</el-button>
          </el-badge>
          <el-badge :value="1" class="mr">
            <el-button>我指派的</el-button>
          </el-badge>
           <el-collapse class="mt">
            <el-collapse-item title="账号注销通知">
              <div style="display: flex; justify-content: space-between;" class="mt">
                <span>有员工离职，账号需要注销，请及时处理</span>
                <el-button type="primary" size="small" class="mr">去处理</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="设备告警通知">
              <div style="display: flex; justify-content: space-between;" class="mt">
                <span>3号设备运行异常，请尽快排查故障原因</span>
                <el-button type="primary" size="small" class="mr">去处理</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="权限变更通知">
              <div style="display: flex; justify-content: space-between;" class="mt">
                <span>您的系统权限已被管理员调整，请查看详情</span>
                <el-button type="primary" size="small" class="mr">去查看</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="系统维护通知">
              <div style="display: flex; justify-content: space-between;" class="mt">
                <span>系统将于今晚22:00-23:00进行维护升级</span>
                <el-button type="primary" size="small" class="mr">查看详情</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="能耗异常通知">
              <div style="display: flex; justify-content: space-between;" class="mt">
                <span>本月能耗超出预算20%，请关注用能情况</span>
                <el-button type="primary" size="small" class="mr">去查看</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="密码过期提醒">
              <div style="display: flex; justify-content: space-between;" class="mt">
                <span>您的登录密码将于7天后过期，请及时修改</span>
                <el-button type="primary" size="small" class="mr">去修改</el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import { ref } from 'vue'
import stepForm from '@/components/stepForm/stepForm.vue';
import type { FormInstance } from 'element-plus';

const value = ref(new Date())
const form1 = ref<FormInstance>()
const form2 = ref<FormInstance>()
const steps = [
  { title: "基本信息" },
  { title: "在职信息" }
];
const formData = ref({
  basicInfo:{
    name:'',
    tel:'',
    address:''
  },
  job:{
    status:''
  }
}
)
const handleSubmit = () => {
  console.log(formData.value)
}
</script>

<style scoped>
.compact-calendar {
  --el-calendar-cell-width: 42px;
}

:deep(.compact-calendar .el-calendar__header) {
  padding: 8px 12px;
}

:deep(.compact-calendar .el-calendar-table thead th) {
  padding: 6px 0;
  font-size: 12px;
}

:deep(.compact-calendar .el-calendar-table .el-calendar-day) {
  height: 46px;
  padding: 4px 6px;
  font-size: 12px;
}

:deep(.compact-calendar .el-calendar-table td) {
  border-radius: 6px;
}

:deep(.compact-calendar .el-calendar-table td.is-selected) {
  background-color: #ecf5ff;
}
</style>
