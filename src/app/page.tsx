'use client';
import StatisticalData from '@src/components/homepage/StatisticalData';
import Header from '@src/components/sharedComponents/PageHeader/Header';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <main>
      <Header />
      <StatisticalData />
    </main>
  );
};

export default Home;
