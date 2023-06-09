import { Box, Typography } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [divPosition, setDivPostion] = useState<DOMRect>();

  useEffect(() => {
    ref.current && setDivPostion(ref.current.getBoundingClientRect());
  }, [ref]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        padding: '16px 36px'
      }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: `-${divPosition && divPosition.left}px`,
          height: '100%',
          width: '100vw',
          backgroundColor: '#F7FBFE',
          zIndex: -1
        }}></Box>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};

export default PageTitle;
