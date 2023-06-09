import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import NavSubMenuItem, { NavSubMenuItemProps } from './NavSubMenuItem';
import {
  usePopupState,
  bindHover,
  bindPopover
} from 'material-ui-popup-state/hooks';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import Link from 'next/link';

interface NavMenuItemProps {
  label: string;
  url?: string;
  subMenuItems?: NavSubMenuItemProps[];
}

const NavMenuItem: FC<NavMenuItemProps> = ({ label, url, subMenuItems }) => {
  const router = useRouter();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popover'
  });

  return (
    <>
      <Link href={url ? url : '#'}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            height: '100%',
            textTransform: 'none',
            color: 'white',
            fontWeight: 500,
            padding: '6px 16px'
          }}
          {...bindHover(popupState)}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          {subMenuItems ? (
            <KeyboardArrowDownIcon sx={{ fontWeight: 500 }} />
          ) : null}
        </Stack>
      </Link>
      {subMenuItems ? (
        <HoverPopover
          {...bindPopover(popupState)}
          disableScrollLock={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <Box
            sx={{
              padding: '16px 0px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
            {subMenuItems.map((item, index) => (
              <NavSubMenuItem
                key={index}
                label={item.label}
                subLabel={item.subLabel}
                url={item.url}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </Box>
        </HoverPopover>
      ) : null}
    </>
  );
};

export default NavMenuItem;
