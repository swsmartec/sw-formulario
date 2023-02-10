import { FormCiudadano } from '@/content/Management/Ciudadano/FormCiudadano';
import { CiudadanoContext } from '@/contexts/CiudadanoContext';
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
import { ICiudadano } from 'interfaces/Ciudadano';
import React, { ChangeEvent, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '@/contexts/AuthContext';
import { Config, ROLE } from '../../../../constants/default';

const applyPagination = (
  listResult: ICiudadano[],
  page: number,
  limit: number
): ICiudadano[] => {
  return listResult.slice(page * limit, page * limit + limit);
};

const GridCiudadano = () => {
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
  } = useContext(CiudadanoContext);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(Config.Paginate);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedResult = applyPagination(listResult, page, limit);

  const handleClose = () => {
    changeNew && changeNew(false);
    changeEdit && changeEdit(false);
  };

  const handleOpenUpdate = (result: ICiudadano) => {
    setCurrentResult(result);
    changeEdit && changeEdit(true);
  };

  const handleCloseDelete = () => {
    changeDelete && changeDelete(false);
  };

  const handleOpenDelete = (result: ICiudadano) => {
    setCurrentResult(result);
    changeDelete && changeDelete(true);
  };
  const handleDelete = () => {
    isDelete && deleteRegister && deleteRegister(selectedResult.CiudadanoId);
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell>Nombres completos</TableCell>
              <TableCell>Nacionalidad</TableCell>
              <TableCell>Estado civil</TableCell>
              <TableCell>Condición cedulado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((result: ICiudadano) => {
              return (
                <TableRow hover key={result.CiudadanoId}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {result.CiudadanoId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.NumeroCedula}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Apellidos} {result.Nombres}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Nacionalidad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.EstadoCivil}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.CondicionCedulado}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {hasPermissions([ROLE.ChangeCiudadano]) && (
                      <Tooltip title="Editar catálogo" arrow>
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

                    {hasPermissions([ROLE.DeleteCiudadano]) && (
                      <Tooltip title="Eliminar catálogo" arrow>
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
            {isNew ? 'Nuevo Ciudadano' : 'Editar Ciudadano'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <FormCiudadano />
          </DialogContent>
        </Dialog>
      )}
      {isDelete && (
        <Dialog open={isDelete} onClose={handleCloseDelete}>
          <DialogTitle>{'Eliminar ciudadano'}</DialogTitle>
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

export default GridCiudadano;
