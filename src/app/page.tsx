'use client';
import { Container, Stack } from '@mui/material';
import DailyStatistics from '@src/components/homepage/DailyStatistics';
import StatisticalData from '@src/components/homepage/StatisticalData';
import Header from '@src/components/sharedComponents/PageHeader/Header';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <main>
      <Header />
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <StatisticalData />
          <DailyStatistics />
        </Stack>
      </Container>
    </main>
  );
};

export default Home;
