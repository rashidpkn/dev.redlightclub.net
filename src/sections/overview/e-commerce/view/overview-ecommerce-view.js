import { useEffect, useState } from 'react';
import api from 'src/api';

// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

// _mock
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';

//


import EcommerceYearlySales from '../ecommerce-yearly-sales';
import EcommerceBestSalesman from '../ecommerce-best-salesman';
import EcommerceSaleByGender from '../ecommerce-sale-by-gender';
import EcommerceWidgetSummary from '../ecommerce-widget-summary';

// ----------------------------------------------------------------------

export default function OverviewEcommerceView() {

  const [ads, setAds] = useState([])
  const [payment, setPayment] = useState([])

  useEffect(() => {  
  api.get('ads/get-all-ads').then(res=>setAds(res.data))
  api.get('payment').then(res=>setPayment(res.data))
  }, [])
  
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Platinum"
            percent={2.6}
            total={payment.filter(e=>e.bid.tier==='platinum').length}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Gold"
            percent={-0.1}
            total={payment.filter(e=>e.bid.tier==='gold').length}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Silver"
            percent={0.6}
            total={payment.filter(e=>e.bid.tier==='silver').length}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EcommerceSaleByGender
            title="Ads by Country"
            total={32}
            chart={{
              series: [
                { label: 'UAE', value: 100 },
                { label: 'UK', value: 0 },
                { label: 'Thailand', value: 0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceYearlySales
            title="Yearly Sales"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Total Income',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Total Expenses',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Total Income',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Total Expenses',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

  
        <Grid xs={12} md={6} lg={8}>
          <EcommerceBestSalesman
            title="Best Profiles"
            tableData={ads.sort((a, b) => b.view - a.view)}
            tableLabels={[
              { id: 'adsTitle', label: 'Profile' },
              { id: 'type', label: 'Type' },
              { id: 'nationality', label: 'Country', align: 'center' },
              { id: 'view', label: 'Total Visitors', align: 'right' },
              { id: 'rank', label: 'Rank', align: 'right' },
            ]}
          />
        </Grid>

      
      </Grid>
    </Container>
  );
}
