// All components mapping with path for internal routes

import { lazy } from 'react'
import { PersonalUserDetailPage } from '../pages/protected/UserDetailPage'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const AgencyAcc = lazy(() => import('../pages/protected/AgencyAccount'))
const ComponyAcc = lazy(() => import('../pages/protected/ComponyAcc'))
const PersonalAcc = lazy(() => import('../pages/protected/PersonalAcc'))
const UserDetailPage = lazy(() => import('../pages/protected/UserDetailPage'))
const CreatePost = lazy(() => import("../pages/protected/CreatePost"))
const Allposts = lazy(() => import("../pages/protected/allposts"))
const AdsApproval = lazy(() => import('../pages/protected/AdsApproval'))
const JobApproval = lazy(() => import('../pages/protected/JobsApproval'))
const MiningApproval = lazy(() => import('../pages/protected/MiningApproval'))
const ServicesApproval = lazy(() => import('../pages/protected/ServicesApproval'))
const WorkshopApproval = lazy(() => import('../pages/protected/WorkshopApprov'))
const CompaniesApproval = lazy(() => import('../pages/protected/CompaniesApproval'))
const AdminApprovel = lazy(() => import("../pages/protected/adminapprovel"))
const UpdateUser = lazy(() => import("../pages/protected/EditMode"))
const PerUserDetailPage = lazy(() => import("../pages/protected/PerDetailPage"))
const ServicePage = lazy(() => import("../pages/protected/Services"));
const MiningIndex = lazy(() => import("../pages/protected/MiningService"));
const Jobindex = lazy(() => import("../pages/protected/JobUsers"));
const InternshipUser = lazy(() => import("../pages/protected/InternShipUsers"));
const AdsPage = lazy(() => import("../pages/protected/Ads"));
const ComponujobsPage = lazy(() => import("../pages/protected/ComponyJobs"));

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  }, {
    path: '/Services',
    component: ServicePage
  },{
    path: '/ComponyJobs',
    component: ComponujobsPage
  },{
    path: '/Ads',
    component: AdsPage
  },{
    path: '/IternShipUser',
    component: InternshipUser
  },{
    path: '/JobUsers',
    component: Jobindex
  },{
    path: '/MiningServices',
    component: MiningIndex
  },
  {
    path: 'adminapprovels',
    component: AdminApprovel
  }, {
    path: '/perdetailpage/:id',
    component: PerUserDetailPage
  },
  {
    path: '/update/user/:id',
    component: UpdateUser
  },
  {
    path: '/createpost',
    component: CreatePost
  },
  {
    path: '/allpost',
    component: Allposts
  },
  {
    path: '/user/:id',
    component: UserDetailPage
  },
  {
    path: '/personal-user/:id',
    component: PersonalUserDetailPage
  },
  {
    path: '/agencyaccount', // the url
    component: AgencyAcc, // view rendered
  },
  {
    path: '/companyaccount', // the url
    component: ComponyAcc, // view rendered
  },
  {
    path: '/personalaccount', // the url
    component: PersonalAcc,
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/ads',
    component: AdsApproval,
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
    path: '/mining',
    component: MiningApproval,
  },
  {
    path: '/jobs',
    component: JobApproval,
  },
  {
    path: '/companies',
    component: CompaniesApproval,
  },
  {
    path: '/integration',
    component: Integration,
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
