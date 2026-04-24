import { loginApi } from '@/api/user'
import { defineStore } from 'pinia'

interface LoginParams {
  username:string
  password:string
}

export const useUserStore = defineStore('user', {
  state:() => ({
    token: null,
    rolus: [],
    usename: '',
    menu: []
  }),
  actions:{
    async login(data:LoginParams) {
      const res = await loginApi(data)
      console.log(res)
      
      this.token = res.data.token
      this.rolus = res.data.user.roles
      this.usename = res.data.user.username
      this.menu = res.data.user.menulist
    }
  }
  }
)