'use client';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import authImage from '@public/images/auth-page-img.png';

const AuthPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box position={'relative'} height={'100vh'}>
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '50vw',
          height: '100%'
        }}>
        <Image
          src={authImage}
          alt="Left side image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          minHeight: '100vh',
          width: '50vw',
          padding: '50px 30px',
          marginLeft: '50vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthPageLayout;
