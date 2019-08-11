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


// http --auth "admin":"caojing1010" POST http://127.0.0.1:6688/flicket-api/tokens


// axios.post('/user', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


// axios({
//       method: 'post',
//       url: 'http://127.0.0.1:6688/flicket-api/tokens',
//       auth: {
//         username: 'admin',
//         password: 'caojing1010'
//       }
//         }).then(result=>{
//           console.log(result.data);
//         })
//         .catch(error=>{
//         	cosole.log(error);
//         });