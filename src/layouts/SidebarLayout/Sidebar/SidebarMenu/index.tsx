import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import {
  alpha,
  Box,
  Button,
  List,
  ListItem,
  ListSubheader,
  styled
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { AuthContext } from '@/contexts/AuthContext';
import { ROLE } from '../../../../../constants/default';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;
  const { hasPermissions } = useContext(AuthContext);
  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/management/formulario" passHref>
                  <Button
                    className={
                      currentRoute === '="/management/formulario'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<DesignServicesTwoToneIcon />}
                  >
                    Inicio
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {hasPermissions([ROLE.ViewFormulario, ROLE.ViewCiudadano]) && (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Formularios
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                {hasPermissions([ROLE.ViewFormulario]) && (
                  <ListItem component="div">
                    <NextLink href="/management/formulario" passHref>
                      <Button
                        className={
                          currentRoute === '/management/formulario'
                            ? 'active'
                            : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<TableChartTwoToneIcon />}
                      >
                        Formulario
                      </Button>
                    </NextLink>
                  </ListItem>
                )}
                {hasPermissions([ROLE.ViewCiudadano]) && (
                  <ListItem component="div">
                    <NextLink href="/management/ciudadano" passHref>
                      <Button
                        className={
                          currentRoute === '/management/ciudadano'
                            ? 'active'
                            : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<TableChartTwoToneIcon />}
                      >
                        Ciudadano
                      </Button>
                    </NextLink>
                  </ListItem>
                )}
              </List>
            </SubMenuWrapper>
          </List>
        )}

        {hasPermissions([
          ROLE.ViewCatalogo,
          ROLE.ViewUsuario,
          ROLE.ViewPermiso
        ]) && (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Configuraciones
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                {hasPermissions([ROLE.ViewCatalogo]) && (
                  <ListItem component="div">
                    <NextLink href="/management/catalogo" passHref>
                      <Button
                        className={
                          currentRoute === '/management/catalogo'
                            ? 'active'
                            : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<TableChartTwoToneIcon />}
                      >
                        Catálogo
                      </Button>
                    </NextLink>
                  </ListItem>
                )}
                {hasPermissions([ROLE.ViewUsuario]) && (
                  <ListItem component="div">
                    <NextLink href="/management/usuario" passHref>
                      <Button
                        className={
                          currentRoute === '/management/usuario' ? 'active' : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<TableChartTwoToneIcon />}
                      >
                        Usuarios
                      </Button>
                    </NextLink>
                  </ListItem>
                )}
                {hasPermissions([ROLE.ViewPermiso]) && (
                  <ListItem component="div">
                    <NextLink href="/management/permiso" passHref>
                      <Button
                        className={
                          currentRoute === '/management/permiso' ? 'active' : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<TableChartTwoToneIcon />}
                      >
                        Roles
                      </Button>
                    </NextLink>
                  </ListItem>
                )}
              </List>
            </SubMenuWrapper>
          </List>
        )}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
