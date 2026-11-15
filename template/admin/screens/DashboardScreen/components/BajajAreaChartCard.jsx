import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'ui-component/ApexChart';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
    const theme = useTheme();
    const orangeDark = theme.palette.secondary[800];

    const options = useMemo(
        () => ({
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                ...chartData.options.tooltip,
                theme: 'light'
            }
        }),
        [orangeDark]
    );

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid size={12}>
                    <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                Bajaj Finery
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                $1839.00
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        10% Profit
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...chartData} options={options} />
        </Card>
    );
};

export default BajajAreaChartCard;
