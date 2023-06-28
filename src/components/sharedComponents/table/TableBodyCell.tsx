import { TableCell, Typography } from '@mui/material';
import { FC } from 'react';

interface TableBodyCellPropsType {
  label?: string | number;
}

const TableBodyCell: FC<TableBodyCellPropsType> = ({ label = '' }) => {
  return (
    <TableCell align="center" sx={{ minHeight: '73px' }}>
      <Typography variant="body2">{label}</Typography>
    </TableCell>
  );
};

export default TableBodyCell;
