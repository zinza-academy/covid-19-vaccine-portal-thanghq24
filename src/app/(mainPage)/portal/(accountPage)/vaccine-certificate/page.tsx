'use client';

import { Grid } from '@mui/material';
import CertificateCard from '@src/components/portal/vaccine-certificate/CertificateCard';
import CertificateInfo from '@src/components/portal/vaccine-certificate/CertificateInfo';
import React, { FC } from 'react';

const VaccineCertificate: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <CertificateInfo />
      </Grid>
      <Grid item xs={3}>
        <CertificateCard />
      </Grid>
    </Grid>
  );
};

export default VaccineCertificate;
