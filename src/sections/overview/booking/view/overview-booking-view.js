// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from 'src/_mock';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from 'src/assets/illustrations';
// components
import { useSettingsContext } from 'src/components/settings';
import { useEffect, useState } from 'react';
//
import FileDataActivity from 'src/sections/file-manager/file-data-activity';
import api from 'src/api';

import BookingBooked from '../booking-booked';
import BookingNewest from '../booking-newest';
import BookingDetails from '../booking-details';
import BookingAvailable from '../booking-available';
import BookingStatistics from '../booking-statistics';
import BookingTotalIncomes from '../booking-total-incomes';
import BookingWidgetSummary from '../booking-widget-summary';
import BookingCheckInWidgets from '../booking-check-in-widgets';
import BookingCustomerReviews from '../booking-customer-reviews';


// ----------------------------------------------------------------------

const SPACING = 3;

export default function OverviewBookingView() {
  const [state, setState] = useState({
    active: 0,
    totalBid: 0,
    customer: 0,
    totalIncome:0
  })

  const [activeAds, setActiveAds] = useState(0)
  const [totalBid, setTotalBid] = useState(0)
  const [customer, setCustomer] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)

  

  const theme = useTheme();

  const settings = useSettingsContext();

  

  useEffect(() => {
    api.get('ads/get-all-ads').then(
      res => {
        setActiveAds(23)
        // setActiveAds(res.data.length )
      }
    )
    api.get('payment').then(res=>{
      setTotalBid(res.data.length)
      
      setTotalIncome(res.data.reduce((a,b)=>a+b.amount,0))
        // totalIncome:res.data.reduce((a,b)=>a+b.amount)
      
      
    })

    api.get('user').then(res=>{
      setCustomer(res.data.length)
      
    })
    // eslint-disable-next-line
  }, [])



  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Active Profiles"
            total={activeAds}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Total bids" total={totalBid} icon={<CheckInIllustration />} />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="customers" total={customer} icon={<CheckOutIllustration />} />
        </Grid>

        <Grid container xs={12}>
          <Grid container xs={12} md={8}>
            <Grid xs={12} md={6}>
              <BookingTotalIncomes
                title="Total Incomes"
                total={totalIncome}
                percent={2.6}
                chart={{
                  series: [
                    { x: 2016, y: 111 },
                    { x: 2017, y: 136 },
                    { x: 2018, y: 76 },
                    { x: 2019, y: 108 },
                    { x: 2020, y: 74 },
                    { x: 2021, y: 54 },
                    { x: 2022, y: 57 },
                    { x: 2023, y: 84 },
                  ],
                }}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <BookingBooked title="Ads statistics" data={_bookingsOverview} />
            </Grid>

            <Grid xs={12}>
              <BookingCheckInWidgets
                chart={{
                  series: [
                    { label: 'Bid sold', percent: 72, total: 38566 },
                    { label: 'Pending for payment', percent: 64, total: 18472 },
                  ],
                }}
              />
            </Grid>

            <Grid xs={12} md={12} lg={12}>
              <FileDataActivity
                title="Profile Activity"

                chart={{
                  labels: {
                    week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
                    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    year: ['2018', '2019', '2020', '2021', '2022'],
                  },
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.error.main,
                    theme.palette.warning.main,
                    theme.palette.text.disabled,
                  ],
                  series: [
                    {
                      type: 'Week',
                      data: [
                        { name: 'Profile created', data: [20, 34, 48, 65, 37, 48] },
                        { name: 'Rejected', data: [10, 34, 13, 26, 27, 28] },
                        { name: 'Verified', data: [10, 14, 13, 16, 17, 18] },
                        { name: 'Spot bidded', data: [5, 12, 6, 7, 8, 9] },
                      ],
                    },
                    {
                      type: 'Month',
                      data: [
                        { name: 'Profile created', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                        { name: 'Rejected', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                        { name: 'Verified', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                        { name: 'Spot bidded', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      ],
                    },
                    {
                      type: 'Year',
                      data: [
                        { name: 'Profile created', data: [10, 34, 13, 56, 77] },
                        { name: 'Rejected', data: [10, 34, 13, 56, 77] },
                        { name: 'Verified', data: [10, 34, 13, 56, 77] },
                        { name: 'Spot bidded', data: [10, 34, 13, 56, 77] },
                      ],
                    },
                  ],
                }}
              />


            </Grid>
          </Grid>

          <Grid xs={12} md={4}>
            <BookingAvailable
              title="Slot available"
              chart={{
                series: [
                  { label: 'Sold out', value: 2 },
                  { label: 'Available', value: 16 },
                ],
              }}
            />

          </Grid>
        </Grid>




      </Grid>
    </Container>
  );
}
