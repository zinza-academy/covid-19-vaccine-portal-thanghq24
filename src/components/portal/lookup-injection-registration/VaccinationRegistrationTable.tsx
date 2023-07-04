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
import { VaccineRegistrationFindOneResponseType } from '@src/api/vaccineRegistration/types';
import StatusBadge from '@src/components/admin/vaccination-registration/StatusBadge';
import TableBodyCell from '@src/components/sharedComponents/table/TableBodyCell';
import TableHeadCell from '@src/components/sharedComponents/table/TableHeadCell';
import StyledTableRow from '@src/components/sharedComponents/table/TableRow';
import dayPhases from '@src/utils/constants/dayPhases';
import dayjs from 'dayjs';
import React, { FC } from 'react';

interface VaccinationRegistrationTableProps {
  vaccineRegistrationList: VaccineRegistrationFindOneResponseType[];
}

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
