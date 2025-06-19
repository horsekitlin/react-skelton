# 🚀 React MUI Redux-Saga Demo 使用指南

## 📋 概述

這是一個完整的自動化腳本集合，可以快速建立一個現代化的 React 管理系統。整合了聊天室中開發的所有功能和最佳實踐。

## ✅ 系統需求

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **macOS/Linux/Windows** (已在 macOS 測試)

## 🚀 快速開始

### 1. 建立新專案

```bash
# 進入 demo 目錄
cd demo

# 執行建立腳本
./create_demo.sh my-awesome-app

# 進入專案目錄
cd my-awesome-app

# 啟動開發伺服器
npm run dev
```

### 2. 訪問應用程式

打開瀏覽器訪問：`http://localhost:5173`

### 3. 登入測試

使用以下測試帳號登入：
- **管理員**: `admin` / `admin123`
- **一般使用者**: `user` / `user123`

## 🎯 建立的專案包含

### 📱 功能頁面
- **登入頁面** - 完整的認證系統
- **儀表板** - 統計資訊和系統概覽
- **商家管理** - 列表、搜尋、篩選、分頁

### 🛠️ 技術架構
- **React 18** + **TypeScript** - 現代化前端框架
- **Material-UI v5** - 美觀的 UI 組件庫
- **Redux-Saga** - 狀態管理和副作用處理
- **React Router v6** - 路由系統
- **Vite** - 快速建置工具
- **Axios** - HTTP 客戶端

### 🎨 設計特色
- **響應式設計** - 支援桌面和行動裝置
- **現代化 UI** - Material Design 3.0
- **暗色主題支援** - 可擴展的主題系統
- **無障礙設計** - 符合 WCAG 標準

### 🏗️ 程式碼品質
- **TypeScript 嚴格模式** - 類型安全
- **SOLID 原則** - 高品質架構
- **DRY 原則** - 避免重複程式碼
- **模組化設計** - 易於維護和擴展

## 📁 專案結構詳解

```
src/
├── actions/          # Redux Actions
│   └── authActions.ts
├── apis/            # API 調用層
│   ├── index.ts     # Axios 配置
│   └── auth.ts      # 認證 API
├── components/      # 可重複使用的組件
├── hooks/           # 自定義 Hooks
│   ├── useRedux.ts  # Redux Hooks
│   ├── useAuthRedux.ts # 認證 Hook
│   ├── useForm.ts   # 表單 Hook
│   └── useLocalStorage.ts # 本地存儲 Hook
├── layouts/         # 佈局組件
│   └── AppLayout.tsx
├── pages/           # 頁面組件
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── MerchantsPage.tsx
├── reducers/        # Redux Reducers
│   ├── index.ts
│   └── authReducer.ts
├── sagas/           # Redux-Saga
│   ├── index.ts
│   └── authSagas.ts
├── services/        # 業務服務層
│   └── authService.ts
├── store/           # Redux Store 配置
│   ├── configureStore.ts
│   └── ReduxProvider.tsx
├── theme/           # Material-UI 主題
│   └── index.ts
├── types/           # TypeScript 類型定義
│   ├── index.ts     # 全域類型
│   └── redux.ts     # Redux 類型
├── utils/           # 工具函數
│   └── mockData.ts  # Mock 資料
├── App.tsx          # 主應用程式組件
└── main.tsx         # 應用程式進入點
```

## 🔧 開發指南

### 添加新頁面

1. **建立頁面組件**
```typescript
// src/pages/NewPage.tsx
import React from 'react'
import AppLayout from '../layouts/AppLayout'

const NewPage: React.FC = () => {
  return (
    <AppLayout title="新頁面">
      <div>新頁面內容</div>
    </AppLayout>
  )
}

export default NewPage
```

2. **添加路由**
```typescript
// src/App.tsx
import NewPage from './pages/NewPage'

// 在 Routes 中添加
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

3. **更新導航**
```typescript
// src/layouts/AppLayout.tsx
const drawerItems: DrawerItem[] = [
  // ... 現有項目
  {
    text: '新頁面',
    icon: <NewIcon />,
    path: '/new-page',
    active: location.pathname === '/new-page',
  },
]
```

### 添加新的 API

1. **定義 API 函數**
```typescript
// src/apis/newApi.ts
import server from './index'

export const getNewData = async () => {
  const response = await server.get('/new-data')
  return response.data
}
```

2. **建立服務層**
```typescript
// src/services/newService.ts
import { getNewData } from '../apis/newApi'

export const fetchNewData = async () => {
  return await getNewData()
}
```

3. **建立 Redux Actions 和 Sagas**
```typescript
// src/actions/newActions.ts
export const fetchNewDataRequest = () => ({
  type: 'NEW/FETCH_REQUEST',
})

// src/sagas/newSagas.ts
function* handleFetchNewData() {
  try {
    const data = yield call(fetchNewData)
    yield put({ type: 'NEW/FETCH_SUCCESS', payload: data })
  } catch (error) {
    yield put({ type: 'NEW/FETCH_ERROR', payload: error.message })
  }
}
```

### 自定義主題

```typescript
// src/theme/index.ts
export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#your-color',
    },
    // ... 其他顏色
  },
  // ... 其他配置
})
```

## 🧪 測試

### 手動測試流程

1. **登入測試**
   - 使用正確帳號登入
   - 使用錯誤帳號測試錯誤處理
   - 測試登出功能

2. **頁面導航測試**
   - 測試所有頁面的導航
   - 測試響應式設計
   - 測試受保護路由

3. **功能測試**
   - 測試儀表板統計顯示
   - 測試商家管理的搜尋和篩選
   - 測試分頁功能

## 🚀 部署

### 建置生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

### 部署到 Vercel

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 部署到 Netlify

```bash
# 建置
npm run build

# 上傳 dist 目錄到 Netlify
```

## 🐛 常見問題

### Q: 專案建立失敗怎麼辦？

A: 檢查以下項目：
1. Node.js 和 npm 版本是否符合要求
2. 網路連線是否正常
3. 磁碟空間是否充足
4. 專案名稱是否包含特殊字元

### Q: 開發伺服器啟動失敗？

A: 嘗試以下解決方案：
1. 刪除 `node_modules` 重新安裝：`rm -rf node_modules && npm install`
2. 清除 npm 快取：`npm cache clean --force`
3. 檢查端口 5173 是否被佔用

### Q: TypeScript 錯誤？

A: 確保：
1. 所有依賴都已正確安裝
2. TypeScript 版本符合要求
3. 檢查 `tsconfig.json` 配置

### Q: Redux 狀態管理問題？

A: 檢查：
1. Actions 是否正確定義
2. Reducers 是否正確處理 Actions
3. Sagas 是否正確註冊

## 📞 技術支援

如果遇到其他問題：

1. 檢查控制台錯誤訊息
2. 查看 Network 面板的 API 請求
3. 確認 Redux DevTools 的狀態變化
4. 查看瀏覽器開發者工具的 Console

## 📄 授權

MIT License - 可自由使用於商業和非商業專案。

---

**🎉 恭喜！您已經成功建立了一個現代化的 React 管理系統！** 