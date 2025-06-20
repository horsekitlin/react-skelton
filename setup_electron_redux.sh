#!/bin/bash

# Redux Store 和 Saga 設置腳本
# 建立完整的狀態管理架構

PROJ_NAME=$1

echo "🏪 設置 Redux Store 和 Sagas..."

cd src

# 建立 types/index.ts
cat > types/index.ts << 'EOF'
// 應用程式狀態類型定義
export interface RootState {
  counter: CounterState;
  app: AppState;
}

// Counter 狀態
export interface CounterState {
  value: number;
  loading: boolean;
}

// App 狀態
export interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// 用戶類型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// API 回應類型
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// API 錯誤類型
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
EOF

# 建立 store/index.ts
cat > store/index.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

// 建立 saga middleware
const sagaMiddleware = createSagaMiddleware();

// 配置 store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// 運行 root saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
EOF

# 建立 reducers/index.ts
cat > reducers/index.ts << 'EOF'
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import appReducer from './appReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
EOF

# 建立 reducers/counterReducer.ts
cat > reducers/counterReducer.ts << 'EOF'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '../types';

const initialState: CounterState = {
  value: 0,
  loading: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setLoading,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
EOF

# 建立 reducers/appReducer.ts
cat > reducers/appReducer.ts << 'EOF'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, User } from '../types';

const initialState: AppState = {
  theme: 'light',
  sidebarOpen: false,
  user: null,
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setUser,
  setLoading,
  setError,
  clearError,
} = appSlice.actions;

export default appSlice.reducer;
EOF

# 建立 actions/index.ts
cat > actions/index.ts << 'EOF'
// Saga actions
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

// Action creators
export const fetchUserRequest = (userId: string) => ({
  type: FETCH_USER_REQUEST,
  payload: { userId },
});

export const fetchUserSuccess = (user: any) => ({
  type: FETCH_USER_SUCCESS,
  payload: { user },
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});

export const incrementAsync = () => ({
  type: INCREMENT_ASYNC,
});

export const decrementAsync = () => ({
  type: DECREMENT_ASYNC,
});
EOF

# 建立 sagas/index.ts
cat > sagas/index.ts << 'EOF'
import { all, fork } from 'redux-saga/effects';
import { counterSaga } from './counterSaga';
import { appSaga } from './appSaga';

export function* rootSaga() {
  yield all([
    fork(counterSaga),
    fork(appSaga),
  ]);
}
EOF

# 建立 sagas/counterSaga.ts
cat > sagas/counterSaga.ts << 'EOF'
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { INCREMENT_ASYNC, DECREMENT_ASYNC } from '../actions';
import { increment, decrement, setLoading } from '../reducers/counterReducer';

function* incrementAsyncSaga() {
  try {
    yield put(setLoading(true));
    yield delay(1000); // 模擬異步操作
    yield put(increment());
  } finally {
    yield put(setLoading(false));
  }
}

function* decrementAsyncSaga() {
  try {
    yield put(setLoading(true));
    yield delay(1000); // 模擬異步操作
    yield put(decrement());
  } finally {
    yield put(setLoading(false));
  }
}

export function* counterSaga() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
  yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}
EOF

# 建立 sagas/appSaga.ts
cat > sagas/appSaga.ts << 'EOF'
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  FETCH_USER_REQUEST, 
  FETCH_USER_SUCCESS, 
  FETCH_USER_FAILURE 
} from '../actions';
import { setUser, setLoading, setError } from '../reducers/appReducer';
import { userService } from '../services/userService';
import { User } from '../types';

function* fetchUserSaga(action: PayloadAction<{ userId: string }>) {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    
    const user: User = yield call(userService.fetchUserFromApi, action.payload.userId);
    yield put(setUser(user));
    yield put({ type: FETCH_USER_SUCCESS, payload: { user } });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '獲取用戶資料失敗';
    yield put(setError(errorMessage));
    yield put({ type: FETCH_USER_FAILURE, payload: { error: errorMessage } });
  } finally {
    yield put(setLoading(false));
  }
}

export function* appSaga() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}
EOF

echo "✅ Redux Store 和 Sagas 設置完成:"
echo "   🏪 Store 配置完成"
echo "   📊 Counter 和 App reducers"
echo "   🔄 Async sagas"
echo "   🎯 Action creators"
echo "   📝 TypeScript 類型定義"

cd - > /dev/null 