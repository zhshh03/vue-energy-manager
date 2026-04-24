import mock from 'mockjs'

mock.setup({
  timeout: '200-600'
})


//管理员菜单
const menulist = [{
              name:"数据看板",
              url:"/dashboard",
              icon:"DateLine"
            },
            {
              name:"充电站管理",
              url:"/chargingstation",
              icon:"Lightning",
              children:[
                {
                  name:"充电站监控",
                  url:"/chargingstation/monitor",
                  icon:"Videocamera"
                },
                {
                  name:"营收统计",
                  url:"/chargingstation/revenue",
                  icon:"DetaAnlysis"
                },
                {
                  name:"充电站管理",
                  url:"/chargingstation/fault",
                  icon:"Warning"
                }
              ]
            },
            {
              name:"电子地图",
              url:"/map",
              icon:"MapLocation"
            },
            {
              name:"运营管理",
              url:"/operation",
              icon:"Files",
              children:[
                {
                  name:"订单管理",
                  url:"/operation/order",
                  icon:"DocumentCopy"
                },
                {
                  name:"订单详情",
                  url:"/operation/order",
                  icon:"Share"
                },
                {
                  name:"计费管理",
                  url:"/operation/total",
                  icon:"Money"
                }
              ]
            },
            {
              name:"报警管理",
              url:"/alarm",
              icon:"Phone"
            },
            {
              name:"会员卡管理",
              url:"/equipment",
              icon:"Magnet"
            },
            {
              name:"招商管理",
              url:"/document",
              icon:"Document"
            },
            {
              name:"系统设置",
              url:"/system",
              icon:"Setting"
            },
            {
              name:"个人中心",
              url:"/personal",
              icon:"User"
}]
//运营专员菜单
const menulist2 = [{
              name:"数据看板",
              url:"/dashboard",
              icon:"DateLine"
            },
            {
              name:"充电站管理",
              url:"/chargingstation",
              icon:"Lightning",
              children:[
                {
                  name:"充电站监控",
                  url:"/chargingstation/monitor",
                  icon:"Videocamera"
                },
                {
                  name:"营收统计",
                  url:"/chargingstation/revenue",
                  icon:"DetaAnlysis"
                },
                {
                  name:"充电站管理",
                  url:"/chargingstation/fault",
                  icon:"Warning"
                }
              ]
            },
            {
              name:"电子地图",
              url:"/map",
              icon:"MapLocation"
            },
            {
              name:"运营管理",
              url:"/operation",
              icon:"Files",
              children:[
                {
                  name:"订单管理",
                  url:"/operation/order",
                  icon:"DocumentCopy"
                },
                {
                  name:"订单详情",
                  url:"/operation/order",
                  icon:"Share"
                },
                {
                  name:"计费管理",
                  url:"/operation/total",
                  icon:"Money"
                }
              ]
            },
            {
              name:"报警管理",
              url:"/alarm",
              icon:"Phone"
            },
            {
              name:"会员卡管理",
              url:"/equipment",
              icon:"Magnet"
            },
            {
              name:"个人中心",
              url:"/personal",
              icon:"User"
}]
// 登录接口
mock.mock('https://www.demo.com/login','post',(options:any) => {
  const {username,password} = JSON.parse(options.body)
  if(username === 'admin' && password === 'admin666') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: "admintokenzhshh03",
        user: {
          username: "度",
          roles:["admin"],
          menulist,
        }
      }
    }
  }else if (username === 'user' && password === 'user666') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: "usertokenzhshh03",
        user: {
          username: "过度",
          roles:["user"],
          menulist:menulist2,
        }
      }
    }
  }else {
    return {
      code:401,
      message:"用户名或密码错误"
    }

  }
})