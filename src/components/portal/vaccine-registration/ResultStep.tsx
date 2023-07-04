import { Button, Grid, Stack, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { VaccineRegistrationResultStepProps } from '@src/app/(mainPage)/portal/vaccine-registration/page';
import { useAppSelector } from '@src/hooks/reduxHook';
import { selectUserData } from '@src/redux/userSlice';
import dayPhases from '@src/utils/constants/dayPhases';
import { getISODate } from '@src/utils/getISODate';
import Link from 'next/link';
import React, { FC } from 'react';

const ResultStep: FC<VaccineRegistrationResultStepProps> = ({
  registerResponse
}) => {
  const userData = useAppSelector(selectUserData);

  const exportToPDF = () => {
    alert('try to export the pdf file');
  };

  if (!registerResponse)
    return (
      <Typography width="100%" textAlign="center">
        Loading
      </Typography>
    );
  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là{' '}
        <Typography component="span" variant="h5" color={red[500]}>
          {registerResponse.id}
        </Typography>{' '}
        .
      </Typography>
      <Typography variant="body1" textAlign="center">
        Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y
        tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối
        tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ liên
        hệ với quý khách theo email{' '}
        <Typography component="span" variant="body1" color={blue[500]}>
          {registerResponse.user.email}
        </Typography>{' '}
        khi có kế hoạch tiêm trong thời gian sớm nhất.
      </Typography>
      <Typography variant="body1" textAlign="center">
        {`Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại `}
        <Typography component="span" variant="body1" color={red[500]}>
          https://hssk.kcb.vn/#/sskdt
        </Typography>{' '}
        để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1">Họ và tên</Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.fullName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight={600}>
            {getISODate(registerResponse.user.dob)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Giới tính</Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.gender === 'M' ? 'Nam' : 'Nữ'}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Số CMND/CCCD/Mã định danh công dân
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.citizenIdentification}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Số thẻ BHYT</Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.healthInsuranceNumber}
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Tỉnh/Thành phố</Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.ward.district.province.name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Quận/Huyện</Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.ward.district.name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Xã/Phường</Typography>
          <Typography variant="body1" fontWeight={600}>
            {registerResponse.user.ward.name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Ngày tiêm đã đăng ký</Typography>
          <Typography variant="body1" fontWeight={600}>
            {getISODate(registerResponse.appointmentDate)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Buổi tiêm đã đăng ký</Typography>
          <Typography variant="body1" fontWeight={600}>
            {
              dayPhases.find(
                (dayPhase) => dayPhase.value === registerResponse.dayPhase
              )?.label
            }
          </Typography>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link href="/">
          <Button variant="outlined">Trang chủ</Button>
        </Link>
        <Button variant="contained" onClick={exportToPDF}>
          Xuất thông tin
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResultStep;
