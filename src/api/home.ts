import request from '@/utils/request'

/**
 * 业务通知
 * @param data
 */
export function getNotice(data: any = {}) {
  return request({
    url: 'admin/Index/getNotice',
    method: 'post',
    data,
  })
}

/**
 * 业务通知
 * @param data
 */
export function getIndexData(data: any = {}) {
  return request({
    url: 'admin/index/index',
    method: 'get',
    data,
  })
}
