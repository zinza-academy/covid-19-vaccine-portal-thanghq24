import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import useFindVaccinationPoint, {
  VaccinationPointFindQueryType
} from '@src/api/vaccinationPoint/find';
import { UseFormReturn } from 'react-hook-form';
import usePagination from '@src/hooks/usePagination';
import TableHeadCell from '@components/sharedComponents/table/TableHeadCell';
import TableBodyCell from '@components/sharedComponents/table/TableBodyCell';
import TableRow from '@components/sharedComponents/table/TableRow';
import TablePagination from '@components/sharedComponents/table/TablePagination';
import DEFAULT_PAGINATION_VALUES from '@src/utils/constants/defaultPaginationValues';

interface VaccinationPointTablePropsType {
  vaccinationPointForm: UseFormReturn<VaccinationPointFindQueryType, any>;
}

const VaccinationPointTable: FC<VaccinationPointTablePropsType> = ({
  vaccinationPointForm
}) => {
  const { getValues, setValue, watch } = vaccinationPointForm;

  const { data } = useFindVaccinationPoint({ ...getValues() });

  const page = watch('page');
  const pageSize = watch('pageSize');

  const { pageOptions, emptyRows, maxPage } = usePagination({
    items: data?.data,
    count: data?.count,
    page: page,
    pageSize: pageSize
  });

  const setPage = (page: number) => {
    setValue('page', page);
  };

  const setPageSize = (pageSize: number) => {
    setValue('pageSize', pageSize);
  };

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell label="STT" />
              <TableHeadCell label="Tên điểm tiêm" />
              <TableHeadCell label="Số nhà, tên đường" />
              <TableHeadCell label="Xã/Phường" />
              <TableHeadCell label="Quận/Huyện" />
              <TableHeadCell label="Tỉnh/Thành phố" />
              <TableHeadCell label="Người đứng đầu cơ sở tiêm chủng" />
              <TableHeadCell label="Số bàn tiêm" />
            </TableRow>
          </TableHead>
          {data?.data && data?.data.length > 0 && (
            <TableBody>
              {data?.data.map((vaccinationPoint, index) => (
                <TableRow key={index}>
                  <TableBodyCell label={page * pageSize + index + 1} />
                  <TableBodyCell label={vaccinationPoint.name} />
                  <TableBodyCell label={vaccinationPoint.address} />
                  <TableBodyCell label={vaccinationPoint.ward.name} />
                  <TableBodyCell label={vaccinationPoint.ward.district.name} />
                  <TableBodyCell
                    label={vaccinationPoint.ward.district.province.name}
                  />
                  <TableBodyCell label={vaccinationPoint.manager} />
                  <TableBodyCell label={vaccinationPoint.tableNumber} />
                </TableRow>
              ))}
            </TableBody>
          )}
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
    </Stack>
  );
};

export default VaccinationPointTable;
