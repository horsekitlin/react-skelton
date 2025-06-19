#!/bin/bash

# Store 和 Hooks 設置腳本
# 建立 Redux Store 配置和自訂 Hooks

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    exit 1
fi

cd $PROJ_NAME

echo "🏪 建立 Store 和 Hooks..."

# 1. Store 配置
echo "⚙️ 建立 Store 配置..."
cat > src/store/configureStore.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

// Redux Persist 配置
const persistConfig = {
  key: 'react-mui-redux-saga-root',
  storage,
  whitelist: ['auth'], // 只持久化 auth 狀態
}

// 建立 Saga 中間件
const sagaMiddleware = createSagaMiddleware()

// 建立持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 配置 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// 建立 persistor
export const persistor = persistStore(store)

// 運行 root saga
sagaMiddleware.run(rootSaga)

// 定義類型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
EOF

# 2. Redux Provider
echo "🔗 建立 Redux Provider..."
cat > src/store/ReduxProvider.tsx << 'EOF'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CircularProgress, Box } from '@mui/material'
import { store, persistor } from './configureStore'

interface ReduxProviderProps {
  children: React.ReactNode
}

// Loading 組件 - 在 Redux Persist 載入期間顯示
const PersistLoading: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}
  >
    <CircularProgress size={40} />
  </Box>
)

// Redux Provider 組件 - 遵循單一職責原則，提供 Redux store 和持久化支援
const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
EOF

# 3. 類型安全的 Redux Hooks
echo "🪝 建立 Redux Hooks..."
cat > src/hooks/useRedux.ts << 'EOF'
// 類型安全的 Redux Hooks - 遵循 DRY 原則，統一管理 Redux 操作

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store/configureStore'

// 類型安全的 useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

// 類型安全的 useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// 認證相關的 selector hooks
export const useAuth = () => {
  return useAppSelector((state) => state.auth)
}

export const useUser = () => {
  return useAppSelector((state) => state.auth.user)
}

export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated)
}

export const useAuthLoading = () => {
  return useAppSelector((state) => state.auth.loading)
}

export const useAuthError = () => {
  return useAppSelector((state) => state.auth.error)
}
EOF

# 4. 認證專用 Hook
echo "🔐 建立認證 Hook..."
cat > src/hooks/useAuthRedux.ts << 'EOF'
// 認證專用 Hook - 遵循 SRP 原則，專門處理認證邏輯

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAuth } from './useRedux'
import { loginRequest, logoutRequest } from '../actions/authActions'
import type { LoginCredentials } from '../types'

/**
 * 認證專用 Hook
 * 提供登入、登出等認證相關功能
 */
export const useAuthRedux = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authState = useAuth()

  // 登入功能
  const login = useCallback(
    (credentials: LoginCredentials) => {
      dispatch(loginRequest(credentials))
    },
    [dispatch]
  )

  // 登出功能
  const logout = useCallback(() => {
    dispatch(logoutRequest())
    navigate('/login')
  }, [dispatch, navigate])

  return {
    // 狀態
    ...authState,
    
    // 方法
    login,
    logout,
  }
}
EOF

# 5. 通用工具 Hook
echo "🛠️ 建立工具 Hook..."
cat > src/hooks/useLocalStorage.ts << 'EOF'
// LocalStorage Hook - 遵循 DRY 原則，統一管理本地存儲

import { useState, useEffect } from 'react'

/**
 * 本地存儲 Hook
 * 提供類型安全的 localStorage 操作
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 獲取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 設置值的函數
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
EOF

# 6. 表單處理 Hook
echo "📝 建立表單 Hook..."
cat > src/hooks/useForm.ts << 'EOF'
// 表單處理 Hook - 遵循 SRP 原則，專門處理表單狀態

import { useState, useCallback, ChangeEvent } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit?: (values: T) => void | Promise<void>
}

/**
 * 表單處理 Hook
 * 提供表單狀態管理、驗證、提交等功能
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 處理輸入變更
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setValues((prev) => ({ ...prev, [name]: value }))
      
      // 清除該欄位的錯誤
      if (errors[name as keyof T]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [errors]
  )

  // 設置特定欄位值
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  // 驗證表單
  const validateForm = useCallback(() => {
    if (!validate) return true
    
    const validationErrors = validate(values)
    setErrors(validationErrors)
    
    return Object.keys(validationErrors).length === 0
  }, [validate, values])

  // 處理表單提交
  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      if (event) {
        event.preventDefault()
      }

      if (!validateForm()) {
        return
      }

      if (onSubmit) {
        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } catch (error) {
          console.error('Form submission error:', error)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [validateForm, onSubmit, values]
  )

  // 重置表單
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    setValue,
    handleSubmit,
    reset,
    validateForm,
  }
}
EOF

echo "✅ Store 和 Hooks 建立完成!" 