'use client';

import {
  Button,
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
import {
  VaccineRegistrationFindParamsType,
  VaccineRegistrationStatus
} from '@src/api/vaccineRegistration/types';
import { getISODate } from '@src/utils/getISODate';
import usePagination from '@src/hooks/usePagination';
import TablePagination from '@src/components/sharedComponents/table/TablePagination';
import DEFAULT_PAGINATION_VALUES from '@src/utils/constants/defaultPaginationValues';
import StatusBadge from './StatusBadge';
import EditForm from './EditForm';

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
  const [selectRegistrationResult, setSelectRegistrationResult] = useState<
    number | null
  >(null);
  const [openApproval, setOpenApproval] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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

  const handleOpenApprovalModal = (id: number) => {
    setSelectRegistration(id);
    setOpenApproval(true);
  };

  const handleCloseApprovalModal = () => {
    setSelectRegistration(null);
    setOpenApproval(false);
  };

  const handleOpenEditModal = (
    registerId: number,
    registerResultId: number
  ) => {
    setSelectRegistration(registerId);
    setSelectRegistrationResult(registerResultId);
    setOpenEdit(true);
  };

  const handleCloseEditModal = () => {
    setSelectRegistration(null);
    setSelectRegistrationResult(null);
    setOpenEdit(false);
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
              <TableHeadCell label="Thao tác" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((vaccinationRegistration, index) => (
              <StyledTableRow key={index} sx={{ height: '54px' }}>
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
                <TableCell align="center">
                  <Button
                    sx={{ textTransform: 'none' }}
                    disabled={
                      vaccinationRegistration.status ===
                      VaccineRegistrationStatus.Completed
                    }
                    onClick={() =>
                      handleOpenApprovalModal(vaccinationRegistration.id)
                    }>
                    Phê duyệt
                  </Button>
                  <Button
                    sx={{ textTransform: 'none' }}
                    disabled={
                      !vaccinationRegistration.vaccineRegistrationResult ||
                      vaccinationRegistration.status ===
                        VaccineRegistrationStatus.Requested ||
                      vaccinationRegistration.status ===
                        VaccineRegistrationStatus.Rejected
                    }
                    onClick={() => {
                      if (vaccinationRegistration.vaccineRegistrationResult)
                        handleOpenEditModal(
                          vaccinationRegistration.id,
                          vaccinationRegistration.vaccineRegistrationResult.id
                        );
                    }}>
                    Chỉnh sửa
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!data?.data || data?.data.length === 0) && (
        <Typography textAlign="center">Không có dữ liệu</Typography>
      )}
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
        approvalModalOpen={openApproval}
        handleCloseApprovalModal={handleCloseApprovalModal}
        vaccinationRegistrationId={selectRegistration}
        vaccineRegistrationForm={vaccineRegistrationForm}
      />
      <EditForm
        editModalOpen={openEdit}
        handleCloseEditModal={handleCloseEditModal}
        vaccinationRegistrationId={selectRegistration}
        vaccinationRegistrationResultId={selectRegistrationResult}
        vaccineRegistrationForm={vaccineRegistrationForm}
      />
    </Stack>
  );
};

export default VaccinationRegistrationTable;
