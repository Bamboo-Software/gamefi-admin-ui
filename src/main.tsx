import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";
import { store } from "./stores/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./providers/theme/ThemeProvider";
import LoadingPage from "./pages/LoadingPage";

const App = lazy(() => import("./App"));
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* <I18nProvider> */}
        <Provider store={store}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Suspense fallback={<LoadingPage/>}>
              <App />
              <Toaster position="top-right" richColors expand={true} duration={3000}/>
            </Suspense>
          </ThemeProvider>
        </Provider>
      {/* </I18nProvider> */}
    </ErrorBoundary>
   </StrictMode>
)
