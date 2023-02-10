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
import { downloadBase64Data } from 'helpers/Utils';
import React, { useContext } from 'react';
import { FormularioContext } from '@/contexts/FormularioContext';
import { IBaseFieldProps } from 'interfaces/Formulario';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

interface IBaseProps extends IBaseFieldProps {
  values: object;
}

function DocumentacionTab() {
  const { selectedResult } = useContext(FormularioContext);
  const { ObjectDetalle } = selectedResult;
  const {
    formField: { files }
  } = formModel;

  let _files = ObjectDetalle[files.name];

  const Field = (FieldProps: IBaseProps) => {
    let { field, values } = FieldProps;
    return <b>{values[field.name]}</b>;
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
                Documentación
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
                          <TableCell align="center">Descripción</TableCell>
                          <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {_files.map((file, index) => (
                          <TableRow key={`files-${index}`}>
                            <TableCell>
                              <Field
                                field={files.childItem.fileName}
                                values={file}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                sx={{ mb: 1.5 }}
                                variant="contained"
                                size={'small'}
                                onClick={() => {
                                  downloadBase64Data(
                                    file[files.childItem.file.name],
                                    file[files.childItem.fileName.name]
                                  );
                                }}
                                name="close"
                              >
                                Descargar archivo
                              </Button>
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
    </Grid>
  );
}

export default DocumentacionTab;
