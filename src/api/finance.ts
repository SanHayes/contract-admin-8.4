import request from '@/utils/request'

/**
 * 用户兑换记录
 * @param data
 */
export function getUserConversionList(data: any = {}) {
  return request({
    url: 'admin/Finance/getUserConversionList',
    method: 'post',
    data,
  })
}

/**
 * 审核提现
 * @param data
 */
export function auditWithdraw(data: any = {}) {
  return request({
    url: 'admin/Finance/audit',
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
    url: 'admin/Finance/getCollectionList',
    method: 'post',
    data,
  })
}

/**
 * 用户提现记录
 * @param data
 */
export function getUserWithdrawalList(data: any = {}) {
  return request({
    url: 'admin/Finance/getUserWithdrawalList',
    method: 'post',
    data,
  })
}
