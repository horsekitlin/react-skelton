#!/bin/bash

# React MUI Redux-Saga 專案初始化腳本
# 整合聊天室中所有功能和最佳實踐

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    echo "使用方式: ./init_project.sh <project_name>"
    exit 1
fi

echo "🚀 開始建立 React MUI Redux-Saga 專案: $PROJ_NAME"

# 1. 建立 Vite + React + TypeScript 專案
echo "📦 建立 Vite React TypeScript 專案..."
npm create vite@latest $PROJ_NAME -- --template react-ts
cd $PROJ_NAME

# 2. 安裝所有必要的依賴
echo "📦 安裝依賴套件..."
npm install

# 3. 安裝 Redux-Saga 相關套件
echo "🔄 安裝 Redux-Saga 套件..."
npm install @reduxjs/toolkit redux react-redux redux-saga redux-persist

# 4. 安裝 Material-UI 套件
echo "🎨 安裝 Material-UI 套件..."
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/lab

# 5. 安裝其他必要套件
echo "📚 安裝其他套件..."
npm install react-router-dom axios lodash @types/lodash @types/node

# 6. 清理預設檔案
echo "🧹 清理預設檔案..."
rm -rf src/assets/react.svg src/App.css src/index.css

# 7. 建立目錄結構
echo "📁 建立目錄結構..."
mkdir -p src/{actions,apis,components,hooks,layouts,pages,reducers,sagas,services,store,theme,types,utils}

echo "✅ 專案 $PROJ_NAME 初始化完成!"
echo "📍 下一步: cd $PROJ_NAME && npm run dev" 