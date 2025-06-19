#!/bin/bash

# API 和服務層設置腳本
# 建立完整的 API 架構和服務層

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    exit 1
fi

cd $PROJ_NAME

echo "🌐 建立 API 和服務層..."

# 1. API 基礎配置
echo "⚙️ 建立 API 配置..."
cat > src/apis/index.ts << 'EOF'
import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// API 基礎配置 - 遵循 DRY 原則，統一管理 API 配置
const server = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器 - 統一添加認證 token
server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 回應攔截器 - 統一處理錯誤
server.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 清除過期的認證資訊
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const getServer = () => server
export default server
EOF

# 2. 認證 API
echo "🔐 建立認證 API..."
cat > src/apis/auth.ts << 'EOF'
import type { LoginCredentials, User } from '../types'

// Mock 使用者資料 - 模擬真實 API 回應
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    name: '系統管理員',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    name: '一般使用者',
    role: 'user',
  },
]

// API 回應類型定義
interface AuthApiResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
  message: string
}

/**
 * 登入 API - 遵循單一職責原則，只負責登入驗證
 */
export const signinResult = async (payload: LoginCredentials): Promise<AuthApiResponse> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模擬登入驗證
  const user = MOCK_USERS.find(
    (u) => u.username === payload.username && u.password === payload.password
  )
  
  if (!user) {
    throw new Error('帳號或密碼錯誤')
  }
  
  // 移除密碼欄位
  const { password: _, ...userWithoutPassword } = user
  
  // 生成 mock token
  const token = `mock_token_${user.id}_${Date.now()}`
  
  return {
    success: true,
    data: {
      user: userWithoutPassword,
      token,
    },
    message: '登入成功',
  }
}

/**
 * 登出 API - 遵循單一職責原則，只負責登出處理
 */
export const signoutResult = async (): Promise<{ success: boolean; message: string }> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    success: true,
    message: '登出成功',
  }
}

/**
 * 檢查認證狀態 API - 驗證 token 有效性
 */
export const checkAuthResult = async (token: string): Promise<AuthApiResponse> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // 簡單的 token 驗證 (實際應該由後端驗證)
  if (!token || !token.startsWith('mock_token_')) {
    throw new Error('Token 無效')
  }
  
  // 從 token 中提取使用者 ID
  const userId = token.split('_')[2]
  const user = MOCK_USERS.find(u => u.id === userId)
  
  if (!user) {
    throw new Error('使用者不存在')
  }
  
  // 移除密碼欄位
  const { password: _, ...userWithoutPassword } = user
  
  return {
    success: true,
    data: {
      user: userWithoutPassword,
      token,
    },
    message: '認證有效',
  }
}
EOF

# 3. 服務層
echo "🔧 建立服務層..."
cat > src/services/authService.ts << 'EOF'
// 認證服務 - 遵循單一職責原則，只負責認證相關的服務調用

import { signinResult, signoutResult, checkAuthResult } from '../apis/auth'
import type { LoginCredentials } from '../types'

/**
 * 登入 API 調用
 */
export const loginAPI = async (credentials: LoginCredentials) => {
  const response = await signinResult(credentials)
  return response
}

/**
 * 登出 API 調用
 */
export const logoutAPI = async () => {
  const response = await signoutResult()
  return response
}

/**
 * 檢查認證狀態 API 調用
 */
export const checkAuthAPI = async (token: string) => {
  const response = await checkAuthResult(token)
  return response
}
EOF

# 4. Mock 資料
echo "📊 建立 Mock 資料..."
cat > src/utils/mockData.ts << 'EOF'
// Mock 資料 - 遵循 DRY 原則，統一管理測試資料

import type { Merchant } from '../types'

// 商家類別選項
export const MERCHANT_CATEGORIES = [
  { value: '', label: '全部類別' },
  { value: 'restaurant', label: '餐廳' },
  { value: 'retail', label: '零售' },
  { value: 'service', label: '服務業' },
  { value: 'entertainment', label: '娛樂' },
  { value: 'health', label: '健康醫療' },
]

// 商家狀態選項
export const MERCHANT_STATUS_OPTIONS = [
  { value: '', label: '全部狀態' },
  { value: 'active', label: '營業中' },
  { value: 'inactive', label: '暫停營業' },
  { value: 'pending', label: '審核中' },
]

// Mock 商家資料
export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: '1',
    name: '美味餐廳',
    category: 'restaurant',
    status: 'active',
    email: 'contact@delicious.com',
    phone: '02-1234-5678',
    address: '台北市信義區信義路五段7號',
    description: '提供精緻的中式料理，使用新鮮食材烹調美味佳餚。',
    rating: 4.5,
    reviewCount: 128,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
  },
  {
    id: '2',
    name: '時尚服飾店',
    category: 'retail',
    status: 'active',
    email: 'info@fashion.com',
    phone: '02-2345-6789',
    address: '台北市大安區忠孝東路四段216號',
    description: '販售最新流行服飾，品質優良價格合理。',
    rating: 4.2,
    reviewCount: 89,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-08',
  },
  {
    id: '3',
    name: '專業理髮店',
    category: 'service',
    status: 'pending',
    email: 'service@haircut.com',
    phone: '02-3456-7890',
    address: '台北市中山區南京東路二段123號',
    description: '專業理髮師提供剪髮、染髮、護髮等服務。',
    rating: 4.8,
    reviewCount: 56,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05',
  },
]

// 工具函數
export const getCategoryLabel = (value: string): string => {
  const category = MERCHANT_CATEGORIES.find(cat => cat.value === value)
  return category?.label || value
}

export const getStatusInfo = (status: string) => {
  const statusMap = {
    active: { label: '營業中', color: 'success' as const },
    inactive: { label: '暫停營業', color: 'error' as const },
    pending: { label: '審核中', color: 'warning' as const },
  }
  return statusMap[status as keyof typeof statusMap] || { label: status, color: 'default' as const }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
  }).format(amount)
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('zh-TW')
}

export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
EOF

echo "✅ API 和服務層建立完成!" 