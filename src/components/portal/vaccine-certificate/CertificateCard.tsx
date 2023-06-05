'use client';

import { Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import LogoImage from '@public/images/logo.png';
import QRImage from '@public/images/frame 1.png';
import Person from '@public/images/person.png';
import Date from '@public/images/date_range.png';
import IDCard from '@public/images/featured_video.png';
import { green } from '@mui/material/colors';

const CertificateCard: FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        color: '#fff',
        backgroundColor: green[500],
        borderRadius: 2
      }}>
      <Stack spacing={2} alignItems={'center'} padding={4}>
        <Image src={LogoImage} alt="Logo" width={100} height={100} />
        <Typography variant="h5" textAlign="center">
          ĐÃ TIÊM 2 MŨI VẮC XIN
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
                Nguyễn Văn A
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Image src={Date} alt="Logo" width={24} height={24} />
            <Stack>
              <Typography variant="body1">Ngày sinh</Typography>
              <Typography variant="body1" fontWeight={600}>
                16/10/1994
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
                030012345678
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CertificateCard;
