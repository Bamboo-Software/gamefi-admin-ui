import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { authApi } from '@/services/auth';

import authReducer ,{ namespace as authNamespace } from './auth/authSlice';
import themeReducer, { namespace as themeNamespace } from './theme/themeSlice';

import { conversationsApi } from '@/services/conversations';
import { userApi } from '@/services/users';
import { taskApi } from '@/services/tasks';
import { gameApi } from '@/services/games';

export const listenerMiddleware = createListenerMiddleware({
  onError: () => console.error('An error listener middleware occurred'),
});


const reducer = {
  [authNamespace]: authReducer,
  [themeNamespace]: themeReducer,
  [conversationsApi.reducerPath]: conversationsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(
      authApi.middleware,
      conversationsApi.middleware,
      userApi.middleware,
      taskApi.middleware,
      gameApi.middleware,
    )
    .prepend(listenerMiddleware.middleware)
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>()

