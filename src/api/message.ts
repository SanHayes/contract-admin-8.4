import request from '@/utils/request'

/**
 * 站内信
 * @param data
 */
export function getMessageList(data: any = {}) {
  return request({
    url: 'admin/message/lists',
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
