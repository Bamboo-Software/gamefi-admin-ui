import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { routesPaths } from "./constants/routes";
import ErrorPage from "@/pages/ErrorPage";
import PageLayout from "./layouts/PageLayout";
import AuthPage from "./pages/auth";
import AuthLayout from "./layouts/AuthLayout";
import Overview from "./pages/overview";
import LoadingPage from "./pages/LoadingPage";
import { useEffect, useRef } from "react";
import {  useLazyGetMeQuery } from "./services/auth";
// import Tasks from './pages/tasks';
import Analytic from "./pages/analytic";
import Users from "./pages/users";
import Settings from "./pages/settings";
import Help from "./pages/help";
import Calendar from "./pages/calendar";
import Tasks from "./pages/tasks";
import Games from "./pages/games";
import Chats from "./pages/chat";
import AiGenOverview from "./pages/ai-gen/overview";
import AiGenAnalytic from "./pages/ai-gen/analytic";
import AiGenSettings from "./pages/ai-gen/settings";
import AiGenHelp from "./pages/ai-gen/help";
import AiGenPageLayout from "./pages/ai-gen/layout";
import AiGenUsers from "./pages/ai-gen/ai-generator";
import AiGenTemplates from "./pages/ai-gen/templates";
import AiGenHistory from "./pages/ai-gen/history";
import AiGenModelStyle from "./pages/ai-gen/model-style";
import Seasons from './pages/seasons';

const {
  ROOT,
  AUTH,
  CALENDAR,
  TASKS,
  ANALYTIC,
  USERS,
  SETTINGS,
  HELP,
  GAMES,
  CHAT,
  AI_GEN_OVERVIEW,
  AI_GEN_ANALYTIC,
  AI_GEN_USERS,
  AI_GEN_TEMPLATES,
  AI_GEN_HISTORY,
  AI_GEN_MODEL_STYLE,
  AI_GEN_SETTINGS,
  AI_GEN_HELP,
  SEASONS
} = routesPaths;

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("auth-token");
  const [triggerGetMe, { error, isLoading }] = useLazyGetMeQuery();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (token && !hasCalled.current) {
      triggerGetMe({});
      hasCalled.current = true;
    }
  }, [token,triggerGetMe]);

  if (isLoading) return <LoadingPage />;
  if (!token || (error && "status" in error && error.status === 401)) {
    localStorage.removeItem("auth-token");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("auth-token");
  const location = useLocation();
  const [getMe, { isLoading, error }] = useLazyGetMeQuery();
  const isGetMeCalled = useRef(false);

  console.log("getMe", getMe);

  if (token && !isGetMeCalled.current) {
    getMe({});
    isGetMeCalled.current = true;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (location.pathname === "/auth/callback") {
    return children;
  }

  if (token && !(error && "status" in error && error.status === 401)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const routes = createBrowserRouter([
  {
    path: ROOT,
    element: (
      <PrivateRoute>
        <PageLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: TASKS, element: <Tasks /> },
      { path: GAMES, element: <Games /> },
      { path: SEASONS, element: <Seasons /> },
      { path: CALENDAR, element: <Calendar /> },
      { path: ANALYTIC, element: <Analytic /> },
      { path: USERS, element: <Users /> },
      { path: SETTINGS, element: <Settings /> },
      { path: HELP, element: <Help /> },
      { path: CHAT, element: <Chats /> },
    ],
  },
  {
    path: AUTH,
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [{ index: true, element: <AuthPage /> }],
  },
  {
    path: AI_GEN_OVERVIEW,
    element: (
      // <PublicRoute>
        <AiGenPageLayout />
      // </PublicRoute>
    ),
    children: [
      { index: true, element: <AiGenOverview /> },
      { path: AI_GEN_ANALYTIC, element: <AiGenAnalytic /> },
      { path: AI_GEN_USERS, element: <AiGenUsers /> },
      { path: AI_GEN_TEMPLATES, element: <AiGenTemplates /> },
      { path: AI_GEN_HISTORY, element: <AiGenHistory /> },
      { path: AI_GEN_MODEL_STYLE, element: <AiGenModelStyle /> },
      { path: AI_GEN_SETTINGS, element: <AiGenSettings /> },
      { path: AI_GEN_HELP, element: <AiGenHelp /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
