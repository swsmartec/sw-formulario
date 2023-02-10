import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TableContainer,
  Typography
} from '@mui/material';
import { formModel } from '@/content/NaturalForm/Model';
import { getValueCatalog } from 'helpers/Utils';
import { useContext } from 'react';
import { FormularioContext } from '@/contexts/FormularioContext';
import { IBaseFieldProps } from 'interfaces/Formulario';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface IBaseProps extends IBaseFieldProps {
  values: object;
}

function ReferenciasTab() {
  const { selectedResult, listCatalogoServicio } =
    useContext(FormularioContext);
  const { ObjectDetalle } = selectedResult;
  const {
    formField: { representative, bankReferences, bankReferencesRepresentative }
  } = formModel;

  let _bankReferencesC = ObjectDetalle[bankReferences.name];
  let _bankReferencesR = ObjectDetalle[bankReferencesRepresentative.name];

  const Field = (FieldProps: IBaseProps) => {
    let { field, values } = FieldProps;
    return <b>{values[field.name]}</b>;
  };
  const FieldBoolean = (FieldProps: IBaseProps) => {
    let { field, values } = FieldProps;
    let boolField = values[field.name];
    return <b>{boolField ? 'SI' : 'NO'}</b>;
  };
  const FieldCatalog = (FieldProps: IBaseProps) => {
    let { field, values } = FieldProps;
    let value = getValueCatalog(field, values, listCatalogoServicio);
    return <b>{value}</b>;
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
                Referencias bancarias del cliente
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                  <TableContainer>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            Nombre del Banco o Institución Financiera
                          </TableCell>
                          <TableCell align="center">Número de Cuenta</TableCell>
                          <TableCell align="center">Tipo de Cuenta</TableCell>
                          <TableCell align="center">Pais</TableCell>
                          <TableCell align="center">
                            Cuenta autorizada
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {_bankReferencesC.map((bank, index) => (
                          <TableRow key={`bank-references-c-${index}`}>
                            <TableCell>
                              <FieldCatalog
                                field={bankReferences.childItem.nameBank}
                                values={bank}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Field
                                field={bankReferences.childItem.accountNumber}
                                values={bank}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <FieldCatalog
                                field={bankReferences.childItem.accountType}
                                values={bank}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <FieldCatalog
                                field={bankReferences.childItem.countryBank}
                                values={bank}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <FieldBoolean
                                field={
                                  bankReferences.childItem.authorizedAccount
                                }
                                values={bank}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {ObjectDetalle[representative.name] && (
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
                  Referencias bancarias del representante legal o apoderado
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer>
                      <Table aria-label="spanning table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              Nombre del Banco o Institución Financiera
                            </TableCell>
                            <TableCell align="center">
                              Número de Cuenta
                            </TableCell>
                            <TableCell align="center">Tipo de Cuenta</TableCell>
                            <TableCell align="center">Pais</TableCell>
                            <TableCell align="center">
                              Cuenta autorizada
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {_bankReferencesR.map((bank, index) => (
                            <TableRow key={`bank-references-r-${index}`}>
                              <TableCell>
                                <FieldCatalog
                                  field={
                                    bankReferencesRepresentative.childItem
                                      .nameBank
                                  }
                                  values={bank}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Field
                                  field={
                                    bankReferencesRepresentative.childItem
                                      .accountNumber
                                  }
                                  values={bank}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <FieldCatalog
                                  field={
                                    bankReferencesRepresentative.childItem
                                      .accountType
                                  }
                                  values={bank}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <FieldCatalog
                                  field={
                                    bankReferencesRepresentative.childItem
                                      .countryBank
                                  }
                                  values={bank}
                                />
                              </TableCell>

                              <TableCell align="center">
                                <FieldBoolean
                                  field={
                                    bankReferencesRepresentative.childItem
                                      .authorizedAccount
                                  }
                                  values={bank}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default ReferenciasTab;
