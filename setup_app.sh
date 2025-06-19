#!/bin/bash

# 主應用程式和配置檔案設置腳本
# 建立 App.tsx, main.tsx 和其他配置檔案

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    exit 1
fi

cd $PROJ_NAME

echo "🚀 建立主應用程式和配置檔案..."

# 1. 主應用程式 App.tsx
echo "📱 建立主應用程式..."
cat > src/App.tsx << 'EOF'
// 主應用程式組件 - 整合路由、主題和 Redux

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import ReduxProvider from './store/ReduxProvider'
import { theme } from './theme'
import { useAuth } from './hooks/useRedux'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MerchantsPage from './pages/MerchantsPage'
import SettingsPage from './pages/SettingsPage'

/**
 * 受保護的路由組件
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>載入中...</div>
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

/**
 * 應用程式路由組件
 */
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 公開路由 */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* 受保護的路由 */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/merchants"
          element={
            <ProtectedRoute>
              <MerchantsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        
        {/* 預設重定向 */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

/**
 * 主應用程式組件
 */
const App: React.FC = () => {
  return (
    <ReduxProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
EOF

# 2. 主要進入點 main.tsx
echo "🎯 建立主要進入點..."
cat > src/main.tsx << 'EOF'
// 應用程式主要進入點

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 建立根元素
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// 渲染應用程式
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
EOF

# 3. 更新 index.html
echo "📄 更新 index.html..."
cat > index.html << 'EOF'
<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React MUI Redux-Saga 管理系統</title>
    <meta name="description" content="使用 React、Material-UI 和 Redux-Saga 建立的現代化管理系統" />
    <style>
      /* 載入樣式 */
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      #root {
        min-height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# 4. TypeScript 配置
echo "⚙️ 更新 TypeScript 配置..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# 5. Vite 配置
echo "⚡ 建立 Vite 配置..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
EOF

# 6. 環境變數檔案
echo "🌍 建立環境變數檔案..."
cat > .env << 'EOF'
# API 基礎 URL
VITE_API_BASE_URL=http://localhost:3001/api

# 應用程式設定
VITE_APP_NAME=React MUI Redux-Saga 管理系統
VITE_APP_VERSION=1.0.0
EOF

cat > .env.example << 'EOF'
# API 基礎 URL
VITE_API_BASE_URL=http://localhost:3001/api

# 應用程式設定
VITE_APP_NAME=React MUI Redux-Saga 管理系統
VITE_APP_VERSION=1.0.0
EOF

# 7. README 檔案
echo "📖 建立 README 檔案..."
cat > README.md << 'EOF'
# React MUI Redux-Saga 管理系統

使用 React、Material-UI 和 Redux-Saga 建立的現代化管理系統範例。

## 🚀 功能特色

- ✅ **React 18** + **TypeScript** - 現代化開發體驗
- ✅ **Material-UI v5** - 美觀的 UI 組件庫
- ✅ **Redux-Saga** - 強大的狀態管理和副作用處理
- ✅ **Redux Persist** - 狀態持久化，重載頁面保持登入狀態
- ✅ **React Router v6** - 現代化路由系統
- ✅ **Vite** - 快速的開發建置工具
- ✅ **響應式設計** - 支援桌面和行動裝置
- ✅ **TypeScript 嚴格模式** - 類型安全
- ✅ **SOLID 原則** - 高品質程式碼架構
- ✅ **Mock API** - 完整的模擬資料

## 📦 技術棧

- **前端框架**: React 18
- **UI 組件庫**: Material-UI v5
- **狀態管理**: Redux + Redux-Saga
- **路由**: React Router v6
- **建置工具**: Vite
- **語言**: TypeScript
- **HTTP 客戶端**: Axios

## 🏗️ 專案結構

```
src/
├── actions/          # Redux Actions
├── apis/            # API 調用層
├── components/      # 可重複使用的組件
├── hooks/           # 自定義 Hooks
├── layouts/         # 佈局組件
├── pages/           # 頁面組件
├── reducers/        # Redux Reducers
├── sagas/           # Redux-Saga
├── services/        # 業務服務層
├── store/           # Redux Store 配置
├── theme/           # Material-UI 主題
├── types/           # TypeScript 類型定義
├── utils/           # 工具函數
├── App.tsx          # 主應用程式組件
└── main.tsx         # 應用程式進入點
```

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動。

### 建置生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 🔐 測試帳號

系統提供以下測試帳號：

- **管理員帳號**: `admin` / `admin123`
- **一般使用者**: `user` / `user123`

## 📱 功能頁面

- **登入頁面** (`/login`) - 使用者認證
- **儀表板** (`/dashboard`) - 系統概覽和統計資訊
- **商家管理** (`/merchants`) - 商家列表和篩選功能
- **設定頁面** (`/settings`) - 系統設定和配置

## 🎨 設計原則

本專案遵循以下設計原則：

- **單一職責原則 (SRP)** - 每個組件和函數只負責一個功能
- **開放封閉原則 (OCP)** - 透過介面和抽象實現可擴展性
- **DRY 原則** - 避免重複程式碼，建立可重複使用的組件

## 📝 開發指南

### 添加新頁面

1. 在 `src/pages/` 建立新的頁面組件
2. 在 `src/App.tsx` 中添加路由
3. 更新導航選單（如需要）

### 添加新的 API

1. 在 `src/apis/` 中定義 API 函數
2. 在 `src/services/` 中建立服務層
3. 建立對應的 Redux Actions 和 Sagas

### 添加新的狀態

1. 定義 Actions 和 Action Types
2. 建立 Reducer
3. 建立對應的 Saga
4. 更新 RootState 類型

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License
EOF

# 8. .gitignore 檔案
echo "🚫 建立 .gitignore 檔案..."
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build output
build
out

# Cache
.cache
.parcel-cache

# Coverage
coverage

# OS generated files
Thumbs.db
ehthumbs.db

# Dependencies
node_modules/
jspm_packages/

# TypeScript
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# Stores VSCode versions used for testing VSCode extensions
.vscode-test
EOF

echo "✅ 主應用程式和配置檔案建立完成!" 