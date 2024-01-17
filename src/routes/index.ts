import { lazy } from 'react';
import ECommerce from '../pages/Dashboard/ECommerce';

// const Calendar = lazy(() => import('../pages/Calendar'));
// const Chart = lazy(() => import('../pages/Chart'));
// const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
// const Profile = lazy(() => import('../pages/Profile'));
// const Settings = lazy(() => import('../pages/Settings'));
// const Tables = lazy(() => import('../pages/Tables'));
// const Report = lazy(() => import('../pages/Report'));
import Calendar from '../pages/Calendar';
import Chart from '../pages/Chart';
import FormLayout from '../pages/Form/FormLayout';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Tables from '../pages/Tables';
import Report from '../pages/Report';
import Analysis from '../pages/Analysis';
import Simulation from '../pages/Simulation';

const coreRoutes = [
  {
    path: '/',
    title: 'ECommerce',
    component: ECommerce,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    title: "/report",
    path: "Report",
    component: Report,
  },
  {
    path: "/analysis",
    title: "Analysis",
    component: Analysis,
  },
  {
    path: "/simulation",
    title: "Simulation",
    component: Simulation,
  }
];

const routes = [...coreRoutes];
export default routes;
