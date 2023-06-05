'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import VaccinationRecordTable from './VaccinationRecordTable';
import Link from 'next/link';

const CertificateInfo: FC = () => {
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
            Nguyễn Văn A
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight={600}>
            16/10/1994
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">
            Số CMND/CCCD/Mã định danh công dân
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            030012345678
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Số thẻ BHYT</Typography>
          <Typography variant="body1" fontWeight={600}>
            030094005102
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Địa chỉ</Typography>
          <Typography variant="body1" fontWeight={600}>
            Phường Giang Biên - Quận Long Biên - Thành phố Hà Nội
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Kết luận</Typography>
          <Typography variant="body1" fontWeight={600}>
            Đã được tiêm phòng vắc xin phòng bệnh Covid-19
          </Typography>
        </Grid>
      </Grid>
      <VaccinationRecordTable />
      <Stack alignItems="center">
        <Link href="/portal/vaccine-registration">
          <Button variant="contained">Đăng ký mũi tiêm tiếp theo</Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default CertificateInfo;
