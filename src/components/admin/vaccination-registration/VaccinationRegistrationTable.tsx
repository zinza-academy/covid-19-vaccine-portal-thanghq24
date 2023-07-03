'use client';

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import dayPhases from '@src/utils/constants/dayPhases';
import ApprovalForm from '@src/components/admin/vaccination-registration/ApprovalForm';
import TableHeadCell from '@src/components/sharedComponents/table/TableHeadCell';
import StyledTableRow from '@src/components/sharedComponents/table/TableRow';
import TableBodyCell from '@src/components/sharedComponents/table/TableBodyCell';
import useFindVaccineRegistration from '@src/api/vaccineRegistration/find';
import { UseFormReturn } from 'react-hook-form';
import { VaccineRegistrationFindParamsType } from '@src/api/vaccineRegistration/types';
import { getISODate } from '@src/utils/getISODate';
import usePagination from '@src/hooks/usePagination';
import TablePagination from '@src/components/sharedComponents/table/TablePagination';
import DEFAULT_PAGINATION_VALUES from '@src/utils/constants/defaultPaginationValues';
import StatusBadge from './StatusBadge';

interface VaccinationRegistrationTablePropsType {
  vaccineRegistrationForm: UseFormReturn<
    VaccineRegistrationFindParamsType,
    any
  >;
}

const VaccinationRegistrationTable: FC<
  VaccinationRegistrationTablePropsType
> = ({ vaccineRegistrationForm }) => {
  const [selectRegistration, setSelectRegistration] = useState<number | null>(
    null
  );

  const { setValue, watch } = vaccineRegistrationForm;

  const { data } = useFindVaccineRegistration({ ...watch() });

  const page = watch('page');
  const pageSize = watch('pageSize');

  const { pageOptions, emptyRows, maxPage } = usePagination({
    items: data?.data,
    count: data?.count,
    page: page,
    pageSize: pageSize
  });

  const setPage = (page: number) => {
    setValue('page', page, {
      shouldValidate: true
    });
  };

  const setPageSize = (pageSize: number) => {
    setValue('pageSize', pageSize, {
      shouldValidate: true
    });
  };

  const handleOpenEditModal = (id: number) => {
    setSelectRegistration(id);
    // setApprovalModalOpen(true);
  };

  const handleCloseApprovalModal = () => {
    setSelectRegistration(null);
    // setApprovalModalOpen(false);
  };

  if (!data) return <Typography>Loading</Typography>;

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell label="Nhóm ưu tiên" />
              <TableHeadCell label="Số thẻ BHYT" />
              <TableHeadCell label="Nghề nghiệp" />
              <TableHeadCell label="Ngày muốn được tiêm (dự kiến)" />
              <TableHeadCell label="Buổi tiêm mong muốn" />
              <TableHeadCell label="Trạng thái" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((vaccinationRegistration, index) => (
              <StyledTableRow
                key={index}
                sx={{ cursor: 'pointer', height: '54px' }}
                onClick={() => handleOpenEditModal(vaccinationRegistration.id)}>
                <TableBodyCell
                  label={vaccinationRegistration.priorityType + 1}
                />
                <TableBodyCell
                  label={vaccinationRegistration.user.healthInsuranceNumber}
                />
                <TableBodyCell label={vaccinationRegistration.job} />
                <TableBodyCell
                  label={getISODate(vaccinationRegistration.appointmentDate)}
                />
                <TableBodyCell
                  label={
                    vaccinationRegistration.dayPhase
                      ? dayPhases[
                          dayPhases.findIndex(
                            (phase) =>
                              phase.value === vaccinationRegistration.dayPhase
                          )
                        ].label
                      : ''
                  }
                />
                <TableCell align="center">
                  <StatusBadge status={vaccinationRegistration.status} />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        pageSize={pageSize}
        maxPage={maxPage}
        count={data?.count}
        pageOptions={pageOptions}
        pageSizeOptions={DEFAULT_PAGINATION_VALUES.PAGE_SIZES_OPTIONS}
        setPage={setPage}
        setPageSize={setPageSize}
      />
      <ApprovalForm
        approvalModalOpen={!!selectRegistration}
        handleCloseApprovalModal={handleCloseApprovalModal}
        vaccinationRegistrationId={selectRegistration}
        vaccineRegistrationForm={vaccineRegistrationForm}
      />
    </Stack>
  );
};

export default VaccinationRegistrationTable;
