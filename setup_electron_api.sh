#!/bin/bash

# Electron API 和服務層設置腳本
# 建立 HTTP 客戶端和業務服務

PROJ_NAME=$1

echo "🌐 設置 API 層和服務..."

cd src

# 建立 apis/httpClient.ts
cat > apis/httpClient.ts << 'EOF'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// HTTP 客戶端配置
const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
httpClient.interceptors.request.use(
  (config) => {
    // 可以在這裡添加認證 token 等
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 記錄請求
    console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('[HTTP] Request error:', error);
    return Promise.reject(error);
  }
);

// 回應攔截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 記錄成功回應
    console.log(`[HTTP] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // 統一錯誤處理
    console.error('[HTTP] Response error:', error);
    
    if (error.response?.status === 401) {
      // 處理未授權錯誤
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default httpClient;
EOF

# 建立 apis/userApi.ts
cat > apis/userApi.ts << 'EOF'
import httpClient from './httpClient';
import { User, ApiResponse } from '../types';

export const userApi = {
  // 獲取用戶資料
  getUser: async (userId: string): Promise<User> => {
    const response = await httpClient.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data.data;
  },

  // 獲取所有用戶
  getUsers: async (): Promise<User[]> => {
    const response = await httpClient.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  },

  // 建立用戶
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await httpClient.post<ApiResponse<User>>('/users', userData);
    return response.data.data;
  },

  // 更新用戶
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    const response = await httpClient.put<ApiResponse<User>>(`/users/${userId}`, userData);
    return response.data.data;
  },

  // 刪除用戶
  deleteUser: async (userId: string): Promise<void> => {
    await httpClient.delete(`/users/${userId}`);
  },
};
EOF

# 建立 apis/index.ts
cat > apis/index.ts << 'EOF'
export { default as httpClient } from './httpClient';
export * from './userApi';
EOF

# 建立 services/userService.ts
cat > services/userService.ts << 'EOF'
import { userApi } from '../apis';
import { User } from '../types';
import { delay } from '../utils';

export const userService = {
  // 獲取用戶資料 (包含緩存和錯誤處理)
  fetchUserFromApi: async (userId: string): Promise<User> => {
    try {
      // 模擬網路延遲
      await delay(500);
      
      // 實際環境中這裡會調用真實的 API
      // return await userApi.getUser(userId);
      
      // 模擬數據 (開發階段使用)
      const mockUser: User = {
        id: userId,
        name: `用戶 ${userId}`,
        email: `user${userId}@example.com`,
        avatar: `https://i.pravatar.cc/150?u=${userId}`,
      };
      
      return mockUser;
    } catch (error: any) {
      console.error('Failed to fetch user:', error);
      throw new Error(error.message || '獲取用戶資料失敗');
    }
  },

  // 獲取用戶列表
  fetchUsers: async (): Promise<User[]> => {
    try {
      await delay(300);
      
      // 模擬數據
      const mockUsers: User[] = [
        {
          id: '1',
          name: '張三',
          email: 'zhang@example.com',
          avatar: 'https://i.pravatar.cc/150?u=1',
        },
        {
          id: '2',
          name: '李四',
          email: 'li@example.com',
          avatar: 'https://i.pravatar.cc/150?u=2',
        },
        {
          id: '3',
          name: '王五',
          email: 'wang@example.com',
          avatar: 'https://i.pravatar.cc/150?u=3',
        },
      ];
      
      return mockUsers;
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      throw new Error(error.message || '獲取用戶列表失敗');
    }
  },

  // 建立用戶
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      await delay(500);
      
      // 模擬建立用戶
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
      };
      
      return newUser;
    } catch (error: any) {
      console.error('Failed to create user:', error);
      throw new Error(error.message || '建立用戶失敗');
    }
  },

  // 更新用戶
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      await delay(400);
      
      // 模擬更新用戶
      const updatedUser: User = {
        id: userId,
        name: userData.name || `用戶 ${userId}`,
        email: userData.email || `user${userId}@example.com`,
        avatar: userData.avatar || `https://i.pravatar.cc/150?u=${userId}`,
      };
      
      return updatedUser;
    } catch (error: any) {
      console.error('Failed to update user:', error);
      throw new Error(error.message || '更新用戶失敗');
    }
  },
};
EOF

# 建立 services/electronService.ts
cat > services/electronService.ts << 'EOF'
// Electron 特定服務
export const electronService = {
  // 檢查是否在 Electron 環境中
  isElectron: (): boolean => {
    return !!(window as any).electronAPI;
  },

  // 獲取 Electron 版本資訊
  getVersions: () => {
    if (typeof process !== 'undefined' && process.versions) {
      return {
        electron: process.versions.electron || 'N/A',
        node: process.versions.node || 'N/A',
        chrome: process.versions.chrome || 'N/A',
      };
    }
    return {
      electron: 'N/A',
      node: 'N/A',
      chrome: 'N/A',
    };
  },

  // 開啟外部連結
  openExternal: (url: string) => {
    if (electronService.isElectron()) {
      // 在 Electron 中使用 shell.openExternal
      window.open(url, '_blank');
    } else {
      // 在瀏覽器中正常開啟
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  },

  // 顯示訊息對話框
  showMessageBox: async (message: string, type: 'info' | 'warning' | 'error' = 'info') => {
    if (electronService.isElectron()) {
      // 這裡可以調用 Electron 的 dialog API
      alert(message); // 暫時使用 alert
    } else {
      alert(message);
    }
  },

  // 獲取應用程式路徑
  getAppPath: (): string => {
    if (electronService.isElectron() && (window as any).electronAPI?.getAppPath) {
      return (window as any).electronAPI.getAppPath();
    }
    return '/';
  },

  // 最小化視窗
  minimizeWindow: () => {
    if (electronService.isElectron() && (window as any).electronAPI?.minimizeWindow) {
      (window as any).electronAPI.minimizeWindow();
    }
  },

  // 最大化視窗
  maximizeWindow: () => {
    if (electronService.isElectron() && (window as any).electronAPI?.maximizeWindow) {
      (window as any).electronAPI.maximizeWindow();
    }
  },

  // 關閉視窗
  closeWindow: () => {
    if (electronService.isElectron() && (window as any).electronAPI?.closeWindow) {
      (window as any).electronAPI.closeWindow();
    }
  },
};
EOF

# 建立 services/index.ts
cat > services/index.ts << 'EOF'
export * from './userService';
export * from './electronService';
EOF

echo "✅ API 層和服務設置完成:"
echo "   🌐 HTTP Client - Axios 配置和攔截器"
echo "   👤 User API - 用戶相關 API 接口"
echo "   🔧 User Service - 業務邏輯服務"
echo "   ⚡ Electron Service - Electron 特定服務"
echo "   📦 服務索引檔案"

cd - > /dev/null 