import { TableCell, Typography } from '@mui/material';
import { FC } from 'react';

interface TableHeadCellPropsType {
  label: string;
}

const TableHeadCell: FC<TableHeadCellPropsType> = ({ label }) => {
  return (
    <TableCell align="center">
      <Typography variant="body1" fontWeight={500}>
        {label}
      </Typography>
    </TableCell>
  );
};

export default TableHeadCell;
