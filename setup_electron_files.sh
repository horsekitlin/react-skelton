#!/bin/bash

# Electron 專案檔案結構設置腳本
# 建立完整的目錄結構

PROJ_NAME=$1

echo "📁 建立 Electron 專案目錄結構..."

# 確保我們在正確的目錄中
if [ ! -d "src" ]; then
    echo "❌ 錯誤: 找不到 src 目錄"
    exit 1
fi

# 建立 renderer 目錄結構
cd src

# 建立主要目錄
mkdir -p {actions,apis,assets/{icons,images},components/{common,forms,layout},layouts,pages/{home,about,settings},reducers,sagas,services,store,theme,types,utils}

echo "✅ 目錄結構建立完成:"
echo "   📂 src/"
echo "      ├── 📂 actions/          # Redux actions"
echo "      ├── 📂 apis/             # API 接口定義"
echo "      ├── 📂 assets/           # 靜態資源"
echo "      │   ├── 📂 icons/        # 圖標"
echo "      │   └── 📂 images/       # 圖片"
echo "      ├── 📂 components/       # React 組件"
echo "      │   ├── 📂 common/       # 通用組件"
echo "      │   ├── 📂 forms/        # 表單組件"
echo "      │   └── 📂 layout/       # 布局組件"
echo "      ├── 📂 layouts/          # 頁面布局"
echo "      ├── 📂 pages/            # 頁面組件"
echo "      │   ├── 📂 home/         # 首頁"
echo "      │   ├── 📂 about/        # 關於頁面"
echo "      │   └── 📂 settings/     # 設置頁面"
echo "      ├── 📂 reducers/         # Redux reducers"
echo "      ├── 📂 sagas/            # Redux sagas"
echo "      ├── 📂 services/         # 業務邏輯服務"
echo "      ├── 📂 store/            # Redux store 配置"
echo "      ├── 📂 theme/            # MUI 主題配置"
echo "      ├── 📂 types/            # TypeScript 類型定義"
echo "      └── 📂 utils/            # 工具函數"

cd .. 