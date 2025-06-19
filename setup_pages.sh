#!/bin/bash

# 頁面和主應用程式設置腳本
# 建立儀表板、商家管理頁面和主應用程式檔案

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
    echo "錯誤: 請提供專案名稱"
    exit 1
fi

cd $PROJ_NAME

echo "📄 建立頁面和主應用程式..."

# 1. 儀表板頁面
echo "📊 建立儀表板頁面..."
cat > src/pages/DashboardPage.tsx << 'EOF'
// 儀表板頁面 - 遵循 SRP 原則，只負責展示統計資訊

import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
} from '@mui/material'
import {
  TrendingUp,
  People,
  Store,
  AttachMoney,
} from '@mui/icons-material'
import AppLayout from '../layouts/AppLayout'
import { useUser } from '../hooks/useRedux'

// 統計卡片資料
const statsData = [
  {
    title: '總收入',
    value: 'NT$ 125,430',
    change: '+12.5%',
    icon: <AttachMoney />,
    color: '#4caf50',
  },
  {
    title: '活躍商家',
    value: '342',
    change: '+8.2%',
    icon: <Store />,
    color: '#2196f3',
  },
  {
    title: '使用者數量',
    value: '1,234',
    change: '+15.3%',
    icon: <People />,
    color: '#ff9800',
  },
  {
    title: '成長率',
    value: '23.1%',
    change: '+5.4%',
    icon: <TrendingUp />,
    color: '#9c27b0',
  },
]

/**
 * 統計卡片組件
 */
const StatsCard: React.FC<{
  title: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
}> = ({ title, value, change, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {change} 較上月
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" component="div" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
)

/**
 * 儀表板頁面組件
 */
const DashboardPage: React.FC = () => {
  const user = useUser()

  return (
    <AppLayout title="儀表板">
      <Box>
        {/* 歡迎訊息 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            歡迎回來，{user?.name || '使用者'}！
          </Typography>
          <Typography variant="body1" color="text.secondary">
            這是您的系統概覽，查看最新的業務統計資訊。
          </Typography>
        </Box>

        {/* 統計卡片 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </Box>

        {/* 進度指標 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                月度目標進度
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">銷售目標</Typography>
                  <Typography variant="body2">75%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">使用者增長</Typography>
                  <Typography variant="body2">60%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={60} sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">商家拓展</Typography>
                  <Typography variant="body2">85%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                系統狀態
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">伺服器負載</Typography>
                  <Typography variant="body2" color="success.main">正常</Typography>
                </Box>
                <LinearProgress variant="determinate" value={35} color="success" sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">資料庫效能</Typography>
                  <Typography variant="body2" color="warning.main">良好</Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} color="warning" sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">API 回應時間</Typography>
                  <Typography variant="body2" color="success.main">優秀</Typography>
                </Box>
                <LinearProgress variant="determinate" value={90} color="success" />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AppLayout>
  )
}

export default DashboardPage
EOF

# 2. 商家管理頁面
echo "🏪 建立商家管理頁面..."
cat > src/pages/MerchantsPage.tsx << 'EOF'
// 商家管理頁面 - 遵循 SRP 原則，負責商家列表管理和篩選功能

import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Rating,
  InputAdornment,
  Pagination,
  Avatar,
} from '@mui/material'
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material'
import AppLayout from '../layouts/AppLayout'
import { MOCK_MERCHANTS, MERCHANT_CATEGORIES, MERCHANT_STATUS_OPTIONS, getCategoryLabel, getStatusInfo, formatDate } from '../utils/mockData'
import type { MerchantFilters } from '../types'

// 自定義 useForm hook - 遵循 SRP 原則，專責表單狀態管理
const useForm = (options: { initialValues: MerchantFilters }) => {
  const [values, setValues] = useState<MerchantFilters>(options.initialValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return { values, handleChange, handleSelectChange }
}

/**
 * 商家卡片組件
 */
const MerchantCard: React.FC<{ merchant: typeof MOCK_MERCHANTS[0] }> = ({ merchant }) => {
  const statusInfo = getStatusInfo(merchant.status)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            {merchant.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {merchant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getCategoryLabel(merchant.category)}
            </Typography>
          </Box>
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={merchant.rating} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {merchant.rating} ({merchant.reviewCount} 評價)
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {merchant.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2">{merchant.email}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2">{merchant.phone}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
          <Typography variant="body2">{merchant.address}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            建立：{formatDate(merchant.createdAt)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            更新：{formatDate(merchant.updatedAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

/**
 * 商家管理頁面組件
 */
const MerchantsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // 篩選表單
  const { values: filters, handleChange, handleSelectChange } = useForm({
    initialValues: {
      search: '',
      category: '',
      status: '',
    },
  })

  // 篩選和分頁邏輯
  const filteredMerchants = useMemo(() => {
    return MOCK_MERCHANTS.filter((merchant) => {
      const matchesSearch = !filters.search || 
        merchant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        merchant.description.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCategory = !filters.category || merchant.category === filters.category
      const matchesStatus = !filters.status || merchant.status === filters.status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [filters])

  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMerchants = filteredMerchants.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  return (
    <AppLayout title="商家管理">
      <Box>
        {/* 頁面標題 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            商家管理
          </Typography>
          <Typography variant="body1" color="text.secondary">
            管理和查看所有註冊的商家資訊
          </Typography>
        </Box>

        {/* 篩選控制項 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <TextField
                fullWidth
                name="search"
                label="搜尋商家"
                value={filters.search}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControl fullWidth>
                <InputLabel>類別</InputLabel>
                <Select
                  name="category"
                  value={filters.category}
                  label="類別"
                  onChange={handleSelectChange}
                >
                  {MERCHANT_CATEGORIES.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>狀態</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  label="狀態"
                  onChange={handleSelectChange}
                >
                  {MERCHANT_STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* 結果統計 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            找到 {filteredMerchants.length} 個商家
          </Typography>
        </Box>

        {/* 商家列表 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          {paginatedMerchants.map((merchant: typeof MOCK_MERCHANTS[0]) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </Box>

        {/* 分頁控制項 */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </AppLayout>
  )
}

export default MerchantsPage
EOF

# 3. 設定頁面
echo "⚙️ 建立設定頁面..."
cat > src/pages/SettingsPage.tsx << 'EOF'
import React from 'react'
import {
  Box,
  Typography,
} from '@mui/material'
import AppLayout from '../layouts/AppLayout'

// 設定頁面 - 遵循單一職責原則，只負責設定頁面顯示
const SettingsPage: React.FC = () => {
  return (
    <AppLayout title="設定">
      <Box 
        sx={{ 
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          Setting Page
        </Typography>
      </Box>
    </AppLayout>
  )
}

export default SettingsPage
EOF

echo "✅ 頁面建立完成!" 