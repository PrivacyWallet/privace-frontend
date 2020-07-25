const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      breadcrumb: [{ name: 'PrivacyWallet' }],
    },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          breadcrumb: [{ name: '主页' }],
        },
      },
      {
        path: 'data-buyer',
        component: () => import('pages/DataBuyer.vue'),
        meta: {
          breadcrumb: [{ name: '数据购买者' }],
        },
      },
      {
        path: 'data-owner',
        component: () => import('pages/DataOwner.vue'),
        meta: {
          breadcrumb: [{ name: '数据所有者' }],
        },
      },
      {
        path: 'calculator',
        component: () => import('pages/UploadCalculator'),
        meta: {
          breadcrumb: [{ name: '外包计算者' }],
        },
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
