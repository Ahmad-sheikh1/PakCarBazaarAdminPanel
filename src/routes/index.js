// All components mapping with path for internal routes

import { lazy } from 'react'
import { PersonalUserDetailPage } from '../pages/protected/UserDetailPage'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const UserDetailPage = lazy(() => import('../pages/protected/UserDetailPage'))
const ServicesApproval = lazy(() => import('../pages/protected/ServicesApproval'))
const WorkshopApproval = lazy(() => import('../pages/protected/WorkshopApprov'))
const CompaniesApproval = lazy(() => import('../pages/protected/CompaniesApproval'))
const CarInspectionRequests = lazy(() => import("../pages/protected/CarInspectionRequests"))
const UpdateUser = lazy(() => import("../pages/protected/EditMode"))
const PerUserDetailPage = lazy(() => import("../pages/protected/PerDetailPage"))
const ServicePage = lazy(() => import("../pages/protected/BecomeOurPartner"));
const SellCar = lazy(() => import("../pages/protected/SellCar"));

const routes = [
  {
    path : '/SellCar',
    component : SellCar
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  }, {
    path: '/BecomeOurPartner',
    component: ServicePage
  },
  {
    path: '/CarInspectionRequests',
    component: CarInspectionRequests
  }, {
    path: '/perdetailpage/:id',
    component: PerUserDetailPage
  },
  {
    path: '/update/user/:id',
    component: UpdateUser
  },
  {
    path: '/user/:id',
    component: UserDetailPage
  },
  
  {
    path: '/workshop',
    component: WorkshopApproval,
  },
  {
    path: '/services',
    component: ServicesApproval,
  },
  {
    path: '/companies',
    component: CompaniesApproval,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes;
