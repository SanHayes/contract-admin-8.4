import request from '@/utils/request'

/**
 * 管理员登录日志
 * @param data
 */
export function getStakeList(data: any = {}) {
  return request({
    url: 'admin/Stake/lists',
    method: 'post',
    data,
  })
}
