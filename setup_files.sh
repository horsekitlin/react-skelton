#!/bin/bash

# 設置專案檔案腳本
# 複製聊天室中開發的所有檔案和配置

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    echo "使用方式: ./setup_files.sh <project_name>"
    exit 1
fi

if [ ! -d "$PROJ_NAME" ]; then
    echo "錯誤: 專案目錄 $PROJ_NAME 不存在"
    echo "請先執行 ./init_project.sh $PROJ_NAME"
    exit 1
fi

echo "📂 開始設置專案檔案: $PROJ_NAME"

cd $PROJ_NAME

# 1. 建立類型定義檔案
echo "📝 建立類型定義..."
cat > src/types/index.ts << 'EOF'
// 全域類型定義 - 遵循 DRY 原則，統一管理所有類型

// 使用者相關類型
export interface User {
  id: string
  username: string
  email: string
  name: string
  role: 'admin' | 'user'
}

// 登入憑證類型
export interface LoginCredentials {
  username: string
  password: string
}

// 商家相關類型
export interface Merchant {
  id: string
  name: string
  category: string
  status: 'active' | 'inactive' | 'pending'
  email: string
  phone: string
  address: string
  description: string
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

// 商家篩選條件
export interface MerchantFilters {
  search: string
  category: string
  status: string
}

// 分頁狀態
export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

// 應用程式布局 Props
export interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

// 導航項目
export interface DrawerItem {
  text: string
  icon: React.ReactNode
  path: string
  active?: boolean
}
EOF

# 2. 建立 Redux 類型定義
echo "🔄 建立 Redux 類型..."
cat > src/types/redux.ts << 'EOF'
// Redux 相關類型定義 - 遵循 SRP 原則，專門處理 Redux 類型

import type { User, LoginCredentials } from './index'

// Action Types 常數
export enum AuthActionTypes {
  LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS',
  LOGIN_ERROR = 'AUTH/LOGIN_ERROR',
  LOGOUT_REQUEST = 'AUTH/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'AUTH/LOGOUT_SUCCESS',
  CHECK_AUTH_SUCCESS = 'AUTH/CHECK_AUTH_SUCCESS',
  CHECK_AUTH_ERROR = 'AUTH/CHECK_AUTH_ERROR',
  UPDATE_USER = 'AUTH/UPDATE_USER',
}

// Action 介面定義
export interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST
  payload: LoginCredentials
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export interface LoginErrorAction {
  type: AuthActionTypes.LOGIN_ERROR
  payload: {
    message: string
  }
}

export interface LogoutRequestAction {
  type: AuthActionTypes.LOGOUT_REQUEST
}

export interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS
}

export interface CheckAuthSuccessAction {
  type: AuthActionTypes.CHECK_AUTH_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export interface CheckAuthErrorAction {
  type: AuthActionTypes.CHECK_AUTH_ERROR
}

export interface UpdateUserAction {
  type: AuthActionTypes.UPDATE_USER
  payload: Partial<User>
}

// 所有 Auth Actions 的聯合類型
export type AuthActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | CheckAuthSuccessAction
  | CheckAuthErrorAction
  | UpdateUserAction

// Auth State 介面
export interface AuthReduxState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

// Root State 介面
export interface RootState {
  auth: AuthReduxState
}

// API 回應類型
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}
EOF

# 3. 建立主題配置
echo "🎨 建立主題配置..."
cat > src/theme/index.ts << 'EOF'
import { createTheme } from '@mui/material/styles'

// 自訂主題 - 遵循 DRY 原則，統一管理設計系統
export const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9bb5ff',
      dark: '#3f51b5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#764ba2',
      light: '#a47bd4',
      dark: '#4a1872',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})
EOF

echo "✅ 專案檔案設置完成!" 