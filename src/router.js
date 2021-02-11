import { createWebHashHistory, createRouter } from "vue-router";

import PageWrapper from './PageWrapper';

/**
 * Login
 */
import Login from "./pages/Login";

/**
 * Dashboard
 */
import Dashboard from "./pages/dashboard/Dashboard";

/**
 * Users
 */
import Users from "./pages/users/Users";
import UsersList from "./pages/users/List";
import UserNew from './pages/users/New';
import UserEdit from './pages/users/Edit';

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },  
  {
    path: "/",
    name: "Dashboard",
    component: PageWrapper,
    props: {pageComponent: Dashboard}, 
  },
  {
    path: "/users",
    name: "Users",
    component: PageWrapper,
    props: {pageComponent: Users},     
    children: [
      {
        path: '',
        name: 'UsersList',
        component: UsersList
      },
      {
        path: 'new',
        name: 'NewUser',
        component: UserNew
      },
      {
        path: 'user/:id',
        name: 'ShowUser',
        component: UserEdit
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;