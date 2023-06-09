'use client';
import React, { FC, PropsWithChildren } from 'react';
import Header from './pageHeader/Header';
import Footer from './pageFooter/Footer';
import { Container, Stack } from '@mui/material';

const ClientSideLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack minHeight="100vh" justifyContent="space-between">
      <Header />
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        {children}
      </Container>
      <Footer />
    </Stack>
  );
};

export default ClientSideLayout;
