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
