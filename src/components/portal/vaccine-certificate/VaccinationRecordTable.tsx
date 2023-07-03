'use client';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { VaccineRegistrationFindOneResponseType } from '@src/api/vaccineRegistration/types';
import TableBodyCell from '@src/components/sharedComponents/table/TableBodyCell';
import TableHeadCell from '@src/components/sharedComponents/table/TableHeadCell';
import StyledTableRow from '@src/components/sharedComponents/table/TableRow';
import dayjs from 'dayjs';
import React, { FC } from 'react';

interface VaccinationRecordTablePropsType {
  vaccinationRegistration: VaccineRegistrationFindOneResponseType[];
}

const VaccinationRecordTable: FC<VaccinationRecordTablePropsType> = ({
  vaccinationRegistration
}) => {
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
          {vaccinationRegistration.map((vaccinationRegistration, index) => (
            <StyledTableRow key={index}>
              <TableBodyCell label={index + 1} />
              <TableBodyCell
                label={dayjs(
                  vaccinationRegistration.vaccineRegistrationResult
                    ?.injectingTime
                ).format('YYYY-MM-DD HH:mm')}
              />
              <TableBodyCell
                label={
                  vaccinationRegistration.vaccineRegistrationResult?.vaccineType
                    .name || 'Không có dữ liệu'
                }
              />
              <TableBodyCell
                label={
                  vaccinationRegistration.vaccineRegistrationResult?.vaccineType
                    ?.batchNumber || 'Không có dữ liệu'
                }
              />
              <TableBodyCell
                label={
                  vaccinationRegistration.vaccineRegistrationResult?.vaccineType
                    ?.name || 'Không có dữ liệu'
                }
              />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {!vaccinationRegistration.length && (
        <Typography variant="h6" textAlign="center">
          Không có bản ghi nào
        </Typography>
      )}
    </TableContainer>
  );
};

export default VaccinationRecordTable;
