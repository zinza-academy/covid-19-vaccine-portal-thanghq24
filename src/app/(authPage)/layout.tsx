'use client';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import authImage from '../../../public/auth-page-img.png';

export default function AuthPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
}
