import { Box, MenuItem, Stack, Typography, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';

export interface NavSubMenuItemProps {
  label: string;
  subLabel: string;
  url?: string;
  icon: ReactNode;
  color: string;
}

const NavSubMenuItem: FC<NavSubMenuItemProps> = ({
  label,
  subLabel,
  url,
  icon,
  color
}) => {
  return (
    <Link href={url ? url : '#'} style={{ borderRadius: '12px' }}>
      <Box
        sx={{
          padding: '6px 24px',
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}>
        <Stack
          direction="row"
          p={2}
          width="100%"
          justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                padding: '6px',
                backgroundColor: alpha(color, 0.1),
                borderRadius: '6px',
                color: color
              }}>
              {icon}
            </Box>
            <Stack>
              <Typography variant="body1">{label}</Typography>
              <Typography variant="body1" sx={{ fontSize: '14px' }}>
                {subLabel}
              </Typography>
            </Stack>
          </Stack>
          <EastIcon sx={{ ml: 3, color: color }} />
        </Stack>
      </Box>
    </Link>
  );
};

export default NavSubMenuItem;
