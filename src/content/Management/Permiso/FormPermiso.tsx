import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import React, { useCallback, useContext, useEffect } from 'react';
import { PermisoContext } from '@/contexts/PermisoContext';
import { IAccion, IPermiso, IRolAccion } from 'interfaces/Permiso';

export const FormPermiso = () => {
  const modules = ['formulario', 'ciudadano', 'catalogo', 'usuario', 'permiso'];

  const {
    selectedResult,
    isNew,
    isEdit,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister
  } = useContext(PermisoContext);

  const { RolId, Nombre, Codigo } = selectedResult;

  const _Accion = (
    module: string,
    action: string,
    rolesAciones: IRolAccion[]
  ) => {
    let perm = `${module}_${action}`;
    let values = rolesAciones.find(
      (r) => r.Module === module && r.Codigo === perm
    );
    if (values) return true;
    return false;
  };

  const _Acciones = (rolesAciones: IRolAccion[]) => {
    const acciones: IAccion[] = modules.map((m) => {
      let listRolesAcciones = rolesAciones.filter((r) => r.Module === m);
      return {
        Module: m,
        View: _Accion(m, 'view', listRolesAcciones),
        Add: _Accion(m, 'add', listRolesAcciones),
        Change: _Accion(m, 'change', listRolesAcciones),
        Delete: _Accion(m, 'delete', listRolesAcciones)
      } as IAccion;
    });
    return acciones;
  };

  const formValues: IPermiso = {
    RolId,
    Nombre,
    Codigo,
    Acciones: _Acciones([])
  } as IPermiso;

  const _Submit = (formData: IPermiso) => {
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
              setFieldValue('Codigo', selectedResult.Codigo);
              setFieldValue('Acciones', _Acciones(selectedResult.RolesAciones));
            }
          }, [setFieldValue]);

          useEffect(() => {
            setData();
          }, [setData]);

          return (
            <Form>
              <div className="modal-body">
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      id="Codigo"
                      label="Codigo"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      value={values.Codigo}
                      style={{ width: '100%' }}
                      required
                      error={!!errors.Codigo}
                      helperText={errors.Codigo}
                    />
                  </Grid>
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
                    <FieldArray
                      key={'Acciones'}
                      name={'Acciones'}
                      render={(_arrayHelpers) => (
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            Accion
                          </Grid>
                          <Grid item xs={2} sx={{ textAlign: 'center' }}>
                            Ver
                          </Grid>
                          <Grid item xs={2} sx={{ textAlign: 'center' }}>
                            Crear
                          </Grid>
                          <Grid item xs={2} sx={{ textAlign: 'center' }}>
                            Editar
                          </Grid>
                          <Grid item xs={2} sx={{ textAlign: 'center' }}>
                            Eliminar
                          </Grid>
                          {values.Acciones &&
                            values.Acciones.length > 0 &&
                            values.Acciones.map(
                              (item: IAccion, index: number) => (
                                <>
                                  <Grid item xs={4}>
                                    <TextField
                                      id="outlined-size-small"
                                      defaultValue="Small"
                                      size="small"
                                      value={item.Module.toUpperCase()}
                                      disabled
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    sx={{ textAlign: 'center' }}
                                  >
                                    <Checkbox
                                      name={`Acciones.${index}.View`}
                                      value={item.View}
                                      checked={item.View}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    sx={{ textAlign: 'center' }}
                                  >
                                    <Checkbox
                                      name={`Acciones.${index}.Add`}
                                      value={item.Add}
                                      checked={item.Add}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    sx={{ textAlign: 'center' }}
                                  >
                                    <Checkbox
                                      name={`Acciones.${index}.Change`}
                                      value={item.Change}
                                      checked={item.Change}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    sx={{ textAlign: 'center' }}
                                  >
                                    <Checkbox
                                      name={`Acciones.${index}.Delete`}
                                      value={item.Delete}
                                      checked={item.Delete}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                </>
                              )
                            )}
                        </Grid>
                      )}
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
