import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/layouts/DefaultLayout.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/dashboard.vue"),
      },
      {
        path: "chargingstation",
        redirect: "/chargingstation/monitor",
        children: [
          {
            path: "monitor",
            name: "ChargingstationMonitor",
            component: () => import("@/views/Chargingstation/monitor.vue"),
          },
          {
            path: "revenue",
            name: "ChargingstationRevenue",
            component: () => import("@/views/Chargingstation/revenue.vue"),
          },
          {
            path: "fault",
            name: "ChargingstationFault",
            component: () => import("@/views/Chargingstation/fault.vue"),
          },
        ],
      },
      {
        path: "map",
        name: "Map",
        component: () => import("@/views/Map/map.vue"),
      },
      {
        path: "operation",
        redirect: "/operation/order",
        children: [
          {
            path: "order",
            name: "OperationOrder",
            component: () => import("@/views/Operation/order.vue"),
            meta: {
              keepAlive: true,
            },
          },
          {
            path: "detail",
            name: "OperationDetail",
            component: () => import("@/views/Operation/detail.vue"),
          },
          {
            path: "total",
            name: "OperationTotal",
            component: () => import("@/views/Operation/total.vue"),
          },
        ],
      },
      {
        path: "alarm",
        name: "Alarm",
        component: () => import("@/views/Alarm/alarm.vue"),
      },
      {
        path: "equipment",
        name: "Equipment",
        component: () => import("@/views/Equipment/equipment.vue"),
      },
      {
        path: "document",
        name: "Document",
        component: () => import("@/views/Document/document.vue"),
        meta: {
          needAuth: ["admin", "manager"],
        },
      },
      {
        path: "system",
        name: "System",
        component: () => import("@/views/System/system.vue"),
        meta: {
          needAuth: ["admin"],
        },
      },
      {
        path: "personal",
        name: "Personal",
        component: () => import("@/views/Personal/personal.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/NotFound.vue"),
  },
];

export default routes;
