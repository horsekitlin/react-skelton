import Chart from 'react-apexcharts/core';

// 只註冊 Dashboard 用到的圖表類型與功能，避免把 ApexCharts 完整版打包進來
import 'apexcharts/line';
import 'apexcharts/area';
import 'apexcharts/bar';
import 'apexcharts/features/legend';
import 'apexcharts/features/toolbar';

export default Chart;
