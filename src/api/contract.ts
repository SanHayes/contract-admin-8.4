import request from '@/utils/request'

export function getContractLists(data: any = {}) {
  return request({
    url: 'admin/Contract/lists',
    method: 'post',
    data,
  })
}

export function deleteContract(data: any = {}) {
  return request({
    url: 'admin/Contract/delete',
    method: 'post',
    data,
  })
}

export function editContract(data: any = {}) {
  return request({
    url: 'admin/Contract/edit',
    method: 'post',
    data,
  })
}

export function getSymbols(data: any = {}) {
  return request({
    url: 'admin/Contract/symbols',
    method: 'post',
    data,
  })
}

export function switchContract(data: any = {}) {
  return request({
    url: 'admin/Contract/switch',
    method: 'post',
    data,
  })
}
