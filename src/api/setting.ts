import request from '@/utils/request'

export function getSettingLists(data: any = {}) {
  return request({
    url: 'admin/Setting/lists',
    method: 'post',
    data,
  })
}

export function editSetting(data: any = {}) {
  return request({
    url: 'admin/Setting/edit',
    method: 'post',
    data,
  })
}
