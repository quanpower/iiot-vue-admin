/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const konvaRouter = {
  path: '/konva',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Konva',
  meta: {
    title: 'konva',
    icon: 'chart'
  },
  children: [
    {
      path: 'handsome',
      component: () => import('@/views/konva/handsome'),
      name: 'handsome',
      meta: { title: 'handsome', noCache: true }
    },
  ]
}

export default konvaRouter
