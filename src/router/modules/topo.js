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
      path: 'handsome',
      component: () => import('@/views/topo/handsome'),
      name: 'handsome',
      meta: { title: 'handsome', noCache: true }
    },{
      path: 'fabline',
      component: () => import('@/views/topo/fabline'),
      name: 'fabline',
      meta: { title: 'fabline', noCache: true }
    },{
      path: 'customize',
      component: () => import('@/views/topo/customize'),
      name: 'customize',
      meta: { title: 'customize', noCache: true }
    },{
    },{
      path: 'tree',
      component: () => import('@/views/topo/tree'),
      name: 'tree',
      meta: { title: 'tree', noCache: true }
    },
  ]
}

export default topoRouter
