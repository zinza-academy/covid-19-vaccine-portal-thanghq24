import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled
} from '@mui/material';
import React, { FC } from 'react';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const TableHeadCell: FC<{ label: string }> = ({ label }) => {
  return (
    <TableCell
      align="center"
      sx={{
        backgroundColor: (theme) => theme.palette.action.hover
      }}>
      <Typography variant="body1" fontWeight={500}>
        {label}
      </Typography>
    </TableCell>
  );
};

const TableBodyCell: FC<{ label: string | number }> = ({ label }) => {
  return (
    <TableCell align="center">
      <Typography variant="body2">{label}</Typography>
    </TableCell>
  );
};

//data from api
const fetchData = () => {
  return [
    {
      injectionTime: '08/09/2021 - 16:56',
      vaccineType: '	COVID-19 Vaccine AstraZeneca',
      batchNumber: 'NJ0342',
      vaccinationPoint: 'TYT Dịch Vọng Hậu'
    },
    {
      injectionTime: '08/02/2022 - 04:23',
      vaccineType: '	COVID-19 Vaccine AstraZeneca',
      batchNumber: 'NJ0343',
      vaccinationPoint: 'TYT Dịch Vọng Hậu'
    }
  ];
};

const VaccinationRecordTable: FC = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell label="Mũi số" />
            <TableHeadCell label="Thời gian tiêm" />
            <TableHeadCell label="Tên vắc xin" />
            <TableHeadCell label="Số lô" />
            <TableHeadCell label="Nơi tiêm" />
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchData().map((vaccinationRecord, index) => (
            <StyledTableRow key={index}>
              <TableBodyCell label={index + 1} />
              <TableBodyCell label={vaccinationRecord.injectionTime} />
              <TableBodyCell label={vaccinationRecord.vaccineType} />
              <TableBodyCell label={vaccinationRecord.batchNumber} />
              <TableBodyCell label={vaccinationRecord.vaccinationPoint} />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VaccinationRecordTable;
