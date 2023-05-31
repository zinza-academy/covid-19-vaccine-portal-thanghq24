import { Box, MenuItem, Stack, Typography, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import EastIcon from '@mui/icons-material/East';

export interface NavSubMenuItemProps {
  label: string;
  subLabel: string;
  url: string;
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
  const router = useRouter();

  const goToUrl = () => {
    return url ? router.push(url) : null;
  };

  return (
    <MenuItem onClick={goToUrl} sx={{ px: 3, borderRadius: '12px' }}>
      <Stack direction="row" p={2}>
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
    </MenuItem>
  );
};

export default NavSubMenuItem;
