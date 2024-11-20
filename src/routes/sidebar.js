/** Icons are imported separatly to reduce build time */
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import { BsPostcardHeartFill } from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { MdCompost, MdSettings } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrServices } from "react-icons/gr";
import { FaUserSecret } from "react-icons/fa";
import { PiUserSwitchThin } from "react-icons/pi";
import { FaBuysellads } from "react-icons/fa";
import { PiUsersFour } from "react-icons/pi";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  }, {
    path: '/app/BecomeOurPartner',
    icon: <GrServices className={iconClasses} />,
    name: "Become Our Partner"
  },
  {
    path: '/app/SellCar',
    icon: <MdOutlineMiscellaneousServices className={iconClasses} />,
    name: "Sell car"
  },
  {
    path: '/app/chatsystem',
    icon: <FaUserSecret className={iconClasses} />,
    name: "Chat System"
  },
  {
    path: '/app/AdminControl',
    icon: <PiUserSwitchThin className={iconClasses} />,
    name: "Admin Controls"
  },
  {
    path: '/app/Blogs',
    icon: <FaBuysellads className={iconClasses} />,
    name: "Blogs"
  },
  {
    path: '/app/Slider',
    icon: <PiUsersFour className={iconClasses} />,
    name: "Slider "
  },
  // {
  //   path: "/app/leads", // url
  //   icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  //   name: "Leads", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/transactions", // url
  //   icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
  //   name: "Transactions", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/charts", // url
  //   icon: <ChartBarIcon className={iconClasses} />, // icon component
  //   name: "Analytics", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/integration", // url
  //   icon: <BoltIcon className={iconClasses} />, // icon component
  //   name: "Integration", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/agencyaccount", // url
  //   icon: <HiOutlineUsers className={iconClasses} />, // icon component
  //   name: "Agency Account", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/companyaccount", // url
  //   icon: <HiOutlineUserGroup className={iconClasses} />, // icon component
  //   name: "Company Account", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/personalaccount", // url
  //   icon: <LuUser2 className={iconClasses} />, // icon component
  //   name: "Personal Account", // name that appear in Sidebar
  // },
  // {
  //   path: "",
  //   icon: <BsPostcardHeartFill className={`${iconClasses} inline`} />,
  //   name: "Posts",
  //   submenu: [
  //     {
  //       path: "/app/createpost",
  //       icon: <MdCompost className={submenuIconClasses} />,
  //       name: "Create Post",
  //     },
  //     {
  //       path: "/app/allpost",
  //       icon: <MdDoneAll className={submenuIconClasses} />,
  //       name: "All Posts",
  //     },
  //   ],
  // },
  {
    path: '/app/CarInspectionRequests',
    icon: <GrUserAdmin className={iconClasses} />,
    name: "Car Inspection Requests"
  },
  // {
  //   path: '/app/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses} />, // icon component
  //   name: "Calendar", // name that appear in Sidebar
  // },


  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Approvals", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/ads",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Ads",
  //     },
  //     {
  //       path: "/app/jobs", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Jobs", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/services",
  //       icon: <KeyIcon className={submenuIconClasses} />,
  //       name: "Services",
  //     },
  //     {
  //       path: "/app/mining",
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: "Mining Locations",
  //     },
  //     {
  //       path: "/app/companies",
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: "Companies",
  //     },
  //     {
  //       path: "/app/workshop",
  //       icon: <MdSettings className={submenuIconClasses} />,
  //       name: "Workshops",
  //     },
  //     {
  //       path: "/app/404",
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: "404",
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Settings", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/settings-profile", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Profile", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/settings-billing",
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: "Billing",
  //     },
  //     {
  //       path: "/app/settings-team", // url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: "Team Members", // name that appear in Sidebar
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Approvals", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/ads",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Ads",
  //     },
  //     {
  //       path: "/app/jobs", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Jobs", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/services",
  //       icon: <KeyIcon className={submenuIconClasses} />,
  //       name: "Services",
  //     },
  //     {
  //       path: "/app/mining",
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: "Mining Locations",
  //     },
  //     {
  //       path: "/app/companies",
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: "Companies",
  //     },
  //     {
  //       path: "/app/workshop",
  //       icon: <MdSettings className={submenuIconClasses} />,
  //       name: "Workshops",
  //     },
  //     {
  //       path: "/app/404",
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: "404",
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Settings", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/settings-profile", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Profile", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/settings-billing",
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: "Billing",
  //     },
  //     {
  //       path: "/app/settings-team", // url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: "Team Members", // name that appear in Sidebar
  //     },
  //   ],
  // },
  // >>>>>>> dbeca8a0529ced49460433faca357fe32ef189c9
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Documentation", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/getting-started", // url
  //       icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
  //       name: "Getting Started", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/features",
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: "Features",
  //     },
  //     {
  //       path: "/app/components",
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: "Components",
  //     },
  //   ],
  // },
];

export default routes;
