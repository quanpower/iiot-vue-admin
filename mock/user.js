import axios from 'axios'

// http --auth "admin":"caojing1010" POST http://127.0.0.1:6688/flicket-api/tokens

async function fetchFlicketToken() {
  await axios({
    method: 'post',
    url: 'http://127.0.0.1:6688/flicket-api/tokens',
    auth: {
      username: 'admin',
      password: 'caojing1010'
    }
      })
      // .then(result=> {
      //   // console.log('result.data:', result.data);
      //   console.log('----result.data.token-----:', result.data);
      //   console.log('-----111111------');

      //   return result.data;
      // })
      .then(res => {
        console.log('----res.data:-----', res.data.token);
        return res.data.token;
      })
      .catch(error=> {
       console.log(error);
      });
}


// function fetchFlicketToken() {
//     axios.post('http://127.0.0.1:6688/flicket-api/tokens', {
//         firstName: 'Fred',
//         lastName: 'Flintstone'
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// }

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    flicketToken: fetchFlicketToken()
    // flicketToken: 'k7Wyzsq0D2Yql+LneRd1GChyGE7VGDFQ'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    flicketToken: 'mK23K5HwD/q82YIuUXQVNuO7GUa87hlE'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        // data: {token:token,flicketToken:flicketToken}
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      console.log('----token-----:', token)

      const info = users[token]
      console.log('---info----:', info)

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
