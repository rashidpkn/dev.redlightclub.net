import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputLabel, Select, MenuItem, TextField } from '@mui/material';

// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { FormControl } from '@mui/base';
import { Icon } from '@iconify/react';

export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const [stage, setStage] = useState(1)
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
        router.push(paths.dashboard.user.list);
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [currentUser, enqueueSnackbar, reset, router]
  );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3,height:'750px',position:'relative' }}>
            {stage === 1 && <>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="name" label="Ads Title" />
                <RHFTextField name="email" label="Email" />
                <RHFTextField name="phoneNumber" label="Phone Number" />
                <RHFTextField name="language" label="Language" />
                <RHFTextField name="location" label="Location" />
                <RHFTextField name="natonality" label="Natonality" />

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>


                  <FormControl fullWidth style={{ width: '33.3333%' }}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select label="Age" labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: '100%' }}>
                      <MenuItem value=''>Select Your Age</MenuItem>
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ width: '33.3333%' }}>
                    <InputLabel id="demo-simple-select-label">Height</InputLabel>
                    <Select label="Height" labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: '100%' }}>
                      <MenuItem value=''>Select Your Height</MenuItem>
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ width: '33.3333%' }}>
                    <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                    <Select label="Weight" labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: '100%' }}>
                      <MenuItem value=''>Select Your Weight</MenuItem>
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>

                  <FormControl fullWidth style={{ width: '50%' }}>
                    <InputLabel id="demo-simple-select-label">Hair</InputLabel>
                    <Select label="Hair" labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: '100%' }}>
                      <MenuItem value=''>Select Your Hair</MenuItem>
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ width: '50%' }}>
                    <InputLabel id="demo-simple-select-label">Eye color</InputLabel>
                    <Select label="Eye color" labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: '100%' }}>
                      <MenuItem value=''>Select Your Eye color</MenuItem>
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
              </Box>
              <div style={{ width: '100%', marginTop: '25px' }}>

                <TextField label='Bio' fullWidth />
              </ div>
            </>}
            {
              stage === 2 &&
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField label='Video Url' sx={{ width: '70%' }} />
                <TextField label='Instagram' sx={{ width: '70%' }} />
                <TextField label='TikTok' sx={{ width: '70%' }} />
                <TextField label='Telegram' sx={{ width: '70%' }} />
              </div>
            }
            {
              stage === 3 &&
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel id='currencylabel'>Currency</InputLabel>
                  <Select label='Currency' labelId='currencylabel' sx={{ width: '40%' }} >
                    <MenuItem>AED</MenuItem>
                    <MenuItem>USD</MenuItem>
                    <MenuItem>Pound</MenuItem>
                  </Select>
                </FormControl>
              </div>
            }
            {
              stage === 4 &&
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <b>Profile Verification</b>
                <p>Step 1: Take a white paper and write down the unique code shown.</p>
                <div style={{ width: '140px', padding: '15px 0px', textAlign: 'center', color: '#fff', backgroundColor: 'black' }}>12b3411</div>
                <div>
                  <p>Step 2: Take a selfie clearly showing you holding the paper with unique code and your face</p>
                  <p>Step 3: Upload the image onto our website and thats it. We&apos;ll take of rest! </p>
                </div >

                <Stack direction='row' alignItems='flex-end' gap='20px'>
                  <Box sx={{ width: '70%', height: '100px', borderRadius: '8px', backgroundColor: '#f7f8f9', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '20px' }} >
                    <img src='https' width={100} height='100%' style={{ backgroundColor: 'blue' }} alt='' />
                    <div>
                      <b>Select files</b>
                      <p style={{ padding: '0px', margin: '0px' }}>
                        Drop files here or click <span style={{ color: '#00b283' }}>browse</span> <br />  thorough your machine
                      </p>
                    </div>
                  </Box>

                  <Button sx={{ backgroundColor: '#00a873', color: '#fff', fontWeight: 600 }}  >Verify</Button>
                </Stack>

                <Stack direction='row' alignItems='center' gap='20px'>
                  <TextField type='email' label='Email' sx={{ width: '70%' }} />
                  <Button sx={{ backgroundColor: '#00a873', color: '#fff', fontWeight: 600 }}  >Verify</Button>
                </Stack>

                <Stack direction='row' alignItems='center' gap='20px'>
                  <TextField type='tel' label='Phone' sx={{ width: '70%' }} />
                  <Button sx={{ backgroundColor: '#00a873', color: '#fff', fontWeight: 600 }}  >Verify</Button>
                </Stack>

              </div>
            }
            <Stack direction='row' justifyContent='space-around' gap='300px'  sx={{ mt: 3,bottom:'125px',padding:'0px 20px' }} width='100%' position='absolute' >
              <LoadingButton onClick={() => { if(stage !== 1) setStage(stage - 1) }} variant="contained" loading={isSubmitting}>
                Back
              </LoadingButton>
              <LoadingButton onClick={() => { setStage(stage + 1) }} variant="contained" loading={isSubmitting}>
                Next
              </LoadingButton>
            </Stack>

            <Stack justifyContent='center' width='100%'  position='absolute' sx={{bottom:'20px'}} >
              <Stack direction="row" justifyContent="center" gap="70px" zIndex={1} position='relative'>
                {
                  [{ number: 1, label: 'Step 1' },
                  { number: 2, label: 'Step 2' },
                  { number: 3, label: 'Step 3' },
                  { number: 4, label: 'Step 4' }].map(step => (<Stack key={step.number} alignItems="center" gap="10px" justifyContent="center">
                    <div style={{ margin: '0px', height: '25px', width: '25px', borderRadius: '999px', backgroundColor: '#00a873', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {stage > step.number ?<Icon icon='mdi:tick'  /> : <p>{step.number}</p>}
                      
                    </div>
                     <p style={{ margi: '0px' }}>{step.label}</p>
                  </Stack>))
                }

                <hr style={{ width: '50%', height: '1px', backgroundColor: '#f8f9fa', top: '4px', position: 'absolute', zIndex:'-1' }} />
              </Stack>
            </Stack>

          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};