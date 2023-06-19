// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// _mock
import {
  _analyticTraffic,
} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
// api
import api from 'src/api';
import { useState,useEffect } from 'react';

import AnalyticsCurrentVisits from '../analytics-current-visits';

import AnalyticsWebsiteVisits from '../analytics-website-visits';
import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AnalyticsTrafficBySite from '../analytics-traffic-by-site';
import AnalyticsConversionRates from '../analytics-conversion-rates';

// ----------------------------------------------------------------------



export default function OverviewAnalyticsView() {

  const monthlyAnalatics = (selectedMonth) => analytics?.filter(e=>{
      const [day, month, year] = e.date.split('-');
      const date = new Date(`${year}-${month}-${day}`);
      return date.getMonth() ===selectedMonth; 
    } )?.reduce((a,b)=>a+b.view,0)

    const monlthyNewProfiles = (selectedMonth) => ads.filter(e=>{
        const date = new Date(e.createdAt);
        return date.getMonth() === selectedMonth
      }).length
    



  const settings = useSettingsContext();
  
  const [analytics, setAnalytics] = useState([])
  const [ads, setAds] = useState([])
  const [user, setUser] = useState([])
  const [payment, setPayment] = useState([])
  
  useEffect(() => {
    api.get('analytics').then(res=>setAnalytics(res.data))
    api.get('ads/get-all-ads').then(res=>setAds(res.data))
    api.get('user').then(res=>setUser(res.data))
    api.get('payment').then(res=>setPayment(res.data))

  }, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Profiles"
            total={ads.length}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total User"
            total={user.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Website Visited"
            total={analytics.reduce((a,b)=>a+b.view,0) || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Bid"
            total={payment.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
              ],
              series: [
                {
                  name: 'Website Visit',
                  type: 'column',
                  fill: 'solid',
                  data: [
                    monthlyAnalatics(0),
                    monthlyAnalatics(1),
                    monthlyAnalatics(2),
                    monthlyAnalatics(3),
                    monthlyAnalatics(4),
                    monthlyAnalatics(5),
                    monthlyAnalatics(6),
                    monthlyAnalatics(7),
                    monthlyAnalatics(8),
                    monthlyAnalatics(9),
                    monthlyAnalatics(10),
                    monthlyAnalatics(11),],
                },
                {
                  name: 'Revenue',
                  type: 'area',
                  fill: 'gradient',
                  data: [220, 0, 320, 40, 400, 0, 0, 0, 0, 0, 0, 0],
                },
                {
                  name: 'New Profiles',
                  type: 'line',
                  fill: 'solid',
                  data: [
                    monlthyNewProfiles(0),
                    monlthyNewProfiles(1),
                    monlthyNewProfiles(2),
                    monlthyNewProfiles(3),
                    monlthyNewProfiles(4),
                    monlthyNewProfiles(5),
                    monlthyNewProfiles(6),
                    monlthyNewProfiles(7),
                    monlthyNewProfiles(8),
                    monlthyNewProfiles(9),
                    monlthyNewProfiles(10),
                    monlthyNewProfiles(11),
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Profiles by Country"
            chart={{
              series: [
                { label: 'UAE', value: 32 },
                { label: 'UK', value: 0 },
                { label: 'Thailand', value: 0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Total revenue by Country"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'UAE', value: 360 },
                { label: 'UK', value: 0 },
                { label: 'Thailand', value: 0 },
                // { label: 'India', value: 470 },
                // { label: 'US', value: 540 },
                // { label: 'South Korea', value: 580 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Traffic by Site" list={_analyticTraffic} />
        </Grid>
      </Grid>
    </Container>
  );
}
