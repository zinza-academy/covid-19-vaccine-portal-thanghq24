import {
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import React, { FC } from 'react';

interface TablePaginationPropsType {
  page: number;
  pageSize: number;
  maxPage: number;
  count: number | undefined;
  pageOptions: number[];
  pageSizeOptions: number[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const TablePagination: FC<TablePaginationPropsType> = ({
  page,
  pageSize,
  maxPage,
  count,
  pageOptions,
  pageSizeOptions,
  setPage,
  setPageSize
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" my={2}>
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
          {pageSizeOptions.map((pageSize, index) => (
            <MenuItem key={index} value={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">
          {page * pageSize + 1} - {page * pageSize + pageSize}/{count}
        </Typography>
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
            sx={{
              py: 1,
              px: 2,
              minWidth: 0,
              borderRadius: '4px 0 0 4px',
              '&:hover': {
                backgroundColor: indigo[600],
                color: '#fff'
              }
            }}
            disabled={page === 0}
            onClick={() => setPage(0)}>
            <Typography variant="body2">{`<<`}</Typography>
          </Button>
          <Button
            sx={{
              py: 1,
              px: 2,
              minWidth: 0,
              borderRadius: 0,
              '&:hover': {
                backgroundColor: indigo[600],
                color: '#fff'
              }
            }}
            disabled={page === 0}
            onClick={() => setPage(page - 1)}>
            <Typography variant="body2">{`<`}</Typography>
          </Button>
          {pageOptions.map((p, index) => (
            <Button
              key={index}
              sx={{
                py: 1,
                px: 2,
                minWidth: 0,
                borderRadius: 0,
                backgroundColor: p === page ? indigo[600] : '#fff',
                '&:hover': {
                  backgroundColor: indigo[600],
                  color: '#fff'
                },
                '&.Mui-disabled': {
                  color: '#fff'
                }
              }}
              disabled={p === page}
              onClick={() => setPage(p)}>
              <Typography variant="body2">{p + 1}</Typography>
            </Button>
          ))}
          <Button
            sx={{
              py: 1,
              px: 2,
              minWidth: 0,
              borderRadius: 0,
              '&:hover': {
                backgroundColor: indigo[600],
                color: '#fff'
              }
            }}
            disabled={page === maxPage}
            onClick={() => setPage(page + 1)}>
            <Typography variant="body2">{`>`}</Typography>
          </Button>
          <Button
            sx={{
              py: 1,
              px: 2,
              minWidth: 0,
              borderRadius: '0 4px 4px 0',
              '&:hover': {
                backgroundColor: indigo[600],
                color: '#fff'
              }
            }}
            disabled={page === maxPage}
            onClick={() => setPage(maxPage)}>
            <Typography variant="body2">{`>>`}</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TablePagination;
