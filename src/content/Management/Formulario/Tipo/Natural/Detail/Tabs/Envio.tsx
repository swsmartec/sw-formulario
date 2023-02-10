import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TableContainer,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { FormularioContext } from '@/contexts/FormularioContext';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { StepperForm } from '@/workflows/emun';

function EnvioTab() {
  const { selectedResult } = useContext(FormularioContext);

  const getLabelEstado = (EstadoId: number | undefined | null) => {
    if (EstadoId === undefined || EstadoId === null) return '';
    let value = StepperForm.find((s) => s.StepperId === EstadoId);
    if (value) return value.StepperName;
    return '';
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Información Envios
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid item xs={12} sm={12}>
                <TableContainer>
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Fecha de Inicio</TableCell>
                        <TableCell align="center">Fecha de Fin</TableCell>
                        <TableCell align="center">Estado Anterior</TableCell>
                        <TableCell align="center">Estado Posterior</TableCell>
                        <TableCell align="center">Observaciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedResult.Envio.map((send) => {
                        return (
                          <TableRow key={send.FormularioEnvioId.toString()}>
                            <TableCell>{send.FechaInicio}</TableCell>
                            <TableCell>{send.FechaFin}</TableCell>
                            <TableCell>
                              {getLabelEstado(send.EstadoInicioId)}
                            </TableCell>
                            <TableCell>
                              {getLabelEstado(send.EstadoFinId)}
                            </TableCell>
                            <TableCell>{send.Comentario}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EnvioTab;
