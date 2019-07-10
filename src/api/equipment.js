import request from '@/utils/daq_request'

export function fetchDeviceList(query) {
  return request({
    url: '/devices',
    method: 'get',
    params: query
  })
}

export function fetchDeviceRunningStatus() {
  return request({
    url: '/device/running_status/4',
    method: 'get',
    params: { }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
