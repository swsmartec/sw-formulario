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
import React, { ChangeEvent, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PermisoContext } from '@/contexts/PermisoContext';
import { IPermiso } from 'interfaces/Permiso';
import { FormPermiso } from '@/content/Management/Permiso/FormPermiso';
import { Config, ROLE } from '../../../../constants/default';
import { AuthContext } from '@/contexts/AuthContext';

const applyPagination = (
  listResult: IPermiso[],
  page: number,
  limit: number
): IPermiso[] => {
  return listResult.slice(page * limit, page * limit + limit);
};

const GridPermiso = () => {
  const { hasPermissions } = useContext(AuthContext);
  const theme = useTheme();
  const {
    loading,
    listResult,
    selectedResult,
    isNew,
    isEdit,
    isDelete,

    setCurrentResult,
    changeNew,
    changeEdit,
    changeDelete,
    deleteRegister
  } = useContext(PermisoContext);

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

  const handleOpenUpdate = (result: IPermiso) => {
    setCurrentResult(result);
    changeEdit && changeEdit(true);
  };

  const handleCloseDelete = () => {
    changeDelete && changeDelete(false);
  };

  const handleOpenDelete = (result: IPermiso) => {
    setCurrentResult(result);
    changeDelete && changeDelete(true);
  };
  const handleDelete = () => {
    isDelete && deleteRegister && deleteRegister(selectedResult.RolId);
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((result: IPermiso) => {
              return (
                <TableRow hover key={result.RolId}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {result.RolId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Codigo}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {hasPermissions([ROLE.ChangePermiso]) && (
                      <Tooltip title="Editar permiso" arrow>
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
                    )}
                    {hasPermissions([ROLE.DeletePermiso]) && (
                      <Tooltip title="Eliminar permiso" arrow>
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
            {isNew ? 'Nuevo Permiso' : 'Editar Permiso'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <FormPermiso />
          </DialogContent>
        </Dialog>
      )}
      {isDelete && (
        <Dialog open={isDelete} onClose={handleCloseDelete}>
          <DialogTitle>{'Eliminar permiso'}</DialogTitle>
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

export default GridPermiso;
