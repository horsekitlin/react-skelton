import { lazy, Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

// ApexCharts 核心約 800 kB，延遲載入讓頁面其他內容先顯示
const Chart = lazy(() => import('./ApexChartCore'));

const ApexChart = (props) => (
    <Suspense fallback={<Skeleton variant="rounded" height={props.height} />}>
        <Chart {...props} />
    </Suspense>
);

export default ApexChart;
