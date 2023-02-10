import Label from '@/components/Label';
import { FormUsuario } from '@/content/Management/Usuario/FormUsuario';
import { UsuarioContext } from '@/contexts/UsuarioContext';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { IUsuario } from 'interfaces/Usuario';
import React, { ChangeEvent, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '@/contexts/AuthContext';
import { Config, ROLE } from '../../../../constants/default';
import LockIcon from '@mui/icons-material/Lock';
import TaskIcon from '@mui/icons-material/Task';
import { FormUsuarioPassword } from '@/content/Management/Usuario/FormUsuarioPassword';
import { FormUsuarioSigned } from '@/content/Management/Usuario/FormUsuarioSigned';
const applyPagination = (
  listResult: IUsuario[],
  page: number,
  limit: number
): IUsuario[] => {
  return listResult.slice(page * limit, page * limit + limit);
};

const getStatusLabel = (state: string): JSX.Element => {
  let text, color;
  switch (state) {
    case 'A':
      text = 'Activo';
      color = 'success';
      break;
    case 'I':
      text = 'Inactivo';
      color = 'error';
      break;
    default:
      text = 'Desconocido';
      color = 'warning';
  }
  return <Label color={color}>{text}</Label>;
};

const GridUsuario = () => {
  const { hasPermissions } = useContext(AuthContext);
  const theme = useTheme();
  const {
    loading,
    listResult,
    selectedResult,
    isNew,
    isEdit,
    isDelete,
    isPassword,
    isSigned,

    setCurrentResult,
    changeNew,
    changeEdit,
    changePassword,
    changeSigned,
    changeDelete,
    deleteRegister
  } = useContext(UsuarioContext);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(Config.Paginate);

  const paginatedResult = applyPagination(listResult, page, limit);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleClose = () => {
    changeNew && changeNew(false);
    changeEdit && changeEdit(false);
  };

  const handleClosePassword = () => {
    changePassword && changePassword(false);
  };

  const handleCloseSigned = () => {
    changeSigned && changeSigned(false);
  };

  const handleOpenUpdate = (result: IUsuario) => {
    setCurrentResult(result);
    changeEdit && changeEdit(true);
  };

  const handleOpenPassword = (result: IUsuario) => {
    setCurrentResult(result);
    changePassword && changePassword(true);
  };
  const handleOpenSigned = (result: IUsuario) => {
    setCurrentResult(result);
    changeSigned && changeSigned(true);
  };

  const handleCloseDelete = () => {
    changeDelete && changeDelete(false);
  };

  const handleOpenDelete = (result: IUsuario) => {
    setCurrentResult(result);
    changeDelete && changeDelete(true);
  };
  const handleDelete = () => {
    isDelete && deleteRegister && deleteRegister(selectedResult.UsuarioId);
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Nombres Completos</TableCell>
              <TableCell>IPs</TableCell>
              <TableCell>Fecha fin</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((result: IUsuario) => {
              return (
                <TableRow hover key={result.UsuarioId}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {result.UsuarioId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.NombreUsuario}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {result.Email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.NombresCompletos}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.IPs}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.FechaFin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Roles}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(result.Estado)}
                  </TableCell>
                  <TableCell align="right">
                    {hasPermissions([ROLE.ChangeUsuario]) && (
                      <>
                        <Tooltip title="Cambio de contraseña" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.secondary.lighter
                              },
                              color: theme.palette.secondary.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleOpenPassword(result)}
                          >
                            <LockIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Firma electrónica" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.warning.lighter
                              },
                              color: theme.palette.warning.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleOpenSigned(result)}
                          >
                            <TaskIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar usuario" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleOpenUpdate(result)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {hasPermissions([ROLE.DeleteUsuario]) && (
                      <Tooltip title="Eliminar usuario" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleOpenDelete(result)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {loading ? (
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Box>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={listResult.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={Config.PaginateScale}
        />
      </Box>
      {(isNew || isEdit) && (
        <Dialog open={isNew || isEdit} onClose={handleClose}>
          <DialogTitle>
            {isNew ? 'Nuevo usuario' : 'Editar usuario'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Formulario de usuario</DialogContentText>
            <FormUsuario />
          </DialogContent>
        </Dialog>
      )}
      {isPassword && (
        <Dialog
          open={isPassword}
          onClose={handleClosePassword}
          maxWidth={'sm'}
          fullWidth
        >
          <DialogTitle>Cambiar contraseña</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formulario de cambio de contraseña
            </DialogContentText>
            <FormUsuarioPassword />
          </DialogContent>
        </Dialog>
      )}
      {isSigned && (
        <Dialog open={isSigned} onClose={handleCloseSigned}>
          <DialogTitle>Firma Electrónica</DialogTitle>
          <DialogContent>
            <DialogContentText>Formulario de electrónica</DialogContentText>
            <FormUsuarioSigned />
          </DialogContent>
        </Dialog>
      )}
      {isDelete && (
        <Dialog open={isDelete} onClose={handleCloseDelete}>
          <DialogTitle>Eliminar usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color={'error'}
              size={'small'}
              onClick={handleCloseDelete}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color={'success'}
              size={'small'}
              onClick={handleDelete}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};

export default GridUsuario;
