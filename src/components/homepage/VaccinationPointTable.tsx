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
import React, { FC } from 'react';
import { indigo } from '@mui/material/colors';
import useFindVaccinationPoint, {
  VaccinationPointFindQueryType
} from '@src/api/authApi/vaccinationPoint/find';
import { UseFormReturn } from 'react-hook-form';

interface VaccinationPointTablePropsType {
  vaccinationPointForm: UseFormReturn<VaccinationPointFindQueryType, any>;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface VaccinationPoint {
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  manager: string;
  tableNumber: number;
}

const vaccinationPoint: VaccinationPoint = {
  name: 'Bệnh viện Đa khoa Medlatec',
  address: '42-44 Nghĩa Dũng',
  ward: 'Phúc Xá',
  district: 'Quận Ba Đình',
  province: 'Thành phố Hà Nội',
  manager: 'Nguyễn Thị Kim Liên',
  tableNumber: 8
};

const PAGE_SIZES = [10, 20, 50];

const vaccinationPoints = new Array<VaccinationPoint>(32).fill(
  vaccinationPoint
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
  return vaccinationPoints.slice(page * pageSize, page * pageSize + pageSize);
};

const getEmptyRows = (page: number, pageSize: number) => {
  const maxPage = Math.floor(vaccinationPoints.length / pageSize);

  if (page !== maxPage || page === 0) return [];
  const lastPageItemNumber = fetchData(maxPage, pageSize);
  return new Array(pageSize - lastPageItemNumber.length).fill('empty');
};

const VaccinationPointTable: FC<VaccinationPointTablePropsType> = ({
  vaccinationPointForm
}) => {
  const { getValues, setValue } = vaccinationPointForm;
  const { data } = useFindVaccinationPoint(getValues());

  const vaccinationPoints = data?.data;
  const page = getValues('page');
  const pageSize = getValues('pageSize');

  const setPage = (page: number) => {
    setValue('page', page);
  };

  const setPageSize = (pageSize: number) => {
    setValue('pageSize', pageSize);
  };

  const getPageOptions = () => {
    const maxPage = vaccinationPoints
      ? Math.floor(vaccinationPoints?.length / pageSize)
      : 0;
    let pageOptions = [];
    for (let i = 0; i <= maxPage; i++) {
      pageOptions.push(i);
    }
    return pageOptions;
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
          {vaccinationPoints && vaccinationPoints?.length > 0 && (
            <TableBody>
              {vaccinationPoints
                .concat(getEmptyRows(page, pageSize))
                .map((vaccinationPoint, index) => (
                  <StyledTableRow key={index}>
                    <TableBodyCell label={index + 1} />
                    <TableBodyCell label={vaccinationPoint.name} />
                    <TableBodyCell label={vaccinationPoint.address} />
                    <TableBodyCell label={vaccinationPoint.ward.name} />
                    <TableBodyCell
                      label={vaccinationPoint.ward.district.name}
                    />
                    <TableBodyCell
                      label={vaccinationPoint.ward.district.name}
                    />
                    <TableBodyCell label={vaccinationPoint.manager} />
                    <TableBodyCell label={vaccinationPoint.tableNumber} />
                  </StyledTableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!vaccinationPoints && (
        <Typography textAlign="center">Không có dữ liệu</Typography>
      )}
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
          }/${vaccinationPoints?.length}`}</Typography>
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
              onClick={() => setPage(page - 1)}
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
                page ===
                (vaccinationPoints
                  ? Math.floor(vaccinationPoints?.length / pageSize)
                  : true)
              }
              onClick={() => setPage(page + 1)}
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
                page ===
                (vaccinationPoints
                  ? Math.floor(vaccinationPoints?.length / pageSize)
                  : true)
              }
              onClick={() =>
                setPage(
                  vaccinationPoints
                    ? Math.floor(vaccinationPoints?.length / pageSize)
                    : 0
                )
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
    </Stack>
  );
};

export default VaccinationPointTable;
