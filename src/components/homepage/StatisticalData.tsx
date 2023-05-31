import { Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import RegisterPeople from '@public/images/ic_register_people 1.png';
import Injection from '@public/images/ic_injection.png';
import InjectedPeople from '@public/images/ic_injected_people.png';
import Image, { StaticImageData } from 'next/image';

interface DataItemProps {
  label: string;
  value: number;
  measurement: string;
  icon: string | StaticImageData;
}

const DataItem: FC<DataItemProps> = ({ label, value, measurement, icon }) => {
  return (
    <Stack
      spacing={2}
      px={2}
      direction="row"
      sx={{ backgroundColor: '#fff', width: '100%' }}>
      <Stack justifyContent="center" alignItems="center">
        <Image src={icon} alt={'data item icon'} width={46} height={44} />
      </Stack>
      <Stack>
        <Typography fontWeight={700}>{label}</Typography>
        <Stack direction="row" alignItems="baseline">
          <Typography fontSize="28px" fontWeight={500}>
            {value.toLocaleString()}
          </Typography>
          <Typography
            fontSize="13px"
            fontWeight={500}
            fontStyle="italic">{`(${measurement})`}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const StatisticalData: FC = () => {
  const statisticalDatas = [
    {
      label: 'Đối tượng đăng ký tiêm',
      value: 11202030,
      measurement: 'lượt',
      icon: RegisterPeople
    },
    {
      label: 'Số mũi tiêm hôm qua',
      value: 1762119,
      measurement: 'mũi',
      icon: Injection
    },
    {
      label: 'Số mũi đã tiêm toàn quốc',
      value: 69523654,
      measurement: 'mũi',
      icon: InjectedPeople
    }
  ];
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        mt: '120px',
        backgroundColor: '#F7FBFE',
        padding: '16px 36px'
      }}>
      {statisticalDatas.map((item, index) => (
        <DataItem
          key={index}
          label={item.label}
          value={item.value}
          measurement={item.measurement}
          icon={item.icon}
        />
      ))}
    </Stack>
  );
};

export default StatisticalData;
