#!/bin/bash

# React MUI Redux-Saga Demo 專案建立腳本
# 整合聊天室中所有功能的完整自動化腳本

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "❌ 錯誤: 請提供專案名稱"
    echo "使用方式: ./create_demo.sh <project_name>"
    echo "範例: ./create_demo.sh my-admin-app"
    exit 1
fi

echo "🚀 開始建立 React MUI Redux-Saga Demo 專案: $PROJ_NAME"
echo "========================================================"

# 取得腳本目錄的絕對路徑
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 執行步驟 1: 初始化專案
echo "📦 步驟 1/7: 初始化專案..."
if [ -f "$SCRIPT_DIR/init_project.sh" ]; then
    bash "$SCRIPT_DIR/init_project.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ 專案初始化失敗"
        exit 1
    fi
else
    echo "❌ 找不到 init_project.sh"
    exit 1
fi

# 執行步驟 2: 設置基礎檔案
echo "📝 步驟 2/7: 設置基礎檔案..."
if [ -f "$SCRIPT_DIR/setup_files.sh" ]; then
    bash "$SCRIPT_DIR/setup_files.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ 基礎檔案設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_files.sh"
    exit 1
fi

# 執行步驟 3: 設置 Redux-Saga
echo "🔄 步驟 3/7: 設置 Redux-Saga..."
if [ -f "$SCRIPT_DIR/setup_redux.sh" ]; then
    bash "$SCRIPT_DIR/setup_redux.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ Redux-Saga 設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_redux.sh"
    exit 1
fi

# 執行步驟 4: 設置 API 和服務層
echo "🌐 步驟 4/7: 設置 API 和服務層..."
if [ -f "$SCRIPT_DIR/setup_api.sh" ]; then
    bash "$SCRIPT_DIR/setup_api.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ API 和服務層設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_api.sh"
    exit 1
fi

# 執行步驟 5: 設置 Store 和 Hooks
echo "🏪 步驟 5/7: 設置 Store 和 Hooks..."
if [ -f "$SCRIPT_DIR/setup_store.sh" ]; then
    bash "$SCRIPT_DIR/setup_store.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ Store 和 Hooks 設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_store.sh"
    exit 1
fi

# 執行步驟 6: 設置組件和頁面
echo "🎨 步驟 6/7: 設置組件和頁面..."
if [ -f "$SCRIPT_DIR/setup_components.sh" ]; then
    bash "$SCRIPT_DIR/setup_components.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ 組件設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_components.sh"
    exit 1
fi

if [ -f "$SCRIPT_DIR/setup_pages.sh" ]; then
    bash "$SCRIPT_DIR/setup_pages.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ 頁面設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_pages.sh"
    exit 1
fi

# 執行步驟 7: 設置主應用程式和配置
echo "🚀 步驟 7/7: 設置主應用程式和配置..."
if [ -f "$SCRIPT_DIR/setup_app.sh" ]; then
    bash "$SCRIPT_DIR/setup_app.sh" "$PROJ_NAME"
    if [ $? -ne 0 ]; then
        echo "❌ 主應用程式設置失敗"
        exit 1
    fi
else
    echo "❌ 找不到 setup_app.sh"
    exit 1
fi

echo ""
echo "🎉 專案建立完成!"
echo "========================================================"
echo "📁 專案目錄: $PROJ_NAME"
echo "🌐 開發伺服器: http://localhost:5173"
echo ""
echo "🔐 測試帳號:"
echo "   • 管理員: admin / admin123"
echo "   • 使用者: user / user123"
echo ""
echo "🚀 下一步:"
echo "   cd $PROJ_NAME"
echo "   npm run dev"
echo ""
echo "📚 功能特色:"
echo "   ✅ React 18 + TypeScript"
echo "   ✅ Material-UI v5 響應式設計"
echo "   ✅ Redux-Saga 狀態管理"
echo "   ✅ React Router v6 路由系統"
echo "   ✅ 完整的認證系統"
echo "   ✅ 儀表板和商家管理"
echo "   ✅ Mock API 資料"
echo "   ✅ SOLID 原則和 DRY 原則"
echo ""
echo "🎯 專案架構遵循現代化最佳實踐，可直接用於生產環境開發！" 