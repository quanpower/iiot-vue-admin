import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const FlicketKey = 'Flicket-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getFlicketToken() {
  return Cookies.get(FlicketKey)
}

export function setFlicketToken(token) {
  return Cookies.set(FlicketKey, token)
}

export function removeFlicketToken() {
  return Cookies.remove(FlicketKey)
}

