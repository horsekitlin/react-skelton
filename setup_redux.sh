#!/bin/bash

# Redux-Saga 設置腳本
# 建立完整的 Redux-Saga 架構

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    exit 1
fi

cd $PROJ_NAME

echo "🔄 建立 Redux-Saga 架構..."

# 1. Actions
echo "📝 建立 Actions..."
cat > src/actions/authActions.ts << 'EOF'
// 認證相關 Actions - 遵循 SRP 原則，只負責 Action 創建

import {
  AuthActionTypes,
  LoginRequestAction,
  LoginSuccessAction,
  LoginErrorAction,
  LogoutRequestAction,
  LogoutSuccessAction,
  CheckAuthSuccessAction,
  CheckAuthErrorAction,
  UpdateUserAction,
} from '../types/redux'
import type { LoginCredentials, User } from '../types'

// 登入請求 Action
export const loginRequest = (credentials: LoginCredentials): LoginRequestAction => ({
  type: AuthActionTypes.LOGIN_REQUEST,
  payload: credentials,
})

// 登入成功 Action
export const loginSuccess = (user: User, token: string): LoginSuccessAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: { user, token },
})

// 登入失敗 Action
export const loginError = (message: string): LoginErrorAction => ({
  type: AuthActionTypes.LOGIN_ERROR,
  payload: { message },
})

// 登出請求 Action
export const logoutRequest = (): LogoutRequestAction => ({
  type: AuthActionTypes.LOGOUT_REQUEST,
})

// 登出成功 Action
export const logoutSuccess = (): LogoutSuccessAction => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
})

// 檢查認證成功 Action
export const checkAuthSuccess = (user: User, token: string): CheckAuthSuccessAction => ({
  type: AuthActionTypes.CHECK_AUTH_SUCCESS,
  payload: { user, token },
})

// 檢查認證失敗 Action
export const checkAuthError = (): CheckAuthErrorAction => ({
  type: AuthActionTypes.CHECK_AUTH_ERROR,
})

// 更新使用者 Action
export const updateUser = (userData: Partial<User>): UpdateUserAction => ({
  type: AuthActionTypes.UPDATE_USER,
  payload: userData,
})
EOF

# 2. Reducers
echo "🔧 建立 Reducers..."
cat > src/reducers/authReducer.ts << 'EOF'
// 認證 Reducer - 遵循 SRP 原則，只負責認證狀態管理

import { AuthActionTypes, AuthActions, AuthReduxState } from '../types/redux'

// 初始狀態
const initialState: AuthReduxState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
}

// Auth Reducer
const authReducer = (state = initialState, action: AuthActions): AuthReduxState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }

    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.message,
      }

    case AuthActionTypes.LOGOUT_SUCCESS:
      return initialState

    case AuthActionTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }

    case AuthActionTypes.CHECK_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      }

    case AuthActionTypes.UPDATE_USER:
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }

    default:
      return state
  }
}

export default authReducer
EOF

cat > src/reducers/index.ts << 'EOF'
// Root Reducer - 整合所有 reducers

import { combineReducers } from 'redux'
import authReducer from './authReducer'

// 整合所有 reducers
const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
EOF

# 3. Sagas
echo "⚡ 建立 Sagas..."
cat > src/sagas/authSagas.ts << 'EOF'
// 認證 Sagas - 遵循 SRP 原則，只負責認證相關的副作用處理

import { call, put, takeLatest } from 'redux-saga/effects'
import { AuthActionTypes } from '../types/redux'
import type { LoginRequestAction } from '../types/redux'
import { loginSuccess, loginError, logoutSuccess, checkAuthSuccess, checkAuthError } from '../actions/authActions'
import { loginAPI, logoutAPI, checkAuthAPI } from '../services/authService'

/**
 * 處理登入請求 Saga
 */
function* handleLoginRequest(action: LoginRequestAction) {
  try {
    const response: any = yield call(loginAPI, action.payload)
    
    if (response.success) {
      // 儲存 token 到 localStorage
      localStorage.setItem('auth-token', response.data.token)
      localStorage.setItem('auth-user', JSON.stringify(response.data.user))
      
      // 發送登入成功 action
      yield put(loginSuccess(response.data.user, response.data.token))
    } else {
      yield put(loginError(response.message || '登入失敗'))
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '登入失敗'
    yield put(loginError(message))
  }
}

/**
 * 處理登出請求 Saga
 */
function* handleLogoutRequest() {
  try {
    // 呼叫登出 API（可選）
    yield call(logoutAPI)
    
    // 清除 localStorage 中的認證資訊
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    
    // 發送登出成功 action
    yield put(logoutSuccess())
  } catch {
    // 即使 API 失敗，也要清除本地資訊
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    yield put(logoutSuccess())
  }
}

/**
 * 處理檢查認證狀態請求 Saga
 */
function* handleCheckAuthRequest() {
  try {
    // 從 localStorage 獲取 token
    const token = localStorage.getItem('auth-token')
    const userStr = localStorage.getItem('auth-user')
    
    if (token && userStr) {
      // 驗證 token 有效性
      const response: any = yield call(checkAuthAPI, token)
      
      if (response.success) {
        yield put(checkAuthSuccess(response.data.user, token))
      } else {
        throw new Error('Token 無效')
      }
    } else {
      throw new Error('無認證資訊')
    }
  } catch {
    // 清除無效的認證資訊
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    yield put(checkAuthError())
  }
}

/**
 * 監聽認證相關的 Actions
 */
export function* watchAuthSagas() {
  yield takeLatest(AuthActionTypes.LOGIN_REQUEST, handleLoginRequest)
  yield takeLatest(AuthActionTypes.LOGOUT_REQUEST, handleLogoutRequest)
}
EOF

cat > src/sagas/index.ts << 'EOF'
// Root Saga - 整合所有 sagas

import { all, fork } from 'redux-saga/effects'
import { watchAuthSagas } from './authSagas'

/**
 * Root Saga
 * 整合所有功能的 sagas
 */
export default function* rootSaga() {
  yield all([
    fork(watchAuthSagas),
  ])
}
EOF

echo "✅ Redux-Saga 架構建立完成!" 