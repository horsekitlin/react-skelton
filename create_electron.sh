#!/bin/bash

# Electron + React MUI Redux-Saga Demo 專案建立腳本
# 建立現代化的桌面應用程式，整合所有最佳實踐

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "❌ 錯誤: 請提供專案名稱"
    echo "使用方式: ./create_electron.sh <project_name>"
    echo "範例: ./create_electron.sh my-electron-app"
    exit 1
fi

echo "🚀 開始建立 Electron + React MUI Redux-Saga 專案: $PROJ_NAME"
echo "========================================================================"

# 取得腳本目錄的絕對路徑
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 檢查 Node.js 和 npm
if ! command -v node &> /dev/null; then
    echo "❌ 錯誤: 請先安裝 Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ 錯誤: 請先安裝 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"
echo ""

# 步驟 1: 建立 Electron + React 專案
echo "📦 步驟 1/8: 建立 Electron + React 專案..."
if ! npm create electron-vite@latest $PROJ_NAME; then
    echo "❌ Electron 專案建立失敗"
    exit 1
fi

cd "$PROJ_NAME"

echo "📦 安裝基本依賴..."
if ! npm install; then
    echo "❌ 依賴安裝失敗"
    exit 1
fi

# 步驟 2: 安裝額外的依賴套件
echo "📚 步驟 2/8: 安裝 Material-UI 和 Redux 相關套件..."
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material \
    @reduxjs/toolkit react-redux redux-saga \
    react-router-dom axios

npm install -D @types/react-redux

# 步驟 3: 建立目錄結構
echo "📁 步驟 3/8: 建立專案目錄結構..."
if ! bash "$SCRIPT_DIR/setup_electron_files.sh" "$PROJ_NAME"; then
    echo "❌ 目錄結構建立失敗"
    exit 1
fi

# 步驟 4: 設置 Redux Store 和 Sagas
echo "🏪 步驟 4/8: 設置 Redux Store 和 Sagas..."
if ! bash "$SCRIPT_DIR/setup_electron_redux.sh" "$PROJ_NAME"; then
    echo "❌ Redux 設置失敗"
    exit 1
fi

# 步驟 5: 建立基礎組件
echo "🧩 步驟 5/8: 建立基礎 React 組件..."
if ! bash "$SCRIPT_DIR/setup_electron_components.sh" "$PROJ_NAME"; then
    echo "❌ 組件建立失敗"
    exit 1
fi

# 步驟 6: 建立應用程式頁面
echo "📄 步驟 6/8: 建立應用程式頁面..."
if ! bash "$SCRIPT_DIR/setup_electron_pages.sh" "$PROJ_NAME"; then
    echo "❌ 頁面建立失敗"
    exit 1
fi

# 步驟 7: 設置主應用程式檔案
echo "⚙️ 步驟 7/8: 設置應用程式主檔案..."
if ! bash "$SCRIPT_DIR/setup_electron_app.sh" "$PROJ_NAME"; then
    echo "❌ 應用程式檔案設置失敗"
    exit 1
fi

# 步驟 8: 設置 API 層和服務
echo "🌐 步驟 8/8: 設置 API 層和服務..."
if ! bash "$SCRIPT_DIR/setup_electron_api.sh" "$PROJ_NAME"; then
    echo "❌ API 層設置失敗"
    exit 1
fi

# 更新 package.json 中的專案資訊
echo "📝 更新專案配置..."
cd src

# 建立 .env 檔案
cat > .env << EOF
# Electron React App 環境變數
REACT_APP_NAME=$PROJ_NAME
REACT_APP_VERSION=1.0.0
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENV=development
EOF

# 建立 README.md
cd ..
cat > README.md << EOF
# $PROJ_NAME

現代化的 Electron + React 桌面應用程式，整合 TypeScript、Material-UI、Redux Toolkit 和 Redux Saga。

## 特色功能

- ⚡ **現代技術棧**: Electron + React 18 + TypeScript
- 🎨 **Material-UI**: 美觀的 Material Design 界面
- 🏪 **Redux Toolkit**: 現代化的狀態管理
- 🔄 **Redux Saga**: 優雅的副作用處理
- 🎯 **React Router**: 單頁面應用路由
- 📱 **響應式設計**: 適配不同螢幕尺寸
- 🌙 **主題支援**: 亮色/暗色主題切換
- 🔧 **TypeScript**: 型別安全的開發體驗
- 🚀 **Vite**: 快速的開發建置工具

## 技術棧

- **前端框架**: React 18
- **開發語言**: TypeScript
- **桌面框架**: Electron
- **UI 框架**: Material-UI (MUI)
- **狀態管理**: Redux Toolkit + Redux Saga
- **路由**: React Router
- **HTTP 客戶端**: Axios
- **建置工具**: Vite
- **開發工具**: ESLint, Prettier

## 專案結構

\`\`\`
src/
├── main/              # Electron 主程序
├── preload/           # Preload 腳本
└── renderer/          # React 渲染程序
    └── src/
        ├── actions/       # Redux actions
        ├── apis/          # API 接口
        ├── assets/        # 靜態資源
        ├── components/    # React 組件
        ├── layouts/       # 頁面布局
        ├── pages/         # 應用頁面
        ├── reducers/      # Redux reducers
        ├── sagas/         # Redux sagas
        ├── services/      # 業務服務
        ├── store/         # Redux store
        ├── theme/         # 主題配置
        ├── types/         # TypeScript 類型
        ├── utils/         # 工具函數
        ├── App.tsx        # 主應用組件
        └── main.tsx       # 應用入口
\`\`\`

## 開發指令

\`\`\`bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置應用
npm run build

# 建置並預覽
npm run preview

# Lint 檢查
npm run lint

# 型別檢查
npm run type-check
\`\`\`

## 功能特色

### 🎨 主題系統
- 支援亮色和暗色主題
- 響應系統主題設定
- 可自定義色彩配置

### 🏪 狀態管理
- Redux Toolkit 簡化狀態管理
- Redux Saga 處理異步操作
- 完整的型別支援

### 📱 響應式設計
- Material-UI 組件系統
- 適配不同螢幕尺寸
- 行動優先設計理念

### 🔧 開發體驗
- TypeScript 型別安全
- 熱重載開發
- ESLint + Prettier 程式碼品質
- 完整的錯誤處理

## 建置和發佈

### 開發環境
\`\`\`bash
npm run dev
\`\`\`

### 生產建置
\`\`\`bash
npm run build
\`\`\`

### 跨平台建置
\`\`\`bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
\`\`\`

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 支援

如有問題，請提交 Issue 或聯繫開發團隊。
EOF

# 更新 package.json 的描述
npm pkg set description="現代化的 Electron + React 桌面應用程式"
npm pkg set keywords='["electron", "react", "typescript", "material-ui", "redux", "desktop"]'
npm pkg set author="Your Name <your.email@example.com>"

echo ""
echo "🎉 Electron + React MUI Redux-Saga 專案建立完成！"
echo "========================================================================"
echo "📁 專案位置: $(pwd)"
echo ""
echo "🔧 已安裝的技術棧:"
echo "   ⚡ Electron (桌面應用框架)"
echo "   ⚛️  React 18 (前端框架)"
echo "   📘 TypeScript (型別安全)"
echo "   🎨 Material-UI (UI 組件庫)"
echo "   🏪 Redux Toolkit (狀態管理)"
echo "   🔄 Redux Saga (副作用處理)"
echo "   🎯 React Router (路由管理)"
echo "   🌐 Axios (HTTP 客戶端)"
echo ""
echo "📂 已建立的功能模組:"
echo "   🧩 基礎組件 (LoadingSpinner, ErrorMessage, Counter, Header, Sidebar)"
echo "   📄 應用頁面 (HomePage, AboutPage, SettingsPage)"
echo "   🏗️ 布局系統 (MainLayout)"
echo "   🎨 主題系統 (亮色/暗色主題)"
echo "   🔧 工具函數 (storage, helpers, constants)"
echo "   🌐 API 層 (HTTP client, User API)"
echo "   🔧 服務層 (User service, Electron service)"
echo ""
echo "🚀 開始開發:"
echo "   cd $PROJ_NAME"
echo "   npm run dev"
echo ""
echo "📖 更多資訊請參考 README.md"
echo "========================================================================" 