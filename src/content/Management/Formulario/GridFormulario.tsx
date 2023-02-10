import { FormularioContext } from '@/contexts/FormularioContext';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Card,
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
import { IFormulario } from 'interfaces/Formulario';
import Link from 'next/link';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from '@/contexts/AuthContext';
import { Config, ROLE } from '../../../../constants/default';

const applyPagination = (
  listResult: IFormulario[],
  page: number,
  limit: number
): IFormulario[] => {
  return listResult.slice(page * limit, page * limit + limit);
};

const GridFormulario = () => {
  const { hasPermissions } = useContext(AuthContext);
  const theme = useTheme();
  const { loading, listResult, changeList } = useContext(FormularioContext);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(Config.Paginate);

  useEffect(() => {
    changeList(true);
  }, []);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedResult = applyPagination(listResult, page, limit);

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>Tipo de Formulario</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((result: IFormulario) => {
              return (
                <TableRow hover key={result.FormularioId}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {result.FormularioId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Identificacion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.RazonSocial}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.TipoFormulario?.Nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" gutterBottom noWrap>
                      {result.Estado?.Nombre}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {hasPermissions([ROLE.ViewFormulario]) && (
                      <Tooltip title="Detalle del formulario" arrow>
                        <Link
                          href={`/management/formulario/detail/${result.FormularioId}`}
                        >
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.secondary.dark
                            }}
                            color="inherit"
                            size="small"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    )}
                    {hasPermissions([ROLE.ChangeFormulario]) && (
                      <Tooltip title="Editar formulario" arrow>
                        <Link
                          href={`/management/formulario/form/${result.FormularioId}`}
                        >
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.secondary.dark
                            }}
                            color="inherit"
                            size="small"
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Link>
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
    </Card>
  );
};

export default GridFormulario;
