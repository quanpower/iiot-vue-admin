/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const equipmentRouter = {
  path: '/equipment',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Equipment',
  meta: {
    title: 'equipment',
    icon: 'chart'
  },
  children: [
    {
      path: 'productList',
      component: () => import('@/views/equipment/productList'),
      name: 'ProductList',
      meta: { title: 'productList', noCache: true }
    },
    {
      path: 'deviceList',
      component: () => import('@/views/equipment/deviceList'),
      name: 'DeviceList',
      meta: { title: 'deviceList', noCache: true }
    }
  ]
}

export default equipmentRouter
