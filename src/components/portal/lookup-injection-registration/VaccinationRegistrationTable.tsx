'use client';

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled
} from '@mui/material';
import { VaccinationRegistration } from '@src/app/(mainPage)/portal/(accountPage)/lookup-injection-registration/page';
import dayPhases from '@src/utils/constants/dayPhases';
import dayjs from 'dayjs';
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

const registrationStatus = {
  SUCCESS_REGISTRATION: 0,
  ACCEPTED: 1
};

interface VaccinationRegistrationTableProps {
  vaccineRegistrationList: VaccinationRegistration[];
}

interface StatusBadgeProps {
  status: 0 | 1;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <Chip
    color={status === 0 ? 'default' : 'primary'}
    label={status === 0 ? 'Đăng ký thành công' : 'Đã được chấp nhận'}
  />
);

const VaccinationRegistrationTable: FC<VaccinationRegistrationTableProps> = ({
  vaccineRegistrationList
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell label="STT" />
            <TableHeadCell label="Ngày muốn được tiêm (dự kiến)" />
            <TableHeadCell label="Buổi tiêm mong muốn" />
            <TableHeadCell label="Trạng thái" />
          </TableRow>
        </TableHead>

        <TableBody>
          {vaccineRegistrationList.map((vaccinationRegistration, index) => (
            <StyledTableRow key={index}>
              <TableBodyCell label={index + 1} />
              <TableBodyCell
                label={dayjs(vaccinationRegistration.appointmentDate).format(
                  'DD/MM/YYYY'
                )}
              />
              <TableBodyCell
                label={
                  dayPhases[
                    dayPhases.findIndex(
                      (phase) =>
                        phase.value === vaccinationRegistration.dayPhase
                    )
                  ].label
                }
              />
              <TableCell align="center">
                <StatusBadge status={vaccinationRegistration.status} />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {vaccineRegistrationList.length === 0 && (
        <Typography variant="h6" textAlign="center">
          Không có bản ghi nào
        </Typography>
      )}
    </TableContainer>
  );
};

export default VaccinationRegistrationTable;
