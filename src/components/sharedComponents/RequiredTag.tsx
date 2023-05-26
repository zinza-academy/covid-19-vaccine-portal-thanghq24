import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { FC } from 'react';

const RequiredTag: FC = () => {
  return (
    <Typography component="span" display="inline" color={red[600]}>
      (*)
    </Typography>
  );
};

export default RequiredTag;
