#!/bin/bash

# Electron 應用程式主檔案設置腳本
# 設置 App.tsx、main.tsx 和主題系統

PROJ_NAME=$1

echo "⚙️ 設置應用程式主檔案..."

cd src

# 建立 theme/index.ts
cat > theme/index.ts << 'EOF'
import { createTheme, ThemeOptions } from '@mui/material/styles';

// 基本調色板
const palette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  },
  secondary: {
    main: '#dc004e',
    light: '#ff6584',
    dark: '#9a0036',
  },
};

// 亮色主題
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...palette,
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
};

// 暗色主題
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...palette,
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: lightThemeOptions.typography,
  components: lightThemeOptions.components,
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
EOF

# 建立 layouts/MainLayout.tsx
cat > layouts/MainLayout.tsx << 'EOF'
import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { lightTheme, darkTheme } from '../theme';
import { Header, Sidebar } from '../components';

const MainLayout: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.app);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
EOF

# 建立 layouts/index.ts
cat > layouts/index.ts << 'EOF'
export { default as MainLayout } from './MainLayout';
EOF

# 建立 utils/constants.ts
cat > utils/constants.ts << 'EOF'
// 應用程式常數
export const APP_NAME = 'Electron React App';
export const APP_VERSION = '1.0.0';

// 路由常數
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
} as const;

// 主題常數
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// API 常數
export const API_ENDPOINTS = {
  USERS: '/api/users',
  SETTINGS: '/api/settings',
} as const;

// 本地存儲 keys
export const STORAGE_KEYS = {
  THEME: 'app_theme',
  SIDEBAR_STATE: 'sidebar_state',
  USER_PREFERENCES: 'user_preferences',
} as const;
EOF

# 建立 utils/helpers.ts
cat > utils/helpers.ts << 'EOF'
import { STORAGE_KEYS } from './constants';

// 本地存儲輔助函數
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// 日期輔助函數
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// 延遲函數
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 防抖函數
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 節流函數
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
EOF

# 建立 utils/index.ts
cat > utils/index.ts << 'EOF'
export * from './constants';
export * from './helpers';
EOF

# 建立 App.tsx
cat > App.tsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainLayout } from './layouts';
import { HomePage, AboutPage, SettingsPage } from './pages';
import { ErrorMessage } from './components';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route 
              path="*" 
              element={
                <ErrorMessage 
                  title="頁面未找到"
                  message="您訪問的頁面不存在，請檢查 URL 或返回首頁。"
                  severity="warning"
                />
              } 
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
EOF

# 更新 main.tsx
cat > main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 移除載入畫面
const splash = document.getElementById('splash');
if (splash) {
  splash.remove();
}
EOF

echo "✅ 應用程式主檔案設置完成:"
echo "   📱 App.tsx - 主應用程式組件，包含路由設置"
echo "   🚀 main.tsx - 應用程式入口點"
echo "   🎨 Theme system - 亮色和暗色主題"
echo "   🏗️ MainLayout - 主要布局組件"
echo "   🛠️ Utils - 常數和輔助函數"

cd - > /dev/null 