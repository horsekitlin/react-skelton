# Electron + React MUI Redux-Saga 專案腳本

🚀 現代化的 Electron 桌面應用程式快速建立工具，整合最佳實踐和完整的開發環境。

## 📋 目錄

- [功能特色](#功能特色)
- [技術棧](#技術棧)
- [系統需求](#系統需求)
- [快速開始](#快速開始)
- [使用方式](#使用方式)
- [專案結構](#專案結構)
- [開發指南](#開發指南)
- [腳本說明](#腳本說明)
- [常見問題](#常見問題)
- [最佳實踐](#最佳實踐)
- [故障排除](#故障排除)
- [貢獻指南](#貢獻指南)
- [授權](#授權)

## ✨ 功能特色

### 🔧 核心功能
- ⚡ **快速建立**: 一鍵建立完整的 Electron + React 專案
- 🎨 **現代化 UI**: 整合 Material-UI 設計系統
- 🏪 **狀態管理**: Redux Toolkit + Redux Saga 完整方案
- 📱 **響應式設計**: 適配不同螢幕尺寸
- 🌙 **主題支援**: 內建亮色/暗色主題切換
- 🔒 **型別安全**: 完整的 TypeScript 支援

### 🚀 開發體驗
- 🔥 **熱重載**: Vite 快速開發體驗
- 📦 **模組化結構**: 清晰的目錄結構和組件分離
- 🧪 **最佳實踐**: 遵循 React 和 Electron 最佳實踐
- 🎯 **路由管理**: React Router 單頁面應用
- 🌐 **API 整合**: Axios HTTP 客戶端和服務層
- 🛠️ **開發工具**: ESLint + Prettier 程式碼品質

### 📱 應用功能
- 🏠 **主頁面**: 功能展示和計數器示例
- ℹ️ **關於頁面**: 技術棧和版本資訊展示
- ⚙️ **設置頁面**: 主題和偏好設定
- 🧩 **通用組件**: 可重複使用的 UI 組件
- 🔄 **異步處理**: Redux Saga 處理副作用

## 🛠️ 技術棧

### 前端技術
| 技術 | 版本 | 用途 |
|------|------|------|
| **React** | 18+ | 前端框架 |
| **TypeScript** | 5+ | 型別安全 |
| **Material-UI** | 5+ | UI 組件庫 |
| **Redux Toolkit** | 1+ | 狀態管理 |
| **Redux Saga** | 1+ | 副作用處理 |
| **React Router** | 6+ | 路由管理 |
| **Axios** | 1+ | HTTP 客戶端 |

### 桌面技術
| 技術 | 版本 | 用途 |
|------|------|------|
| **Electron** | 最新 | 桌面應用框架 |
| **Electron Vite** | 最新 | 建置工具 |

### 開發工具
| 工具 | 用途 |
|------|------|
| **Vite** | 快速建置和開發 |
| **ESLint** | 程式碼檢查 |
| **Prettier** | 程式碼格式化 |

## 💻 系統需求

### 必要條件
- **Node.js**: 18.0.0 或更高版本
- **npm**: 8.0.0 或更高版本
- **Git**: 用於版本控制（建議）

### 支援平台
- 🖥️ **Windows**: 10/11
- 🍎 **macOS**: 10.14 或更高版本
- 🐧 **Linux**: Ubuntu 18.04 或其他主流發行版

### 開發環境建議
- **IDE**: Visual Studio Code
- **擴展**: 
  - TypeScript
  - React
  - ESLint
  - Prettier

## 🚀 快速開始

### 1. 檢查環境
```bash
# 檢查 Node.js 版本
node --version  # 應該 >= 18.0.0

# 檢查 npm 版本
npm --version   # 應該 >= 8.0.0
```

### 2. 下載腳本
```bash
# 克隆專案或下載腳本檔案
git clone <repository-url>
cd react-skelton
```

### 3. 建立專案
```bash
# 進入 demo 目錄
cd demo

# 執行建立腳本
./create_electron.sh my-awesome-app
```

### 4. 啟動專案
```bash
# 進入專案目錄
cd my-awesome-app

# 啟動開發伺服器
npm run dev
```

🎉 **完成！** 您的 Electron 應用程式將會自動啟動，並可在瀏覽器中預覽。

## 📖 使用方式

### 基本建立命令
```bash
./create_electron.sh <project_name>
```

### 參數說明
- `<project_name>`: 專案名稱（必需）
  - 只能包含字母、數字、連字符和底線
  - 建議使用 kebab-case 格式（如：my-awesome-app）

### 建立過程
腳本會自動執行以下步驟：

1. **📦 建立基礎專案**
   - 使用 `create-electron-vite` 建立基礎結構
   - 安裝基本依賴

2. **📚 安裝額外套件**
   - Material-UI 組件庫
   - Redux 相關套件
   - 開發工具

3. **📁 建立目錄結構**
   - 組件目錄
   - 頁面目錄
   - 服務目錄
   - 工具目錄

4. **🏪 設置狀態管理**
   - Redux Store 配置
   - Reducers 和 Actions
   - Saga 中間件

5. **🧩 建立基礎組件**
   - 通用組件
   - 布局組件
   - 表單組件

6. **📄 建立應用頁面**
   - 主頁面
   - 關於頁面
   - 設置頁面

7. **⚙️ 配置主應用**
   - App.tsx 配置
   - 路由設置
   - 主題系統

8. **🌐 設置 API 層**
   - HTTP 客戶端
   - 服務層
   - API 接口

## 📂 專案結構

建立完成後的專案結構如下：

```
my-awesome-app/
├── 📂 src/                    # 源碼目錄
│   ├── 📂 actions/            # Redux actions
│   │   └── index.ts
│   ├── 📂 apis/               # API 接口定義
│   │   ├── userApi.ts
│   │   └── index.ts
│   ├── 📂 assets/             # 靜態資源
│   │   ├── 📂 icons/          # 圖標文件
│   │   └── 📂 images/         # 圖片文件
│   ├── 📂 components/         # React 組件
│   │   ├── 📂 common/         # 通用組件
│   │   │   ├── Counter.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── 📂 forms/          # 表單組件
│   │   ├── 📂 layout/         # 布局組件
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   └── index.ts
│   ├── 📂 layouts/            # 頁面布局
│   │   ├── MainLayout.tsx
│   │   └── index.ts
│   ├── 📂 pages/              # 頁面組件
│   │   ├── 📂 home/           # 首頁
│   │   │   ├── HomePage.tsx
│   │   │   └── index.ts
│   │   ├── 📂 about/          # 關於頁面
│   │   │   ├── AboutPage.tsx
│   │   │   └── index.ts
│   │   ├── 📂 settings/       # 設置頁面
│   │   │   ├── SettingsPage.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── 📂 reducers/           # Redux reducers
│   │   ├── appReducer.ts
│   │   ├── counterReducer.ts
│   │   └── index.ts
│   ├── 📂 sagas/              # Redux sagas
│   │   ├── appSaga.ts
│   │   ├── counterSaga.ts
│   │   └── index.ts
│   ├── 📂 services/           # 業務邏輯服務
│   │   ├── userService.ts
│   │   ├── electronService.ts
│   │   └── index.ts
│   ├── 📂 store/              # Redux store 配置
│   │   └── index.ts
│   ├── 📂 theme/              # MUI 主題配置
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── 📂 types/              # TypeScript 類型定義
│   │   └── index.ts
│   ├── 📂 utils/              # 工具函數
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── storage.ts
│   │   └── index.ts
│   ├── App.tsx                # 主應用組件
│   ├── main.tsx               # 應用入口
│   └── .env                   # 環境變數
├── 📂 electron/               # Electron 主程序
├── 📂 dist-electron/          # Electron 建置輸出
├── 📂 node_modules/           # 依賴套件
├── package.json               # 專案配置
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
└── README.md                 # 專案說明
```

## 🎯 開發指南

### 開發命令

```bash
# 開發模式（啟動 Electron 應用）
npm run dev

# 建置應用
npm run build

# 類型檢查
npm run type-check

# 程式碼檢查
npm run lint

# 格式化程式碼
npm run format
```

### 新增頁面

1. **建立頁面目錄**
   ```bash
   mkdir src/pages/new-page
   ```

2. **建立頁面組件**
   ```typescript
   // src/pages/new-page/NewPage.tsx
   import React from 'react';
   import { Container, Typography } from '@mui/material';

   const NewPage: React.FC = () => {
     return (
       <Container maxWidth="md">
         <Typography variant="h3" component="h1" gutterBottom align="center">
           New Page
         </Typography>
         {/* 頁面內容 */}
       </Container>
     );
   };

   export default NewPage;
   ```

3. **建立索引檔案**
   ```typescript
   // src/pages/new-page/index.ts
   export { default as NewPage } from './NewPage';
   ```

4. **更新路由**
   ```typescript
   // src/App.tsx
   import { NewPage } from './pages';

   // 在 Routes 中添加
   <Route path="new-page" element={<NewPage />} />
   ```

### 新增組件

1. **建立組件檔案**
   ```typescript
   // src/components/common/MyComponent.tsx
   import React from 'react';
   import { Box } from '@mui/material';

   interface MyComponentProps {
     title: string;
     children?: React.ReactNode;
   }

   const MyComponent: React.FC<MyComponentProps> = ({ title, children }) => {
     return (
       <Box>
         <h2>{title}</h2>
         {children}
       </Box>
     );
   };

   export default MyComponent;
   ```

2. **更新組件索引**
   ```typescript
   // src/components/index.ts
   export { default as MyComponent } from './common/MyComponent';
   ```

### 狀態管理

#### 添加新的 Reducer

1. **建立 Reducer**
   ```typescript
   // src/reducers/newReducer.ts
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   interface NewState {
     data: string[];
     loading: boolean;
   }

   const initialState: NewState = {
     data: [],
     loading: false,
   };

   const newSlice = createSlice({
     name: 'new',
     initialState,
     reducers: {
       setData: (state, action: PayloadAction<string[]>) => {
         state.data = action.payload;
       },
       setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
       },
     },
   });

   export const { setData, setLoading } = newSlice.actions;
   export default newSlice.reducer;
   ```

2. **更新 Root Reducer**
   ```typescript
   // src/reducers/index.ts
   import newReducer from './newReducer';

   export const rootReducer = combineReducers({
     counter: counterReducer,
     app: appReducer,
     new: newReducer, // 添加新的 reducer
   });
   ```

#### 添加 Saga

```typescript
// src/sagas/newSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { setData, setLoading } from '../reducers/newReducer';

function* fetchDataSaga() {
  try {
    yield put(setLoading(true));
    // API 呼叫
    const data = yield call(/* API 函數 */);
    yield put(setData(data));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* newSaga() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchDataSaga);
}
```

### API 整合

#### 建立 API 服務

```typescript
// src/services/apiService.ts
import { httpClient } from '../apis';

export interface ApiData {
  id: string;
  name: string;
}

export const apiService = {
  // 獲取數據
  fetchData: async (): Promise<ApiData[]> => {
    const response = await httpClient.get<ApiData[]>('/api/data');
    return response.data;
  },

  // 建立數據
  createData: async (data: Omit<ApiData, 'id'>): Promise<ApiData> => {
    const response = await httpClient.post<ApiData>('/api/data', data);
    return response.data;
  },

  // 更新數據
  updateData: async (id: string, data: Partial<ApiData>): Promise<ApiData> => {
    const response = await httpClient.patch<ApiData>(`/api/data/${id}`, data);
    return response.data;
  },

  // 刪除數據
  deleteData: async (id: string): Promise<void> => {
    await httpClient.delete(`/api/data/${id}`);
  },
};
```

### 主題客製化

```typescript
// src/theme/customTheme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // 客製化主色
    },
    secondary: {
      main: '#dc004e', // 客製化次要色
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 客製化按鈕圓角
        },
      },
    },
  },
});
```

## 🔧 腳本說明

專案包含多個腳本檔案，每個都有特定的功能：

### 主腳本

#### `create_electron.sh`
主要的建立腳本，協調所有其他腳本的執行。

**功能:**
- 驗證系統環境
- 建立基礎 Electron 專案
- 安裝所需依賴
- 呼叫所有子腳本
- 配置專案設定

### 子腳本

#### `setup_electron_files.sh`
建立專案的目錄結構。

**建立的目錄:**
- `actions/` - Redux actions
- `apis/` - API 接口
- `assets/` - 靜態資源
- `components/` - React 組件
- `layouts/` - 頁面布局
- `pages/` - 應用頁面
- `reducers/` - Redux reducers
- `sagas/` - Redux sagas
- `services/` - 業務服務
- `store/` - Redux store
- `theme/` - 主題配置
- `types/` - 類型定義
- `utils/` - 工具函數

#### `setup_electron_redux.sh`
設置 Redux 狀態管理系統。

**建立的檔案:**
- `store/index.ts` - Store 配置
- `reducers/` - 所有 reducers
- `actions/index.ts` - Action creators
- `sagas/` - 所有 sagas
- `types/index.ts` - 類型定義

#### `setup_electron_components.sh`
建立基礎 React 組件。

**建立的組件:**
- `Counter` - 計數器組件（包含 Redux 整合）
- `LoadingSpinner` - 載入指示器
- `ErrorMessage` - 錯誤訊息顯示
- `Header` - 應用程式標頭
- `Sidebar` - 側邊欄

#### `setup_electron_pages.sh`
建立應用程式頁面。

**建立的頁面:**
- `HomePage` - 主頁面，展示功能和計數器
- `AboutPage` - 關於頁面，顯示技術棧和版本資訊
- `SettingsPage` - 設置頁面，主題和偏好設定

#### `setup_electron_app.sh`
設置主應用程式檔案。

**建立的檔案:**
- `App.tsx` - 主應用程式組件
- `main.tsx` - 應用程式入口
- `layouts/MainLayout.tsx` - 主要布局
- `theme/theme.ts` - 主題配置
- `utils/` - 工具函數

#### `setup_electron_api.sh`
設置 API 層和服務。

**建立的檔案:**
- HTTP 客戶端配置
- 用戶 API 接口
- 業務邏輯服務
- Electron 特定服務

## ❓ 常見問題

### Q: 為什麼關於頁面顯示空白？
**A:** 這通常是因為 `process.versions` 在瀏覽器環境中不可用。我們的腳本已經包含安全檢查來處理這個問題。

### Q: 如何更改應用程式圖標？
**A:** 
1. 將新圖標放入 `assets/icons/` 目錄
2. 更新 `electron/main.js` 中的圖標路徑
3. 重新建置應用程式

### Q: 如何添加新的依賴套件？
**A:**
```bash
# 添加運行時依賴
npm install package-name

# 添加開發依賴
npm install -D package-name
```

### Q: 如何建置生產版本？
**A:**
```bash
npm run build
```

### Q: 如何除錯應用程式？
**A:**
1. 開啟開發者工具：`Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (macOS)
2. 查看控制台錯誤訊息
3. 使用 React Developer Tools 除錯組件

### Q: 如何更新 Electron 版本？
**A:**
```bash
npm update electron
npm update @electron/app
```

### Q: 應用程式啟動很慢怎麼辦？
**A:**
1. 檢查是否有大量的依賴套件
2. 考慮使用程式碼分割
3. 最佳化圖片和資源檔案大小

## 🏆 最佳實踐

### 程式碼組織
1. **單一職責原則**: 每個組件和函數只做一件事
2. **命名規範**: 使用描述性的名稱
3. **檔案結構**: 保持一致的目錄結構
4. **型別安全**: 充分利用 TypeScript 的型別系統

### 組件設計
1. **可重複使用**: 設計通用的組件
2. **Props 介面**: 明確定義組件的 Props
3. **狀態管理**: 區分本地狀態和全域狀態
4. **效能最佳化**: 使用 React.memo 和 useCallback

### 狀態管理
1. **不可變性**: 始終返回新的狀態對象
2. **正規化**: 保持狀態結構扁平
3. **側邊效應**: 使用 Saga 處理複雜的異步邏輯
4. **型別安全**: 為所有 action 和 state 定義型別

### 效能最佳化
1. **懶載入**: 使用 React.lazy 進行程式碼分割
2. **圖片最佳化**: 壓縮圖片文件
3. **Bundle 分析**: 定期分析 bundle 大小
4. **記憶化**: 適當使用 useMemo 和 useCallback

## 🔧 故障排除

### 常見錯誤

#### 1. npm install 失敗
```bash
# 清除 npm 快取
npm cache clean --force

# 刪除 node_modules 重新安裝
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScript 編譯錯誤
```bash
# 檢查 TypeScript 版本
npm list typescript

# 重新安裝 TypeScript
npm install -D typescript@latest
```

#### 3. Electron 啟動失敗
```bash
# 檢查 Electron 版本
npm list electron

# 重建 Electron
npm run electron:rebuild
```

#### 4. 熱重載不工作
```bash
# 檢查 Vite 配置
# 確保 vite.config.ts 配置正確
```

### 除錯技巧

1. **查看日誌**
   ```bash
   # 查看詳細的 npm 日誌
   npm run dev --verbose
   ```

2. **清理建置**
   ```bash
   # 清理所有建置檔案
   npm run clean
   npm run build
   ```

3. **檢查相依性**
   ```bash
   # 檢查過時的套件
   npm outdated
   
   # 更新套件
   npm update
   ```

## 🤝 貢獻指南

我們歡迎社群的貢獻！請遵循以下指南：

### 報告問題
1. 搜尋現有的 Issues
2. 使用 Issue 模板
3. 提供詳細的錯誤資訊
4. 包含復現步驟

### 提交程式碼
1. Fork 專案
2. 建立功能分支
3. 遵循程式碼風格
4. 撰寫測試
5. 提交 Pull Request

### 程式碼風格
- 使用 ESLint 和 Prettier
- 遵循 TypeScript 最佳實踐
- 撰寫有意義的 commit 訊息
- 添加適當的註解

## 📄 授權

本專案採用 MIT 授權條款。詳見 [LICENSE](LICENSE) 檔案。

## 🙏 致謝

感謝以下開源專案：
- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)

---

## 📞 支援

如果您遇到問題或需要協助：

1. 📖 查看本文件
2. 🔍 搜尋 Issues
3. 💬 建立新的 Issue
4. 📧 聯繫維護者

**享受使用 Electron + React 建構應用程式的樂趣！** 🚀
