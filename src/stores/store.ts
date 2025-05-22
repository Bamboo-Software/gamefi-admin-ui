import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { authApi } from '@/services/auth';

import authReducer ,{ namespace as authNamespace } from './auth/authSlice';
import themeReducer, { namespace as themeNamespace } from './theme/themeSlice';

// import { taskApi } from '@/services/tasks';
// import { gameApi } from '@/services/games';
import { dashboardApi } from '@/services/dashboard';
// import { chatApi } from '@/services/chats';
import { uploadApi } from '@/services/upload';
import { baseApi } from '@/services/baseApi';

export const listenerMiddleware = createListenerMiddleware({
  onError: () => console.error('An error listener middleware occurred'),
});


const reducer = {
  [authNamespace]: authReducer,
  [themeNamespace]: themeReducer,
  [authApi.reducerPath]: authApi.reducer,
  // [userApi.reducerPath]: userApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  // [taskApi.reducerPath]: taskApi.reducer,
  // [gameApi.reducerPath]: gameApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  // [chatApi.reducerPath]: chatApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(
      authApi.middleware,
      baseApi.middleware,
      // userApi.middleware,
      // taskApi.middleware,
      // gameApi.middleware,
      dashboardApi.middleware,
      // chatApi.middleware,
      uploadApi.middleware,
    )
    .prepend(listenerMiddleware.middleware)
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>()

