import request from '@/utils/request'

/**
 * 白皮书列表
 * @param data
 */
export function getWhitePaperList(data: any = {}) {
  return request({
    url: 'admin/Paper/getWhitePaperList',
    method: 'post',
    data,
  })
}

/**
 * 创建/保存
 * @param data
 */
export function saveWhitePaper(data: any = {}) {
  return request({
    url: 'admin/Paper/edit',
    method: 'post',
    data,
  })
}

/**
 * 删除
 * @param data
 */
export function deleteWhitePaper(data: any = {}) {
  return request({
    url: 'admin/Paper/delete',
    method: 'post',
    data,
  })
}
