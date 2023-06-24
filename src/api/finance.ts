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
 * 用户提现记录
 * @param data
 */
export function getUserWithdrawList(data: any = {}) {
  return request({
    url: 'admin/finance/userWithdraw',
    method: 'post',
    data,
  })
}


/**
 * 审核
 * @param data
 */
export function statusUserExchange(data: any = {}) {
  return request({
    url: 'admin/finance/userStatus',
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
