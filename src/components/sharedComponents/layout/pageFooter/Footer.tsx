import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { indigo, red } from '@mui/material/colors';
import Image from 'next/image';
import React, { FC } from 'react';
import Logo from '@public/images/logo2bo.png';
import Certification from '@public/images/handle_cert.png';

const CustomOutlinedButton: FC<{ label: string }> = ({ label }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: '#fff',
        color: '#fff',
        '&:hover': { borderColor: '#fff' }
      }}>
      {label}
    </Button>
  );
};

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: indigo[700], color: '#fff' }}>
      <Container maxWidth="xl">
        <Stack direction="row" px={2} py={4} justifyContent="space-between">
          <Stack spacing="4px">
            <Typography variant="body2">
              © Bản quyền thuộc{' '}
              <Typography
                component="span"
                variant="body2"
                textTransform="uppercase"
                fontWeight={700}>
                TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
              </Typography>
            </Typography>
            <Typography variant="body2">
              Phát triển bởi{' '}
              <Typography component="span" variant="body2" color={red[700]}>
                Viettel
              </Typography>
            </Typography>
            <Image src={Logo} alt="logo2bo" width={195} height={89} />
          </Stack>
          <Stack alignItems="end" spacing={2}>
            <Typography variant="body2">
              Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận
              tiêm
            </Typography>
            <Stack direction="row" spacing={2}>
              <CustomOutlinedButton label="App tiêm di động (Cho HCM)" />
              <CustomOutlinedButton label="App Store" />
              <CustomOutlinedButton label="Google Play" />
            </Stack>
            <Image
              src={Certification}
              alt="certification"
              width={220}
              height={100}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
