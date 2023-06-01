'use client';
import React, { FC, PropsWithChildren } from 'react';
import Header from './pageHeader/Header';
import Footer from './pageFooter/Footer';
import { Container } from '@mui/material';

const ClientSideLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default ClientSideLayout;
