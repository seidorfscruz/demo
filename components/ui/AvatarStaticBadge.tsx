import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Icon } from '@iconify/react';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 20,
  height: 20,
  border: `2px solid ${theme.palette.background.paper}`,
  fontSize: '12px'
}));

export default function AvatarStaticBadge() {
  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp" src="R" />
        }
      >
        <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/4.jpg" />
      </Badge>
    </Stack>
  );
}