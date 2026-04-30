import {post} from '@/utils/http'

const Api = {
  map: '/mapList'
} as const

export const getMapApi = () => {
  return post(Api.map)
}