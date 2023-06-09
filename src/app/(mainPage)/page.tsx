'use client';
import { Stack } from '@mui/material';
import DailyStatistics from '@src/components/homepage/DailyStatistics';
import StatisticalData from '@src/components/homepage/StatisticalData';
import VaccinationPoint from '@src/components/homepage/VaccinationPoint';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Stack spacing={4} py={4}>
      <StatisticalData />
      <DailyStatistics />
      <VaccinationPoint />
    </Stack>
  );
};

export default Home;
