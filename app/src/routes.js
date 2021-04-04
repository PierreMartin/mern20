import Home from './pages/Home';
import PostAdd from './pages/PostAdd';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import User from './pages/User';
import NotFound from './pages/NotFound';

/* lazy no compatible SSR:
const Home = lazy(() => import('./pages/Home'));
const PostAdd = lazy(() => import('./pages/PostAdd'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UsersList = lazy(() => import('./pages/UsersList'));
const User = lazy(() => import('./pages/User'));
*/

export default [
    {
        path: '/',
        exact: true,
        component: Home,
        type: 'frontoffice'
    },
    {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        type: 'backoffice'
    },
    {
        path: '/users',
        exact: true,
        component: UsersList,
        type: 'backoffice'
    },
    {
        path: '/post/create',
        exact: true,
        component: PostAdd,
        type: 'backoffice'
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        type: 'frontoffice'
    },

    // No in main menu:
    {
        path: '/user/:id',
        exact: true,
        component: User,
        type: 'backoffice'
    },

    // 404 - must be at end:
    {
        component: NotFound,
        type: 'all'
    }
];
