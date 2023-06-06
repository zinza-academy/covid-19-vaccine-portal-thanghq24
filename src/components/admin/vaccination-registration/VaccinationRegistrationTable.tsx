'use client';

import { styled } from '@mui/material/styles';
import {
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { indigo } from '@mui/material/colors';
import EditModal from '@components/admin/vaccination-point/EditModal';
import dayjs from 'dayjs';
import dayPhases from '@src/utils/constants/dayPhases';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export interface VaccinationRegistration {
  priorityType: number;
  healthInsuranceNumber: string;
  job: string;
  appointmentDate: string | number | Date | dayjs.Dayjs | null | undefined;
  dayPhase: number;
}

const vaccinationRegistration: VaccinationRegistration = {
  priorityType: 1,
  healthInsuranceNumber: 'HD203473829293',
  job: 'Nhóm ngành Sư phạm',
  appointmentDate: dayjs().format('DD/MM/YYYY'),
  dayPhase: 1
};

const PAGE_SIZES = [10, 20, 50];

const vaccinationRegistrations = new Array<VaccinationRegistration>(32).fill(
  vaccinationRegistration
);

const TableHeadCell: FC<{ label: string }> = ({ label }) => {
  return (
    <TableCell align="center">
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

const fetchData = (page: number, pageSize: number) => {
  return vaccinationRegistrations.slice(
    page * pageSize,
    page * pageSize + pageSize
  );
};

const getEmptyRows = (page: number, pageSize: number) => {
  const maxPage = Math.floor(vaccinationRegistrations.length / pageSize);

  if (page !== maxPage || page === 0) return [];
  const lastPageItemNumber = fetchData(maxPage, pageSize);
  return new Array(pageSize - lastPageItemNumber.length).fill('empty');
};

const VaccinationRegistrationTable: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] =
    useState<VaccinationRegistration | null>();

  const getPageOptions = () => {
    const maxPage = Math.floor(vaccinationRegistrations.length / pageSize);
    let pageOptions = [];
    for (let i = 0; i <= maxPage; i++) {
      pageOptions.push(i);
    }
    return pageOptions;
  };

  const handleOpenEditModal = (
    vaccinationRegistration: VaccinationRegistration
  ) => {
    setSelectedPoint(vaccinationRegistration);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedPoint(null);
    setEditModalOpen(false);
  };

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
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchData(page, pageSize)
              .concat(getEmptyRows(page, pageSize))
              .map((vaccinationRegistration, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ cursor: 'pointer', height: '54px' }}
                  onClick={() => handleOpenEditModal(vaccinationRegistration)}>
                  <TableBodyCell label={vaccinationRegistration.priorityType} />
                  <TableBodyCell
                    label={vaccinationRegistration.healthInsuranceNumber}
                  />
                  <TableBodyCell label={vaccinationRegistration.job} />
                  <TableBodyCell
                    label={vaccinationRegistration.appointmentDate as string}
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
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems={'center'} spacing={1}>
          <Typography variant="body2">Số bản ghi:</Typography>
          <Select
            size="small"
            value={pageSize}
            onChange={(e: SelectChangeEvent<number>) => {
              setPage(0);
              setPageSize(e.target.value as number);
            }}
            sx={{ width: '100px' }}>
            {PAGE_SIZES.map((pageSize, index) => (
              <MenuItem key={index} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2">{`${page * pageSize + 1} - ${
            page * pageSize + pageSize
          }/${vaccinationRegistrations.length}`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Stack
            direction="row"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{
              border: 1,
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderRadius: '4px'
            }}>
            <Button
              disabled={page === 0}
              onClick={() => setPage(0)}
              sx={{
                py: 1,
                px: 2,
                minWidth: 0,
                borderRadius: '4px 0 0 4px',
                '&:hover': {
                  backgroundColor: indigo[600],
                  color: '#fff'
                }
              }}>
              <Typography variant="body2">{`<<`}</Typography>
            </Button>
            <Button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              sx={{
                py: 1,
                px: 2,
                minWidth: 0,
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: indigo[600],
                  color: '#fff'
                }
              }}>
              <Typography variant="body2">{`<`}</Typography>
            </Button>
            {getPageOptions().map((p, index) => (
              <Button
                key={index}
                sx={{
                  py: 1,
                  px: 2,
                  minWidth: 0,
                  borderRadius: 0,
                  backgroundColor: p === page ? indigo[600] : '#fff',
                  color: p !== page ? indigo[700] : '#fff',
                  '&:hover': {
                    backgroundColor: indigo[600],
                    color: '#fff'
                  }
                }}
                onClick={() => setPage(p)}>
                <Typography variant="body2">{p + 1}</Typography>
              </Button>
            ))}
            <Button
              disabled={
                page === Math.floor(vaccinationRegistrations.length / pageSize)
              }
              onClick={() => setPage((prev) => prev + 1)}
              sx={{
                py: 1,
                px: 2,
                minWidth: 0,
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: indigo[600],
                  color: '#fff'
                }
              }}>
              <Typography variant="body2">{`>`}</Typography>
            </Button>
            <Button
              disabled={
                page === Math.floor(vaccinationRegistrations.length / pageSize)
              }
              onClick={() =>
                setPage(Math.floor(vaccinationRegistrations.length / pageSize))
              }
              sx={{
                py: 1,
                px: 2,
                minWidth: 0,
                borderRadius: '0 4px 4px 0',
                '&:hover': {
                  backgroundColor: indigo[600],
                  color: '#fff'
                }
              }}>
              <Typography variant="body2">{`>>`}</Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {/* <EditModal
        editModalOpen={editModalOpen}
        handleCloseEditModal={handleCloseEditModal}
        vaccinationRegistration={selectedPoint}
      /> */}
    </Stack>
  );
};

export default VaccinationRegistrationTable;
