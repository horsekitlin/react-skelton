// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'constants';

// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid size={12}>
                    <Grid container spacing={gridSpacing} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid size={'grow'} sx={{ minWidth: 0 }}>
                            <Grid container spacing={1}>
                                <Grid size={12}>
                                    <Skeleton variant="text" />
                                </Grid>
                                <Grid size={12}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Skeleton variant="rectangular" height={50} width={80} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <Skeleton variant="rectangular" height={530} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default TotalGrowthBarChart;
