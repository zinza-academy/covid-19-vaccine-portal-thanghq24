import { Divider, Paper, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import SearchSection from './SearchSection';
import VaccinationPointTable from './VaccinationPointTable';

const VaccinationPoint: FC = () => {
  return (
    <Paper elevation={6} sx={{ padding: '24px 16px' }}>
      <Typography variant="h6">Tra cứu điểm tiêm theo địa bàn</Typography>
      <SearchSection />
      <Divider sx={{ pt: 2 }} />
      <VaccinationPointTable />
    </Paper>
  );
};

export default VaccinationPoint;
