import request from '@/utils/request'

/**
 * 推荐奖励设置
 * @param data
 */
export function getLevelDividedList(data: any = {}) {
  return request({
    url: 'admin/Level/getLevelDividedList',
    method: 'post',
    data,
  })
}

/**
 * 创建/保存推荐奖励设置
 * @param data
 */
export function saveLevelDivided(data: any = {}) {
  return request({
    url: 'admin/Level/edit',
    method: 'post',
    data,
  })
}

/**
 * 删除推荐奖励设置
 * @param data
 */
export function deleteLevelDivided(data: any = {}) {
  return request({
    url: 'admin/Level/delete',
    method: 'post',
    data,
  })
}
