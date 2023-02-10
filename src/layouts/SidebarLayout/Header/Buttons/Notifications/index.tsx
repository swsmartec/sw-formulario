import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { formatDistance, subDays } from 'date-fns';

import { apiNotificationList } from '../../../../../../constants/api';

import { post } from '../../../../../../helpers/service';
import React from 'react';
import Link from 'next/link';
import { notifications } from '../../../../../../helpers/notifications';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [externalNotification, setExternalNotification] = React.useState<any[]>(
    []
  );
  const [badgeContent, setbadgeContent] = React.useState<any>(0);
  const intervalTime: number =
    parseInt(process.env.NEXT_PUBLIC_INTERVAL_TIME) || 5000;

  const getData = async () => {
    let count = 0;
    const wsTypeIdentifier = await post(apiNotificationList, {});
    if (wsTypeIdentifier) {
      let value: any[] = wsTypeIdentifier;
      count = value.length;
      setExternalNotification(value);
      setbadgeContent(count);
    }
    return count;
  };
  const handleOpen = async () => {
    setOpen(true);
    let countNumber: number = await getData();
    setbadgeContent(countNumber);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  React.useEffect(() => {
    const interval = setInterval(async () => {
      let countNumber: number = await getData();
      setbadgeContent(countNumber);
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    getData().then((resp) => {
      setbadgeContent(resp);
      if (resp > 0) {
        notifications({
          title: 'Notificación',
          message: 'Tiene algunos formularios pendientes por revisar.',
          toastType: 'warning'
        });
      }
    });
  }, []);

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={badgeContent}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notificaciones</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {externalNotification.map((element) => {
            return (
              <>
                <Link
                  href={`/management/formulario/detail/${element.FormularioId}`}
                  onClick={() => handleClose()}
                >
                  <ListItem
                    sx={{
                      p: 2,
                      minWidth: 350,
                      display: { xs: 'block', sm: 'flex' }
                    }}
                  >
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {element.Estado.Descripcion}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ textTransform: 'none' }}
                        >
                          {formatDistance(subDays(new Date(), 3), new Date(), {
                            addSuffix: true
                          })}
                        </Typography>
                      </Box>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {' '}
                        {element.RazonSocial}
                      </Typography>
                    </Box>
                  </ListItem>
                </Link>
              </>
            );
          })}
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
