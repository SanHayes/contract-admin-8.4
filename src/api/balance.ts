import request from '@/utils/request'

/**
 * 资产变动记录
 * @param data
 */
export function getBalanceList(data: any = {}) {
  return request({
    url: 'admin/balance/list',
    method: 'post',
    data,
  })
}
