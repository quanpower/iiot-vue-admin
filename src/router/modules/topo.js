/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const topoRouter = {
  path: '/topo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Topo',
  meta: {
    title: 'topo',
    icon: 'chart'
  },
  children: [
    {
      path: 'hello',
      component: () => import('@/views/topo/hello'),
      name: 'hello',
      meta: { title: 'hello', noCache: true }
    },
  ]
}

export default topoRouter
