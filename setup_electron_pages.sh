#!/bin/bash

# Electron 頁面設置腳本
# 建立應用程式的主要頁面

PROJ_NAME=$1

echo "📄 建立應用程式頁面..."

cd src

# 建立 pages/home/HomePage.tsx
cat > pages/home/HomePage.tsx << 'EOF'
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Computer, Speed, Security } from '@mui/icons-material';
import { Counter } from '../../components';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          HomePage
        </Typography>
        
        <Typography variant="h6" component="p" align="center" color="text.secondary" paragraph>
          現代化的桌面應用程式，整合 React、TypeScript、Material-UI 和 Redux
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Computer sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                  <Typography variant="h5" component="div">
                    跨平台
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  支援 Windows、macOS 和 Linux，一次開發，處處運行。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Speed sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                  <Typography variant="h5" component="div">
                    高效能
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  基於 Electron 和 Vite，享受快速的開發體驗和優異的運行效能。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Security sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                  <Typography variant="h5" component="div">
                    安全性
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  內建安全機制，包括 Context Isolation 和 Process Sandboxing。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Redux 計數器示例
          </Typography>
          <Counter />
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => window.open('https://electronjs.org', '_blank')}
          >
            瞭解更多關於 Electron
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
EOF

# 建立 pages/home/index.ts
cat > pages/home/index.ts << 'EOF'
export { default as HomePage } from './HomePage';
EOF

# 建立 pages/about/AboutPage.tsx
cat > pages/about/AboutPage.tsx << 'EOF'
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const technologies = [
  'Electron',
  'React',
  'TypeScript',
  'Material-UI',
  'Redux Toolkit',
  'Redux Saga',
  'React Router',
  'Vite',
  'ESLint',
  'Prettier',
];

const features = [
  '現代化的 React 18 支援',
  'TypeScript 型別安全',
  'Material-UI 設計系統',
  'Redux 狀態管理',
  'React Router 路由',
  '熱重載開發',
  '跨平台建置',
  '自動更新機制',
  '程式碼格式化',
  'Electron 安全機制',
];

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Page
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            技術棧
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {technologies.map((tech) => (
              <Chip key={tech} label={tech} color="primary" variant="outlined" />
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            主要功能
          </Typography>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            版本資訊
          </Typography>
          <Typography variant="body1" paragraph>
            應用程式版本: 1.0.0
          </Typography>
          {(() => {
            try {
              const processVersions = (globalThis as { process?: { versions?: Record<string, string> } }).process?.versions;
              if (processVersions) {
                return (
                  <>
                    <Typography variant="body1" paragraph>
                      Electron 版本: {processVersions.electron || 'N/A'}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Node.js 版本: {processVersions.node || 'N/A'}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Chrome 版本: {processVersions.chrome || 'N/A'}
                    </Typography>
                  </>
                );
              }
            } catch (error) {
              // process 不可用
            }
            return (
              <Typography variant="body2" color="text.secondary" paragraph>
                版本資訊僅在 Electron 環境中可用
              </Typography>
            );
          })()}
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutPage;
EOF

# 建立 pages/about/index.ts
cat > pages/about/index.ts << 'EOF'
export { default as AboutPage } from './AboutPage';
EOF

# 建立 pages/settings/SettingsPage.tsx
cat > pages/settings/SettingsPage.tsx << 'EOF'
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTheme, setSidebarOpen } from '../../reducers/appReducer';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { theme, sidebarOpen } = useSelector((state: RootState) => state.app);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(event.target.checked ? 'dark' : 'light'));
  };

  const handleSidebarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSidebarOpen(event.target.checked));
  };

  const handleResetSettings = () => {
    dispatch(setTheme('light'));
    dispatch(setSidebarOpen(false));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Setting Page
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            外觀設置
          </Typography>
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={theme === 'dark'}
                  onChange={handleThemeChange}
                />
              }
              label="深色主題"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={sidebarOpen}
                  onChange={handleSidebarChange}
                />
              }
              label="顯示側邊欄"
            />
          </FormGroup>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            應用程式資訊
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            這是一個基於 Electron 的示例應用程式，展示了現代前端技術的整合。
          </Alert>

          <Typography variant="body1" paragraph>
            此應用程式使用 React、TypeScript、Material-UI 和 Redux 建構，
            提供了完整的狀態管理、路由導航和響應式設計。
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            重置設置
          </Typography>
          
          <Typography variant="body2" paragraph color="text.secondary">
            點擊下方按鈕將重置所有設置為預設值。
          </Typography>
          
          <Button 
            variant="outlined" 
            color="warning"
            onClick={handleResetSettings}
          >
            重置所有設置
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SettingsPage;
EOF

# 建立 pages/settings/index.ts
cat > pages/settings/index.ts << 'EOF'
export { default as SettingsPage } from './SettingsPage';
EOF

# 建立 pages/index.ts
cat > pages/index.ts << 'EOF'
export * from './home';
export * from './about';
export * from './settings';
EOF

echo "✅ 應用程式頁面建立完成:"
echo "   🏠 HomePage - 主頁面，包含計數器示例"
echo "   ℹ️ AboutPage - 關於頁面，顯示技術棧和版本資訊"
echo "   ⚙️ SettingsPage - 設置頁面，包含主題和偏好設定"
echo "   📦 頁面索引檔案"

cd - > /dev/null 