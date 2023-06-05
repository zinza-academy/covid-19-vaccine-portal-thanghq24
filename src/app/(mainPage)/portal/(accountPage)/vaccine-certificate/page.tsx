'use client';

import { Grid } from '@mui/material';
import CertificateCard from '@src/components/portal/vaccine-certificate/CertificateCard';
import CertificateInfo from '@src/components/portal/vaccine-certificate/CertificateInfo';
import React, { FC } from 'react';
export interface InjectionRecord {
  injectionTime: string;
  vaccineType: string;
  batchNumber: string;
  vaccinationPoint: string;
}

const fetchData: InjectionRecord[] = [
  // {
  //   injectionTime: '08/09/2021 - 16:56',
  //   vaccineType: '	COVID-19 Vaccine AstraZeneca',
  //   batchNumber: 'NJ0342',
  //   vaccinationPoint: 'TYT Dịch Vọng Hậu'
  // },
  // {
  //   injectionTime: '08/02/2022 - 04:23',
  //   vaccineType: '	COVID-19 Vaccine AstraZeneca',
  //   batchNumber: 'NJ0343',
  //   vaccinationPoint: 'TYT Dịch Vọng Hậu'
  // }
];

const VaccineCertificate: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <CertificateInfo injectionRecordList={fetchData} />
      </Grid>
      <Grid item xs={3}>
        <CertificateCard injectionRecordList={fetchData} />
      </Grid>
    </Grid>
  );
};

export default VaccineCertificate;
