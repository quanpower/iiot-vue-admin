import request from '@/utils/flicket_request'

export function fetchUsers() {
  return request({
    url: '/users/',
    method: 'get',
    params: {}
  })
}

export function fetchCategories() {
  return request({
    url: '/categories/',
    method: 'get',
    params: {}
  })
}

export function fetchDepartments(page, per_page) {
  return request({
    url: '/departments/',
    method: 'get',
    params: { page, per_page }
  })
}

export function fetchTickets() {
  return request({
    url: '/tickets/',
    method: 'get',
    params: { }
  })
}

export function fetchStatuses() {
  return request({
    url: '/statuses/',
    method: 'get',
    params: { }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}


export function addDepartment(data) {
  return request({
    url: '/addDepartment/',
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
