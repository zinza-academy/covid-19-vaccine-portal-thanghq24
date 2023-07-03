'use client';

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {
  STATUS,
  VaccineRegistrationFindOneResponseType
} from '@src/api/vaccineRegistration/types';
import TableBodyCell from '@src/components/sharedComponents/table/TableBodyCell';
import TableHeadCell from '@src/components/sharedComponents/table/TableHeadCell';
import StyledTableRow from '@src/components/sharedComponents/table/TableRow';
import dayPhases from '@src/utils/constants/dayPhases';
import dayjs from 'dayjs';
import React, { FC } from 'react';

interface VaccinationRegistrationTableProps {
  vaccineRegistrationList: VaccineRegistrationFindOneResponseType[];
}

interface StatusBadgeProps {
  status: STATUS;
}

const getBadgeColor = (status: STATUS) => {
  switch (status) {
    case STATUS.REQUESTED:
      return 'default';
    case STATUS.ACCEPTED:
      return 'primary';
    case STATUS.REJECTED:
      return 'warning';
    case STATUS.COMPLETED:
      return 'success';
  }
};

const getBadgeLabel = (status: STATUS) => {
  switch (status) {
    case STATUS.REQUESTED:
      return 'Đăng ký thành công';
    case STATUS.ACCEPTED:
      return 'Đã được chấp nhận';
    case STATUS.REJECTED:
      return 'Đã bị từ chối';
    case STATUS.COMPLETED:
      return 'Đã hoàn thành tiêm';
  }
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <Chip color={getBadgeColor(status)} label={getBadgeLabel(status)} />
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
