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
import { InjectionRecord } from '@src/app/(mainPage)/portal/(accountPage)/vaccine-certificate/page';
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

interface VaccinationRecordTableProps {
  injectionRecordList: InjectionRecord[];
}

const VaccinationRecordTable: FC<VaccinationRecordTableProps> = ({
  injectionRecordList
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell label="STT" />
            <TableHeadCell label="Mũi số" />
            <TableHeadCell label="Thời gian tiêm" />
            <TableHeadCell label="Tên vắc xin" />
            <TableHeadCell label="Số lô" />
            <TableHeadCell label="Nơi tiêm" />
          </TableRow>
        </TableHead>

        <TableBody>
          {injectionRecordList.map((vaccinationRecord, index) => (
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
      {injectionRecordList.length === 0 && (
        <Typography variant="h6" textAlign="center">
          Không có bản ghi nào
        </Typography>
      )}
    </TableContainer>
  );
};

export default VaccinationRecordTable;
