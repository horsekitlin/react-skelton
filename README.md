# React MUI Redux-Saga Demo 專案建立工具

這個目錄包含完整的自動化腳本，可以快速建立一個現代化的 React 管理系統 Demo。

## 🚀 快速開始

### 一鍵建立完整專案

```bash
./create_demo.sh <project_name>
```

範例：
```bash
./create_demo.sh my-admin-app
```

### 執行專案

```bash
cd my-admin-app
npm run dev
```

## 📋 腳本說明

### 主要腳本

- **`create_demo.sh`** - 主要執行腳本，整合所有步驟
- **`init_project.sh`** - 初始化 Vite React TypeScript 專案
- **`setup_files.sh`** - 建立基礎檔案（類型定義、主題）
- **`setup_redux.sh`** - 建立 Redux-Saga 架構
- **`setup_api.sh`** - 建立 API 和服務層
- **`setup_store.sh`** - 建立 Store 和 Hooks
- **`setup_components.sh`** - 建立佈局和登入頁面
- **`setup_pages.sh`** - 建立儀表板和商家管理頁面
- **`setup_app.sh`** - 建立主應用程式和配置檔案

### 個別執行腳本

如果需要單獨執行某個步驟：

```bash
# 1. 初始化專案
./init_project.sh my-project

# 2. 設置基礎檔案
./setup_files.sh my-project

# 3. 設置 Redux-Saga
./setup_redux.sh my-project

# 4. 設置 API 層
./setup_api.sh my-project

# 5. 設置 Store 和 Hooks
./setup_store.sh my-project

# 6. 設置組件
./setup_components.sh my-project

# 7. 設置頁面
./setup_pages.sh my-project

# 8. 設置主應用程式
./setup_app.sh my-project
```

## 🎯 建立的專案特色

### 技術棧
- **React 18** + **TypeScript** - 現代化前端框架
- **Material-UI v5** - 美觀的 UI 組件庫
- **Redux-Saga** - 強大的狀態管理和副作用處理
- **React Router v6** - 現代化路由系統
- **Vite** - 快速的開發建置工具
- **Axios** - HTTP 客戶端

### 功能特色
- ✅ 完整的認證系統（登入/登出）
- ✅ Redux Persist 狀態持久化（重載頁面保持登入狀態）
- ✅ 響應式設計（支援桌面和行動裝置）
- ✅ 儀表板統計頁面
- ✅ 商家管理頁面（搜尋、篩選、分頁）
- ✅ 設定頁面
- ✅ 全螢幕 Loading 效果
- ✅ Mock API 資料
- ✅ TypeScript 嚴格模式
- ✅ SOLID 原則和 DRY 原則實踐

### 設計原則
- **單一職責原則 (SRP)** - 每個組件和函數只負責一個功能
- **開放封閉原則 (OCP)** - 透過介面和抽象實現可擴展性
- **DRY 原則** - 避免重複程式碼，建立可重複使用的組件

## 🔐 測試帳號

系統提供以下測試帳號：

- **管理員帳號**: `admin` / `admin123`
- **一般使用者**: `user` / `user123`

## 📱 功能頁面

- **登入頁面** (`/login`) - 使用者認證
- **儀表板** (`/dashboard`) - 系統概覽和統計資訊
- **商家管理** (`/merchants`) - 商家列表和篩選功能
- **設定頁面** (`/settings`) - 系統設定和配置

## 🏗️ 專案結構

建立的專案將包含以下結構：

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

## 🛠️ 開發指南

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

## 📝 注意事項

1. 確保 Node.js 版本 >= 16
2. 確保 npm 版本 >= 8
3. 腳本需要執行權限（已自動設置）
4. 專案名稱不能包含特殊字元

## 🤝 支援

如果遇到問題，請檢查：
1. Node.js 和 npm 版本
2. 網路連線狀態
3. 磁碟空間是否充足
4. 專案名稱是否有效

## 📄 授權

MIT License 