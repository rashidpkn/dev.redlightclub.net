// @mui
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { fShortenNumber } from 'src/utils/format-number';
import { orange, red, yellow } from '@mui/material/colors';

// ----------------------------------------------------------------------

export default function BookingBooked({ title, subheader, data,ads ,...other}) {

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
      <Stack key='Pending'>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ typography: 'overline' }}>Pending</Box>
              <Box sx={{ typography: 'subtitle1' }}>{ads?.filter(e=>e.verificationRequest).length}</Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={ads?.filter(e=>e.verificationRequest).length}
              // value={50}
              color={
                // (progress.status === 'Pending' && 'warning') ||
                // (progress.status === 'Canceled' && 'error') ||
               'warning'

              }
              
              sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
            />
          </Stack>
          <Stack key='Canceled'>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ typography: 'overline' }}>Canceled</Box>
              <Box sx={{ typography: 'subtitle1' }}>{ads?.filter(e=>!e.verificationRequest && e.verificationImage && !e.verify).length}</Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={ads?.filter(e=>!e.verificationRequest && e.verificationImage && !e.verify).length}
              // value={50}
              color={
                // (progress.status === 'Pending' && 'warning') ||
                // (progress.status === 'Canceled' && 'error') ||
                'error'
              }
              sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
            />
          </Stack>
          <Stack key='Rejected'>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ typography: 'overline' }}>Banned</Box>
              <Box sx={{ typography: 'subtitle1' }}>{ads.filter(e=>!e.visibility).length}</Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={ads.filter(e=>!e.visibility).length}
              color={
                // (progress.status === 'Pending' && 'warning') ||
                // (progress.status === 'Canceled' && 'error') ||
                'success'
              }
              sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
            />
          </Stack>

        {/* {data.map((progress) => (
          <Stack key={progress.status}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ typography: 'overline' }}>{progress.status}</Box>
              <Box sx={{ typography: 'subtitle1' }}>{fShortenNumber(progress.value)}</Box>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress.value}
              color={
                (progress.status === 'Pending' && 'warning') ||
                (progress.status === 'Canceled' && 'error') ||
                'success'
              }
              sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
            />
          </Stack>
        ))} */}
      </Stack>
    </Card>
  );
}

BookingBooked.propTypes = {
  data: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  ads:PropTypes.array
};
