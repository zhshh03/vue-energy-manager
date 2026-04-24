import {post} from '@/utils/http'

const Api = {
  Login: '/login'
} as const

interface LoginParams {
  username:string
  password:string
}

export const loginApi = (data:LoginParams):Promise<any> => {
  return post(Api.Login,data)
}