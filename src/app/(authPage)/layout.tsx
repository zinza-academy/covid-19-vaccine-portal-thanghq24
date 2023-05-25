'use client';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import authImage from '@public/images/auth-page-img.png';

const AuthPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="row" height="100vh">
      {/* left */}
      <Box
        sx={{
          width: '50%',
          position: 'relative'
        }}>
        <Image
          src={authImage}
          alt="Left side image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      {/* right */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {children}
      </Box>
    </Stack>
  );
};

export default AuthPageLayout;
