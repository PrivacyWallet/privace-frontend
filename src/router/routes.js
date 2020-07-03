
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      breadcrumb: [
        { name: 'Privace' }
      ]
    },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          breadcrumb: [
            { name: 'Home' }
          ]
        }
      },
      {
        path: 'data-buyer',
        component: () => import('pages/DataBuyer.vue'),
        meta: {
          breadcrumb: [
            { name: 'Data Buyer' }
          ]
        }
      },
      {
        path: 'data-owner',
        component: () => import('pages/DataOwner.vue'),
        meta: {
          breadcrumb: [
            { name: 'Data Owner' }
          ]
        }
      }
    ]
  },
  {
    path: '/anonymous',
    component: () => import('layouts/Unlogin.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Login.vue')
      }
    ]

  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
