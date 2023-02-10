import { FormCatalogo } from '@/content/Management/Catalogo/FormCatalogo';
import { CatalogoContext } from '@/contexts/CatalogoContext';
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
import { ICatalogo } from 'interfaces/Catalogo';
import React, { ChangeEvent, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '@/contexts/AuthContext';
import { Config, ROLE } from '../../../../constants/default';

const applyPagination = (
  listResult: ICatalogo[],
  page: number,
  limit: number
): ICatalogo[] => {
  return listResult.slice(page * limit, page * limit + limit);
};

const GridCatalogo = () => {
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
  } = useContext(CatalogoContext);

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

  const handleOpenUpdate = (result: ICatalogo) => {
    setCurrentResult(result);
    changeEdit && changeEdit(true);
  };

  const handleCloseDelete = () => {
    changeDelete && changeDelete(false);
  };

  const handleOpenDelete = (result: ICatalogo) => {
    setCurrentResult(result);
    changeDelete && changeDelete(true);
  };
  const handleDelete = () => {
    isDelete &&
      deleteRegister &&
      deleteRegister(selectedResult.ListaSeleccionId);
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Ámbito</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((result: ICatalogo) => {
              return (
                <TableRow hover key={result.ListaSeleccionId}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {result.ListaSeleccionId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Valor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Ambito}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Descripcion}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {hasPermissions([ROLE.ChangeCatalogo]) && (
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
                    {hasPermissions([ROLE.DeleteCatalogo]) && (
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
            {isNew ? 'Nuevo Catálogo' : 'Editar Catálogo'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <FormCatalogo />
          </DialogContent>
        </Dialog>
      )}
      {isDelete && (
        <Dialog open={isDelete} onClose={handleCloseDelete}>
          <DialogTitle>{'Eliminar catálogo'}</DialogTitle>
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

export default GridCatalogo;
