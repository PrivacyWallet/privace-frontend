
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      breadcrumb: [
        { name: '/' }
      ]
    },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          breadcrumb: [
            { name: 'Index' }
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
