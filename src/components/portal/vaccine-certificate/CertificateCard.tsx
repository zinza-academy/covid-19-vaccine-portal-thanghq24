'use client';

import { Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import LogoImage from '@public/images/logo.png';
import QRImage from '@public/images/frame 1.png';
import Person from '@public/images/person.png';
import Date from '@public/images/date_range.png';
import IDCard from '@public/images/featured_video.png';
import { green, orange, red } from '@mui/material/colors';
import { InjectionRecord } from '@src/app/(mainPage)/portal/(accountPage)/vaccine-certificate/page';
import { useAppSelector } from '@src/hooks/reduxHook';
import { selectUserData } from '@src/redux/userSlice';
import useFindVaccineRegistrationResult from '@src/api/vaccineRegistrationResult/find';
import { getISODate } from '@src/utils/getISODate';

interface CertificateCardProps {
  injectionRecords: InjectionRecord[];
}

const CertificateCard: FC<CertificateCardProps> = ({ injectionRecords }) => {
  const userData = useAppSelector(selectUserData);

  const { data } = useFindVaccineRegistrationResult({
    userId: userData.id,
    page: 0,
    pageSize: 100
  });

  const getCertificationCardColor = (injectingTimes: number) => {
    if (injectingTimes === 0) return red[700];
    if (injectingTimes === 1) return orange[600];
    if (injectingTimes >= 1) return green[500];
  };

  if (!data) return <Typography>Loading</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        color: '#fff',
        backgroundColor: getCertificationCardColor(data.data.length),
        borderRadius: 2
      }}>
      <Stack spacing={2} alignItems={'center'} padding={4}>
        <Image src={LogoImage} alt="Logo" width={100} height={100} />
        <Typography variant="h5" textAlign="center">
          ĐÃ TIÊM {data.data.length} MŨI VẮC XIN
        </Typography>
        <Image src={QRImage} alt="Logo" width={196} height={196} />
        <Stack
          padding={2}
          spacing={2}
          sx={{ backgroundColor: '#fff', color: 'black', borderRadius: '8px' }}>
          <Stack direction="row" spacing={1}>
            <Image src={Person} alt="Logo" width={24} height={24} />
            <Stack>
              <Typography variant="body1">Họ và tên</Typography>
              <Typography variant="body1" fontWeight={600}>
                {userData.fullName}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Image src={Date} alt="Logo" width={24} height={24} />
            <Stack>
              <Typography variant="body1">Ngày sinh</Typography>
              <Typography variant="body1" fontWeight={600}>
                {getISODate(userData.dob)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Image src={IDCard} alt="Logo" width={24} height={24} />
            <Stack>
              <Typography variant="body1">
                Số CMND/CCCD/Mã định danh công dân
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {userData.citizenIdentification}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CertificateCard;
