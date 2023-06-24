import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA } from '@/config'

export async function login(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/admin/Auth/login',
    method: 'post',
    data,
  })
}

export async function socialLogin(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/Auth/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/Auth/logout',
    method: 'get',
  })
}

export function register(data: any) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

export function getUserLists(data: any = {}) {
  return request({
    url: 'admin/User/lists',
    method: 'post',
    data,
  })
}

export function deleteUser(data: any = {}) {
  return request({
    url: 'admin/User/delete',
    method: 'post',
    data,
  })
}

export function userWithdraw(data: any = {}) {
  return request({
    url: 'admin/User/withdraw',
    method: 'post',
    data,
  })
}

export function switchUser(data: any = {}) {
  return request({
    url: 'admin/User/switch',
    method: 'post',
    data,
  })
}

/**
 * 归集记录
 * @param data
 */
export function getCollectionList(data: any = {}) {
  return request({
    url: 'admin/User/getCollectionList',
    method: 'post',
    data,
  })
}
