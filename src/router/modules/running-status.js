/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const runningStatusRouter = {
  path: '/status',
  component: Layout,
  redirect: 'noRedirect',
  name: 'RunningStatus',
  meta: {
    title: 'status',
    icon: 'chart'
  },
  children: [
    {
      path: 'runningStatus',
      component: () => import('@/views/running-status/runningStatus'),
      name: 'RunningStatus',
      meta: { title: 'runningStatus', noCache: true }
    },
    {
      path: 'errorLog',
      component: () => import('@/views/running-status/errorLog'),
      name: 'ErrorLog',
      meta: { title: 'errorLog', noCache: true }
    }
  ]
}

export default runningStatusRouter
