import request from '@/utils/request'

/**
 * 列表
 * @param data
 */
export function getNoticeList(data: any = {}) {
  return request({
    url: 'admin/help/lists',
    method: 'post',
    data,
  })
}

/**
 * 创建/保存
 * @param data
 */
export function saveNotice(data: any = {}) {
  return request({
    url: 'admin/help/edit',
    method: 'post',
    data,
  })
}

/**
 * 删除
 * @param data
 */
export function deleteNotice(data: any = {}) {
  return request({
    url: 'admin/help/delete',
    method: 'post',
    data,
  })
}

/**
 * 切换状态
 * @param data
 */
export function switchNotice(data: any = {}) {
  return request({
    url: 'admin/help/switch',
    method: 'post',
    data,
  })
}
