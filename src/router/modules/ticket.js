/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ticketRouter = {
  path: '/ticket',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Equipment',
  meta: {
    title: 'ticket',
    icon: 'chart'
  },
  children: [
    {
      path: 'categories',
      component: () => import('@/views/ticket/categories'),
      name: 'Categories',
      meta: { title: 'categories', noCache: true }
    },
    {
      path: 'departments',
      component: () => import('@/views/ticket/departments'),
      name: 'Departments',
      meta: { title: 'departments', noCache: true }
    },
    {
      path: 'tickets',
      component: () => import('@/views/ticket/tickets'),
      name: 'Tickets',
      meta: { title: 'tickets', noCache: true }
    },
    {
      path: 'statuses',
      component: () => import('@/views/ticket/statuses'),
      name: 'Statuses',
      meta: { title: 'statuses', noCache: true }
    }

  ]
}

export default ticketRouter
