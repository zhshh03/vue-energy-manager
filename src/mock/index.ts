import mock from "mockjs";

mock.setup({
  timeout: "200-600",
});

//管理员菜单
const menulist = [
  {
    name: "数据看板",
    url: "/dashboard",
    icon: "DataLine",
  },
  {
    name: "充电站管理",
    url: "/chargingstation",
    icon: "Lightning",
    children: [
      {
        name: "充电站监控",
        url: "/chargingstation/monitor",
        icon: "VideoCamera",
      },
      {
        name: "营收统计",
        url: "/chargingstation/revenue",
        icon: "DataAnalysis",
      },
      {
        name: "充电站管理",
        url: "/chargingstation/fault",
        icon: "Warning",
      },
    ],
  },
  {
    name: "电子地图",
    url: "/map",
    icon: "MapLocation",
  },
  {
    name: "运营管理",
    url: "/operation",
    icon: "Files",
    children: [
      {
        name: "订单管理",
        url: "/operation/order",
        icon: "DocumentCopy",
      },
      {
        name: "订单详情",
        url: "/operation/detail",
        icon: "Share",
      },
      {
        name: "计费管理",
        url: "/operation/total",
        icon: "Money",
      },
    ],
  },
  {
    name: "报警管理",
    url: "/alarm",
    icon: "Phone",
  },
  {
    name: "会员卡管理",
    url: "/equipment",
    icon: "Magnet",
  },
  {
    name: "招商管理",
    url: "/document",
    icon: "Document",
  },
  {
    name: "系统设置",
    url: "/system",
    icon: "Setting",
  },
  {
    name: "个人中心",
    url: "/personal",
    icon: "User",
  },
];
//运营专员菜单
const menulist2 = [
  {
    name: "数据看板",
    url: "/dashboard",
    icon: "DataLine",
  },
  {
    name: "充电站管理",
    url: "/chargingstation",
    icon: "Lightning",
    children: [
      {
        name: "充电站监控",
        url: "/chargingstation/monitor",
        icon: "VideoCamera",
      },
      {
        name: "营收统计",
        url: "/chargingstation/revenue",
        icon: "DataAnalysis",
      },
      {
        name: "充电站管理",
        url: "/chargingstation/fault",
        icon: "Warning",
      },
    ],
  },
  {
    name: "电子地图",
    url: "/map",
    icon: "MapLocation",
  },
  {
    name: "运营管理",
    url: "/operation",
    icon: "Files",
    children: [
      {
        name: "订单管理",
        url: "/operation/order",
        icon: "DocumentCopy",
      },
      {
        name: "订单详情",
        url: "/operation/detail",
        icon: "Share",
      },
      {
        name: "计费管理",
        url: "/operation/total",
        icon: "Money",
      },
    ],
  },
  {
    name: "报警管理",
    url: "/alarm",
    icon: "Phone",
  },
  {
    name: "会员卡管理",
    url: "/equipment",
    icon: "Magnet",
  },
  {
    name: "个人中心",
    url: "/personal",
    icon: "User",
  },
];
// 登录接口
mock.mock("https://www.demo.com/login", "post", (options: any) => {
  const { username, password } = JSON.parse(options.body);
  if (username === "admin" && password === "admin666") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "admintokenzhshh03",
        user: {
          username: "度",
          roles: ["admin"],
          menulist,
        },
      },
    };
  } else if (username === "user" && password === "user666") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "usertokenzhshh03",
        user: {
          username: "过度",
          roles: ["user"],
          menulist: menulist2,
        },
      },
    };
  } else {
    return {
      code: 401,
      message: "用户名或密码错误",
    };
  }
});

//能源统计图表接口
mock.mock("https://www.demo.com/energy", "get", () => {
  return {
    code: 200,
    message: "success",
    data: {
      list: [
        { name: "充电量", data: [20, 50, 30, 70, 60, 80, 40, 60, 50] },
        { name: "充电时长", data: [40, 60, 50, 80, 70, 90, 60, 70, 80] },
        { name: "充电功率", data: [30, 40, 60, 50, 70, 20, 30, 40, 60] },
      ],
    },
  };
});

//营收占比饼图接口数据
mock.mock("https://www.demo.com/revenue", "get", () => {
  return {
    code: 200,
    message: "success",
    data: {
      list: [
        { value: 35, name: "充电桩" },
        { value: 30, name: "充电站" },
        { value: 25, name: "充电杆" },
      ],
    },
  };
});

//设备总览饼图接口数据
mock.mock("https://www.demo.com/equipment", "get", () => {
  return {
    code: 200,
    message: "success",
    data: {
      list: [42, 30, 200, 350, 500, 180],
    },
  };
});

//充电桩监控表格接口数据
let chargingStation = [
  {
    name: "北京西单充电站",
    id: "VXZ10001",
    city: "北京",
    fast: 95,
    slow: 40,
    status: 3,
    now: 10,
    fault: 1,
    person: "张伟",
    tel: 17876554801,
  },
  {
    name: "上海南京路充电站",
    id: "VSH10002",
    city: "上海",
    fast: 120,
    slow: 60,
    status: 2,
    now: 25,
    fault: 2,
    person: "李娜",
    tel: 15987654321,
  },
  {
    name: "广州天河充电站",
    id: "VGZ10003",
    city: "广州",
    fast: 85,
    slow: 35,
    status: 5,
    now: 8,
    fault: 0,
    person: "王强",
    tel: 13876543210,
  },
  {
    name: "深圳福田充电站",
    id: "VSZ10004",
    city: "深圳",
    fast: 110,
    slow: 50,
    status: 3,
    now: 18,
    fault: 3,
    person: "刘洋",
    tel: 18698765432,
  },
  {
    name: "成都春熙路充电站",
    id: "VCD10005",
    city: "成都",
    fast: 75,
    slow: 30,
    status: 2,
    now: 12,
    fault: 1,
    person: "陈静",
    tel: 15987651234,
  },
  {
    name: "杭州西湖充电站",
    id: "VHZ10006",
    city: "杭州",
    fast: 90,
    slow: 45,
    status: 4,
    now: 6,
    fault: 0,
    person: "赵敏",
    tel: 13765432109,
  },
  {
    name: "武汉光谷充电站",
    id: "VWH10007",
    city: "武汉",
    fast: 100,
    slow: 55,
    status: 3,
    now: 22,
    fault: 2,
    person: "孙磊",
    tel: 18876543210,
  },
  {
    name: "南京新街口充电站",
    id: "VNJ10008",
    city: "南京",
    fast: 80,
    slow: 40,
    status: 2,
    now: 15,
    fault: 1,
    person: "周婷",
    tel: 15987654321,
  },
  {
    name: "西安钟楼充电站",
    id: "VXA10009",
    city: "西安",
    fast: 70,
    slow: 35,
    status: 5,
    now: 9,
    fault: 0,
    person: "吴刚",
    tel: 13654321098,
  },
  {
    name: "重庆解放碑充电站",
    id: "VCQ10010",
    city: "重庆",
    fast: 105,
    slow: 50,
    status: 3,
    now: 20,
    fault: 3,
    person: "郑华",
    tel: 18765432109,
  },
  {
    name: "天津滨江道充电站",
    id: "VTJ10011",
    city: "天津",
    fast: 88,
    slow: 42,
    status: 2,
    now: 14,
    fault: 1,
    person: "冯亮",
    tel: 15987654321,
  },
  {
    name: "苏州观前街充电站",
    id: "VSZ10012",
    city: "苏州",
    fast: 65,
    slow: 32,
    status: 5,
    now: 7,
    fault: 0,
    person: "陈丽",
    tel: 13765432109,
  },
  {
    name: "长沙五一广场充电站",
    id: "VCS10013",
    city: "长沙",
    fast: 92,
    slow: 48,
    status: 3,
    now: 19,
    fault: 2,
    person: "黄勇",
    tel: 18676543210,
  },
  {
    name: "青岛五四广场充电站",
    id: "VQD10014",
    city: "青岛",
    fast: 78,
    slow: 38,
    status: 2,
    now: 11,
    fault: 1,
    person: "林峰",
    tel: 15987654321,
  },
  {
    name: "大连星海广场充电站",
    id: "VDL10015",
    city: "大连",
    fast: 85,
    slow: 45,
    status: 4,
    now: 8,
    fault: 0,
    person: "徐明",
    tel: 13765432109,
  },
  {
    name: "厦门白鹭洲充电站",
    id: "VXM10016",
    city: "厦门",
    fast: 72,
    slow: 36,
    status: 3,
    now: 16,
    fault: 2,
    person: "马超",
    tel: 18876543210,
  },
  {
    name: "昆明翠湖充电站",
    id: "VKM10017",
    city: "昆明",
    fast: 68,
    slow: 34,
    status: 2,
    now: 13,
    fault: 1,
    person: "郭芳",
    tel: 15987654321,
  },
  {
    name: "济南泉城广场充电站",
    id: "VJN10018",
    city: "济南",
    fast: 82,
    slow: 41,
    status: 4,
    now: 10,
    fault: 0,
    person: "罗杰",
    tel: 13654321098,
  },
  {
    name: "郑州二七广场充电站",
    id: "VZZ10019",
    city: "郑州",
    fast: 95,
    slow: 48,
    status: 4,
    now: 21,
    fault: 3,
    person: "梁涛",
    tel: 18765432109,
  },
  {
    name: "沈阳中街充电站",
    id: "VSY10020",
    city: "沈阳",
    fast: 76,
    slow: 38,
    status: 2,
    now: 12,
    fault: 1,
    person: "宋丹",
    tel: 15987654321,
  },
  {
    name: "哈尔滨中央大街充电站",
    id: "VHE10021",
    city: "哈尔滨",
    fast: 70,
    slow: 35,
    status: 3,
    now: 14,
    fault: 2,
    person: "赵亮",
    tel: 13987654321,
  },
  {
    name: "福州三坊七巷充电站",
    id: "VFZ10022",
    city: "福州",
    fast: 65,
    slow: 32,
    status: 5,
    now: 6,
    fault: 0,
    person: "林芳",
    tel: 13765432109,
  },
  {
    name: "南宁东盟商务区充电站",
    id: "VNN10023",
    city: "南宁",
    fast: 80,
    slow: 40,
    status: 2,
    now: 11,
    fault: 1,
    person: "黄伟",
    tel: 18676543210,
  },
  {
    name: "贵阳甲秀楼充电站",
    id: "VGY10024",
    city: "贵阳",
    fast: 60,
    slow: 30,
    status: 3,
    now: 9,
    fault: 2,
    person: "杨敏",
    tel: 15987654321,
  },
  {
    name: "兰州中山桥充电站",
    id: "VLZ10025",
    city: "兰州",
    fast: 55,
    slow: 28,
    status: 4,
    now: 5,
    fault: 0,
    person: "马强",
    tel: 13765432109,
  },
  {
    name: "银川鼓楼充电站",
    id: "VYC10026",
    city: "银川",
    fast: 50,
    slow: 25,
    status: 2,
    now: 8,
    fault: 1,
    person: "李华",
    tel: 18676543210,
  },
  {
    name: "乌鲁木齐红山充电站",
    id: "VWQ10027",
    city: "乌鲁木齐",
    fast: 45,
    slow: 22,
    status: 3,
    now: 7,
    fault: 2,
    person: "王芳",
    tel: 15987654321,
  },
  {
    name: "拉萨布达拉宫充电站",
    id: "VLS10028",
    city: "拉萨",
    fast: 40,
    slow: 20,
    status: 5,
    now: 4,
    fault: 0,
    person: "扎西",
    tel: 13765432109,
  },
  {
    name: "呼和浩特大召寺充电站",
    id: "VHT10029",
    city: "呼和浩特",
    fast: 58,
    slow: 29,
    status: 2,
    now: 10,
    fault: 1,
    person: "苏和",
    tel: 18676543210,
  },
  {
    name: "海口万绿园充电站",
    id: "VHK10030",
    city: "海口",
    fast: 75,
    slow: 38,
    status: 3,
    now: 13,
    fault: 2,
    person: "陈明",
    tel: 15987654321,
  },
  {
    name: "三亚亚龙湾充电站",
    id: "VSY10031",
    city: "三亚",
    fast: 68,
    slow: 34,
    status: 5,
    now: 6,
    fault: 0,
    person: "林涛",
    tel: 13765432109,
  },
  {
    name: "南昌八一广场充电站",
    id: "VNC10032",
    city: "南昌",
    fast: 72,
    slow: 36,
    status: 2,
    now: 12,
    fault: 1,
    person: "刘芳",
    tel: 18676543210,
  },
  {
    name: "合肥天鹅湖充电站",
    id: "VHF10033",
    city: "合肥",
    fast: 85,
    slow: 42,
    status: 3,
    now: 15,
    fault: 2,
    person: "张磊",
    tel: 15987654321,
  },
  {
    name: "太原五一广场充电站",
    id: "VTY10034",
    city: "太原",
    fast: 62,
    slow: 31,
    status: 4,
    now: 7,
    fault: 0,
    person: "王静",
    tel: 13765432109,
  },
  {
    name: "石家庄裕华路充电站",
    id: "VSJ10035",
    city: "石家庄",
    fast: 78,
    slow: 39,
    status: 2,
    now: 11,
    fault: 1,
    person: "李强",
    tel: 18676543210,
  },
  {
    name: "长春人民广场充电站",
    id: "VCC10036",
    city: "长春",
    fast: 68,
    slow: 34,
    status: 3,
    now: 14,
    fault: 2,
    person: "孙丽",
    tel: 15987654321,
  },
];
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation));
//新增站点接口
mock.mock("https://www.demo.com/addStation", "post", (options: any) => {
  const newStation = JSON.parse(options.body);
  chargingStation.unshift(newStation);
  return {
    code: 200,
    message: "新增成功",
    success: true,
  };
});
//编辑站点接口（id、status、now不可修改）
mock.mock("https://www.demo.com/editStation", "post", (options: any) => {
  const editedData = JSON.parse(options.body);
  const index = chargingStation.findIndex((item) => item.id === editedData.id);
  if (index !== -1) {
    chargingStation[index] = {
      ...chargingStation[index],
      name: editedData.name,
      city: editedData.city,
      person: editedData.person,
      tel: editedData.tel,
      fast: editedData.fast,
      slow: editedData.slow,
      fault: editedData.fault,
    };
    return { code: 200, message: "编辑成功", success: true };
  }
  return { code: 404, message: "站点不存在", success: false };
});
//删除站点接口
mock.mock("https://www.demo.com/deleteStation", "post", (options: any) => {
  const { id } = JSON.parse(options.body);
  const index = chargingStation.findIndex((item) => item.id === id);
  if (index !== -1) {
    chargingStation.splice(index, 1);
    return { code: 200, message: "删除成功", success: true };
  }
  return { code: 404, message: "站点不存在", success: false };
});
//获取站点列表接口
mock.mock("https://www.demo.com/stationList", "post", (options: any) => {
  chargingStation = originalChargingStation;
  const { id, name, status, page, pageSize } = options.body
    ? JSON.parse(options.body)
    : {};

  if (id) {
    chargingStation = chargingStation.filter((item) => item.id === id);
  }
  if (name) {
    chargingStation = chargingStation.filter((item) =>
      item.name.includes(name),
    );
  }
  if (status != 1) {
    chargingStation = chargingStation.filter((item) => item.status === status);
  }

  const total = chargingStation.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation.slice(start, start + pageSize);
  return {
    code: 200,
    success: true,
    data: {
      list: paginatedItems,
      total,
    },
  };
});
