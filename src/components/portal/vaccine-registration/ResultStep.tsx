import { Button, Grid, Stack, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import {
  selectVaccineRegistrationFormData,
  resetForm
} from '@src/redux/vaccineRegistrationSlice';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

const ResultStep: FC = () => {
  const router = useRouter();
  // data must be from API call after
  const submittedData = useAppSelector(selectVaccineRegistrationFormData);
  const dispatch = useAppDispatch();

  // data should be reset at confirmation step
  const resetFormData = () => {
    dispatch(resetForm());
  };

  const goToHomepage = () => {
    resetFormData();
    router.push('/');
  };

  const exportToPDF = () => {
    resetFormData();
    alert('try to export the pdf file');
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là{' '}
        <Typography component="span" variant="h5" color={red[500]}>
          0120211103501237
        </Typography>{' '}
        .
      </Typography>
      <Typography variant="body1" textAlign="center">
        Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y
        tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối
        tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ liên
        hệ với quý khách theo số điện thoại{' '}
        <Typography component="span" variant="body1" color={blue[500]}>
          0123456789
        </Typography>{' '}
        khi có kế hoạch tiêm trong thời gian sớm nhất.
      </Typography>
      <Typography variant="body1" textAlign="center">
        {`Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại`}
        <Typography component="span" variant="body1" color={red[500]}>
          https://hssk.kcb.vn/#/sskdt
        </Typography>{' '}
        để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1">Họ và tên</Typography>
          <Typography variant="body1" fontWeight={600}>
            Nguyễn Văn A
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight={600}>
            16/10/1994
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Giới tính</Typography>
          <Typography variant="body1" fontWeight={600}>
            Nam
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Số CMND/CCCD/Mã định danh công dân
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            030012345678
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Số thẻ BHYT</Typography>
          <Typography variant="body1" fontWeight={600}>
            {submittedData.healthInsuranceNumber}
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Tỉnh/Thành phố</Typography>
          <Typography variant="body1" fontWeight={600}>
            Thành phố Hà Nội
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Quận/Huyện</Typography>
          <Typography variant="body1" fontWeight={600}>
            Quận Long Biên
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Xã/Phường</Typography>
          <Typography variant="body1" fontWeight={600}>
            Phường Giang Biên
          </Typography>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="outlined" onClick={goToHomepage}>
          Trang chủ
        </Button>
        {/* We should call the registration api call to server and clear the current form after */}
        <Button variant="contained" onClick={exportToPDF}>
          Xuất thông tin
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResultStep;
