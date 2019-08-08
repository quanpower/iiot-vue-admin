/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    },
    {
      path: 'xbar-r',
      component: () => import('@/views/charts/xbar-r'),
      name: 'Xbar-R',
      meta: { title: 'Xbar-R Chart', noCache: true }
    },
    {
      path: 'normal-distribution',
      component: () => import('@/views/charts/normal-distribution'),
      name: 'Normal Distribution',
      meta: { title: 'Normal Distribution', noCache: true }
    },
    {
      path: 'spc-box',
      component: () => import('@/views/charts/spc-box'),
      name: 'SPC Box',
      meta: { title: 'SPC Box', noCache: true }
    },
    // {
    //   path: 'spc-line',
    //   component: () => import('@/views/charts/spc-line'),
    //   name: 'SPC Line',
    //   meta: { title: 'SPC Line', noCache: true }
    // },
    {
      path: 'fpy',
      component: () => import('@/views/charts/fpy'),
      name: 'FPY',
      meta: { title: 'FPY', noCache: true }
    },
    {
      path: 'rty',
      component: () => import('@/views/charts/rty'),
      name: 'RTY',
      meta: { title: 'RTY', noCache: true }
    }
  ]
}

export default chartsRouter
