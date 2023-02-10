import { UsuarioContext } from '@/contexts/UsuarioContext';
import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { IUsuario } from 'interfaces/Usuario';
import React, { useCallback, useContext, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FileFieldFirma from '@/components/FormFields/FileFieldFirma';

export const FormUsuarioSigned = () => {
  const { selectedResult, isSigned, changeSigned, updateSigned } =
    useContext(UsuarioContext);

  const {
    UsuarioId,
    NombresCompletos,
    NombreUsuario,
    Clave,
    Email,
    IPs,
    Estado,
    FechaInicio,
    FechaFin,
    Roles,
    UsuarioBVQ,
    Firma,
    CargoId,
    Cargo,
    DepartamentoId,
    Departamento,
    RolId,
    Rol,
    EnviarEmail,
    DocFirmado,
    ClaveFirma
  } = selectedResult;

  const formValues: IUsuario = {
    UsuarioId,
    NombresCompletos,
    NombreUsuario,
    Clave,
    Email,
    IPs,
    Estado,
    FechaInicio,
    FechaFin,
    Roles,
    UsuarioBVQ,
    Firma,
    CargoId,
    Cargo,
    DepartamentoId,
    Departamento,
    RolId,
    Rol,
    EnviarEmail,
    DocFirmado: '',
    ClaveFirma: ''
  } as IUsuario;

  const _Submit = (formData: IUsuario) => {
    isSigned && updateSigned && updateSigned(formData);
  };

  return (
    <>
      <Formik initialValues={formValues} onSubmit={_Submit}>
        {function LoadData({ values, errors, handleChange, setFieldValue }) {
          const setData = useCallback(() => {
            if (isSigned) {
              console.log('firma');
            }
          }, [setFieldValue]);

          useEffect(() => {
            setData();
          }, [setData]);

          return (
            <Form>
              <div className="modal-body">
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={1}
                >
                  <Grid item xs={12}>
                    <FormGroup>
                      <FileFieldFirma
                        name={`DocFirmado`}
                        label={'Firma electronica'}
                        required
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="ClaveFirma"
                      label="Contraseña firma electronica"
                      type="password"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.ClaveFirma}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.ClaveFirma}
                      helperText={errors.ClaveFirma}
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid item sx={{ mt: 1 }}>
                <Button
                  sx={{ mt: { xs: 2, md: 0 }, mr: 0.5 }}
                  variant="contained"
                  color={'error'}
                  size={'small'}
                  onClick={() => {
                    changeSigned && changeSigned(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  sx={{ mt: { xs: 2, md: 0 } }}
                  variant="contained"
                  color={'success'}
                  type={'submit'}
                  size={'small'}
                >
                  Guardar
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
