import request from '@/utils/request'

export function getAddressLists(data: any = {}) {
  return request({
    url: 'admin/Address/lists',
    method: 'post',
    data,
  })
}

export function deleteAddress(data: any = {}) {
  return request({
    url: 'admin/Address/delete',
    method: 'post',
    data,
  })
}

export function editAddress(data: any = {}) {
  return request({
    url: 'admin/Address/edit',
    method: 'post',
    data,
  })
}
