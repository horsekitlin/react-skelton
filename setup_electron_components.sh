#!/bin/bash

# React 組件設置腳本
# 建立基礎的 React 組件

PROJ_NAME=$1

echo "🧩 建立基礎 React 組件..."

cd src

# 建立 components/common/LoadingSpinner.tsx
cat > components/common/LoadingSpinner.tsx << 'EOF'
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = '載入中...', 
  size = 40 
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
EOF

# 建立 components/common/ErrorMessage.tsx
cat > components/common/ErrorMessage.tsx << 'EOF'
import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorMessageProps {
  title?: string;
  message: string;
  severity?: 'error' | 'warning' | 'info';
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  severity = 'error',
  onClose,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={severity} onClose={onClose}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
EOF

# 建立 components/layout/Header.tsx
cat > components/layout/Header.tsx << 'EOF'
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTheme, toggleSidebar } from '../../reducers/appReducer';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.app);

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Electron React App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
                icon={<Brightness7 />}
                checkedIcon={<Brightness4 />}
              />
            }
            label=""
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
EOF

# 建立 components/layout/Sidebar.tsx
cat > components/layout/Sidebar.tsx << 'EOF'
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import {
  Home,
  Info,
  Settings,
  Dashboard,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSidebarOpen } from '../../reducers/appReducer';

const drawerWidth = 240;

const menuItems = [
  { text: '首頁', icon: <Home />, path: '/' },
  { text: '儀表板', icon: <Dashboard />, path: '/dashboard' },
  { text: '關於', icon: <Info />, path: '/about' },
  { text: '設置', icon: <Settings />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.app);

  const handleItemClick = (path: string) => {
    navigate(path);
    dispatch(setSidebarOpen(false));
  };

  const handleClose = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary"
      anchor="left"
      open={sidebarOpen}
      onClose={handleClose}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleItemClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
EOF

# 建立 components/common/Counter.tsx
cat > components/common/Counter.tsx << 'EOF'
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Box,
  CircularProgress,
} from '@mui/material';
import { Add, Remove, Refresh } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  increment, 
  decrement, 
  reset 
} from '../../reducers/counterReducer';
import { incrementAsync, decrementAsync } from '../../actions';

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const { value, loading } = useSelector((state: RootState) => state.counter);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleIncrementAsync = () => {
    dispatch(incrementAsync());
  };

  const handleDecrementAsync = () => {
    dispatch(decrementAsync());
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom align="center">
          計數器
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Typography variant="h2" component="div" sx={{ mr: 2 }}>
            {value}
          </Typography>
          {loading && <CircularProgress size={24} />}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ButtonGroup variant="contained" fullWidth>
            <Button 
              onClick={handleDecrement} 
              startIcon={<Remove />}
              disabled={loading}
            >
              減少
            </Button>
            <Button 
              onClick={handleIncrement} 
              startIcon={<Add />}
              disabled={loading}
            >
              增加
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" fullWidth>
            <Button 
              onClick={handleDecrementAsync} 
              disabled={loading}
            >
              異步減少
            </Button>
            <Button 
              onClick={handleIncrementAsync} 
              disabled={loading}
            >
              異步增加
            </Button>
          </ButtonGroup>

          <Button 
            variant="text" 
            onClick={handleReset} 
            startIcon={<Refresh />}
            disabled={loading}
            fullWidth
          >
            重置
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Counter;
EOF

# 建立 components/common/index.ts
cat > components/common/index.ts << 'EOF'
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ErrorMessage } from './ErrorMessage';
export { default as Counter } from './Counter';
EOF

# 建立 components/layout/index.ts
cat > components/layout/index.ts << 'EOF'
export { default as Header } from './Header';
export { default as Sidebar } from './Sidebar';
EOF

# 建立 components/index.ts
cat > components/index.ts << 'EOF'
export * from './common';
export * from './layout';
EOF

echo "✅ 基礎組件建立完成:"
echo "   🔄 Counter 組件 (包含 Redux 整合)"
echo "   ⏳ LoadingSpinner 組件"
echo "   ❌ ErrorMessage 組件"
echo "   📱 Header 和 Sidebar 組件"
echo "   📦 組件索引檔案"

cd - > /dev/null 