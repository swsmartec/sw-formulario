import { CatalogoContext } from '@/contexts/CatalogoContext';
import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { ICatalogo } from 'interfaces/Catalogo';
import React, { useCallback, useContext, useEffect } from 'react';

export const FormCatalogo = () => {
  const {
    selectedResult,
    isNew,
    isEdit,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister
  } = useContext(CatalogoContext);

  const { ListaSeleccionId, Nombre, Valor, Ambito, Descripcion } =
    selectedResult;

  const formValues: ICatalogo = {
    ListaSeleccionId,
    Nombre,
    Valor,
    Ambito,
    Descripcion
  } as ICatalogo;

  const _Submit = (formData: ICatalogo) => {
    isEdit && updateRegister && updateRegister(formData);
    isNew && createRegister && createRegister(formData);
  };

  return (
    <>
      <Formik initialValues={formValues} onSubmit={_Submit}>
        {function LoadData({ values, errors, handleChange, setFieldValue }) {
          const setData = useCallback(() => {
            if (isEdit) {
              setFieldValue('Nombre', selectedResult.Nombre);
              setFieldValue('Valor', selectedResult.Valor);
              setFieldValue('Ambito', selectedResult.Ambito);
              setFieldValue('Descripcion', selectedResult.Descripcion);
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
                      id="Nombre"
                      label="Nombre"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Nombre}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Nombre}
                      helperText={errors.Nombre}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Valor"
                      label="Valor"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Valor}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Valor}
                      helperText={errors.Valor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Ambito"
                      label="Ambito"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Ambito}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Ambito}
                      helperText={errors.Ambito}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Descripcion"
                      label="Descripcion"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Descripcion}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Descripcion}
                      helperText={errors.Descripcion}
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
