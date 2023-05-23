'use client';
import { Box, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import authImage from '../../../public/auth-page-img.png';

export default function Login() {
  return (
    <Box sx={{ display: 'flex', width: '100wh' }}>
      {/* left */}
      <Box
        sx={{
          position: 'relative',
          width: '50%',
          height: '100vh'
        }}>
        <Image
          src={authImage}
          alt="Left side image"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      {/* right */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box>
          <Typography variant="h4" fontWeight="700">
            Đăng nhập với tài khoản
          </Typography>
          <Typography>Email</Typography>
          <TextField
            variant="outlined"
            fullWidth
            error
            helperText="Họ tên không được bỏ trống"
            placeholder="Email"
          />
        </Box>
      </Box>
    </Box>
  );
}
