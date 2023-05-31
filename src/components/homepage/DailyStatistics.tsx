import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Paper, Typography } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};

console.log(new Date());
const labels = faker.date
  .betweens({
    count: 30,
    from: dayjs(new Date()).subtract(1, 'month').toDate(),
    to: new Date()
  })
  .map((date) => dayjs(date).format('DD/MM'));

export const data = {
  labels,
  datasets: [
    {
      label: 'Đã tiêm',
      data: labels.map(() => faker.number.int({ min: 400, max: 2200000 })),
      borderColor: indigo[700],
      backgroundColor: pink[600]
    }
  ]
};

const DailyStatistics = () => {
  return (
    <Paper elevation={6} sx={{ padding: '24px 16px' }}>
      <Typography variant="h6">Dữ liệu tiêm theo ngày</Typography>
      <Line options={options} data={data} />
    </Paper>
  );
};

export default DailyStatistics;
