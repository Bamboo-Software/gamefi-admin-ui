import { createBrowserRouter, 
  Navigate, 
  RouterProvider, 
  useLocation
} from 'react-router-dom';
import { routesPaths } from './constants/routes';
import ErrorPage from '@/pages/ErrorPage';
import PageLayout from './layouts/PageLayout';
import AuthPage from './pages/auth';
import AuthLayout from './layouts/AuthLayout';
import Overview from './pages/overview';
import LoadingPage from './pages/LoadingPage';
import { useRef } from 'react';
import { useGetMeQuery, useLazyGetMeQuery } from './services/auth';
// import Tasks from './pages/tasks';
import Analytic from './pages/analytic';
import Users from './pages/users';
import Settings from './pages/settings';
import Help from './pages/help';
import Calendar from './pages/calendar';
import Tasks from './pages/tasks';
import Games from './pages/games';

const {
  ROOT,
  AUTH, 
  CALENDAR,
  TASKS,
  ANALYTIC,
  USERS,
  SETTINGS,
  HELP,
  GAMES
} = routesPaths;

const PrivateRoute = ({ children }: {children: React.ReactNode}) => {
  const token = localStorage.getItem('auth-token');

  const { error, isLoading } = useGetMeQuery({});
  
  if (isLoading) {
    return <LoadingPage/>;
  }
  if (!token || (error && 'status' in error && error.status === 401)) {
    localStorage.removeItem('auth-token');
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('auth-token');
  const location = useLocation();
  const [getMe, { isLoading, error }] = useLazyGetMeQuery();
  const isGetMeCalled = useRef(false);

  if (token && !isGetMeCalled.current) {
    getMe({});
    isGetMeCalled.current = true;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (location.pathname === '/auth/callback') {
    return children;
  }

  if (token && !(error && 'status' in error && error.status === 401)) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const routes = createBrowserRouter([

  {
    path: ROOT,
    element:
    <PrivateRoute>
      <PageLayout/>
      </PrivateRoute>
      ,
    children: [
      { index: true, element: <Overview /> },
      { path: TASKS, element: <Tasks /> },
      { path: GAMES, element: <Games /> },
      { path: CALENDAR, element: <Calendar/> },
      { path: ANALYTIC, element: <Analytic/> },
      { path: USERS, element: <Users/> },
      { path: SETTINGS, element: <Settings/> },
      { path: HELP, element: <Help/> },
    ],
  },
  {
    path: AUTH,
    element:
    <PublicRoute>
      <AuthLayout/>
      </PublicRoute>
      ,
    children: [
      { index: true, element: <AuthPage /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);


function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App;
