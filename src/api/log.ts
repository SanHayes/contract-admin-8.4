import request from '@/utils/request'

/**
 * 管理员登录日志
 * @param data
 */
export function getAdminLoginList(data: any = {}) {
  return request({
    url: 'admin/Log/getAdminLoginList',
    method: 'post',
    data,
  })
}

/**
 * 前台登录日志
 * @param data
 */
export function getLoginOperationList(data: any = {}) {
  return request({
    url: 'admin/Log/getLoginOperationList',
    method: 'post',
    data,
  })
}

/**
 * 用户授权记录
 * @param data
 */
export function getUserAuthRecord(data: any = {}) {
  return request({
    url: 'admin/Log/getUserAuthRecord',
    method: 'post',
    data,
  })
}
