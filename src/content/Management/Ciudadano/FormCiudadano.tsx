import { CiudadanoContext } from '@/contexts/CiudadanoContext';
import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { ICiudadano } from 'interfaces/Ciudadano';
import React, { useCallback, useContext, useEffect } from 'react';

export const FormCiudadano = () => {
  const {
    selectedResult,
    isNew,
    isEdit,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister
  } = useContext(CiudadanoContext);

  const {
    CiudadanoId,
    CondicionCedulado,
    NumeroCedula,
    Apellidos,
    Nombres,
    Nacionalidad,
    EstadoCivil,
    Conyuge,
    ProfesionOcupacion,
    Direccion,
    Genero,
    LugarNacimiento,
    FechaMatrimonio,
    FechaDefuncion
  } = selectedResult;

  const formValues: ICiudadano = {
    CiudadanoId,
    CondicionCedulado,
    NumeroCedula,
    Apellidos,
    Nombres,
    Nacionalidad,
    EstadoCivil,
    Conyuge,
    ProfesionOcupacion,
    Direccion,
    Genero,
    LugarNacimiento,
    FechaMatrimonio,
    FechaDefuncion
  } as ICiudadano;

  const _Submit = (formData: ICiudadano) => {
    isEdit && updateRegister && updateRegister(formData);
    isNew && createRegister && createRegister(formData);
  };

  return (
    <>
      <Formik initialValues={formValues} onSubmit={_Submit}>
        {function LoadData({ values, errors, handleChange, setFieldValue }) {
          const setData = useCallback(() => {
            if (isEdit) {
              setFieldValue(
                'CondicionCedulado',
                selectedResult.CondicionCedulado
              );
              setFieldValue('NumeroCedula', selectedResult.NumeroCedula);
              setFieldValue('Apellidos', selectedResult.Apellidos);
              setFieldValue('Nombres', selectedResult.Nombres);
              setFieldValue('Nacionalidad', selectedResult.Nacionalidad);
              setFieldValue('EstadoCivil', selectedResult.EstadoCivil);
              setFieldValue('Conyuge', selectedResult.Conyuge);
              setFieldValue(
                'ProfesionOcupacion',
                selectedResult.ProfesionOcupacion
              );
              setFieldValue('Direccion', selectedResult.Direccion);
              setFieldValue('Genero', selectedResult.Genero);
              setFieldValue('LugarNacimiento', selectedResult.LugarNacimiento);
              setFieldValue('FechaMatrimonio', selectedResult.FechaMatrimonio);
              setFieldValue('FechaDefuncion', selectedResult.FechaDefuncion);
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
                    <TextField
                      margin="dense"
                      id="CondicionCedulado"
                      label="CondicionCedulado"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.CondicionCedulado}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.CondicionCedulado}
                      helperText={errors.CondicionCedulado}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="NumeroCedula"
                      label="NumeroCedula"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.NumeroCedula}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.NumeroCedula}
                      helperText={errors.NumeroCedula}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Apellidos"
                      label="Apellidos"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Apellidos}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Apellidos}
                      helperText={errors.Apellidos}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Nombres"
                      label="Nombres"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Nombres}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Nombres}
                      helperText={errors.Nombres}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Nacionalidad"
                      label="Nacionalidad"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Nacionalidad}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Nacionalidad}
                      helperText={errors.Nacionalidad}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="EstadoCivil"
                      label="EstadoCivil"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.EstadoCivil}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.EstadoCivil}
                      helperText={errors.EstadoCivil}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Conyuge"
                      label="Conyuge"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Conyuge}
                      style={{ width: '100%' }}
                      error={!!errors.Conyuge}
                      helperText={errors.Conyuge}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="ProfesionOcupacion"
                      label="Profesion Ocupacion"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.ProfesionOcupacion}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.ProfesionOcupacion}
                      helperText={errors.ProfesionOcupacion}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Direccion"
                      label="Direccion"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Direccion}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Direccion}
                      helperText={errors.Direccion}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Genero"
                      label="Genero"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Genero}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Genero}
                      helperText={errors.Genero}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="LugarNacimiento"
                      label="LugarNacimiento"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.LugarNacimiento}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.LugarNacimiento}
                      helperText={errors.LugarNacimiento}
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
                    changeNew && changeNew(false);
                    changeEdit && changeEdit(false);
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
