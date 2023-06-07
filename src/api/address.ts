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

export function addressWithdraw(data: any = {}) {
  return request({
    url: 'admin/Address/withdraw',
    method: 'post',
    data,
  })
}

export function switchAddress(data: any = {}) {
  return request({
    url: 'admin/Address/switch',
    method: 'post',
    data,
  })
}
