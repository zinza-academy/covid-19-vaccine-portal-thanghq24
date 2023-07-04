'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@src/hooks/reduxHook';
import { selectUserData } from '@src/redux/userSlice';
import useFindVaccineRegistrationResult from '@src/api/vaccineRegistrationResult/find';
import { getISODate } from '@src/utils/getISODate';
import VaccinationRecordTable from './VaccinationRecordTable';

const CertificateInfo: FC = () => {
  const userData = useAppSelector(selectUserData);

  const { data } = useFindVaccineRegistrationResult({
    userId: userData.id,
    page: 0,
    pageSize: 100
  });

  if (!data) return <Typography>Loading</Typography>;

  return (
    <Stack spacing={2}>
      <Stack alignItems="center">
        <Typography variant="body1" textTransform="uppercase">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          Độc lập - Tự do - Hạnh phúc
        </Typography>
      </Stack>
      <Typography
        variant="h5"
        textTransform="uppercase"
        textAlign="center"
        fontWeight={600}>
        CHỨNG NHẬN TIÊM CHỦNG COVID-19
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body1">Họ và tên</Typography>
          <Typography variant="body1" fontWeight={600}>
            {userData.fullName}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight={600}>
            {getISODate(userData.dob)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">
            Số CMND/CCCD/Mã định danh công dân
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {userData.citizenIdentification}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Số thẻ BHYT</Typography>
          <Typography variant="body1" fontWeight={600}>
            {userData.healthInsuranceNumber}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Địa chỉ</Typography>
          <Typography variant="body1" fontWeight={600}>
            {userData.ward
              ? `${userData?.ward?.name} - ${userData.ward.district.name} -
            ${userData.ward.district.province.name}`
              : ' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Kết luận</Typography>
          <Typography variant="body1" fontWeight={600}>
            {data.data.length > 0
              ? 'Đã được tiêm phòng vắc xin phòng bệnh Covid-19'
              : 'Chưa được tiêm phòng vắc xin phòng bệnh Covid-19'}
          </Typography>
        </Grid>
      </Grid>
      <VaccinationRecordTable vaccinationRegistration={data.data} />
      <Stack alignItems="center">
        <Link href="/portal/vaccine-registration">
          <Button variant="contained">Đăng ký mũi tiêm tiếp theo</Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default CertificateInfo;
