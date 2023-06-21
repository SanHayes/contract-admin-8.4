import request from '@/utils/request'

/**
 * 站内信
 * @param data
 */
export function getMessageList(data: any = {}) {
  return request({
    url: 'admin/message/list',
    method: 'post',
    data,
  })
}

/**
 * 编辑
 * @param data
 */
export function editMessage(data: any = {}) {
  return request({
    url: 'admin/message/edit',
    method: 'post',
    data,
  })
}
/**
 * 删除
 * @param data
 */
export function deleteMessage(data: any = {}) {
  return request({
    url: 'admin/message/delete',
    method: 'post',
    data,
  })
}
