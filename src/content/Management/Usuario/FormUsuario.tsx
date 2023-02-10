import { UsuarioContext } from '@/contexts/UsuarioContext';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { IListCatalog, IUsuario } from 'interfaces/Usuario';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ICatalogo } from 'interfaces/Catalogo';
import { get, post } from 'helpers/service';
import { apiCatalogList, apiCatalogoList, apiPermisoList } from 'constants/api';
import { Catalog, Constants } from 'constants/default';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FileFieldFirma from '@/components/FormFields/FileFieldFirma';
import { IPermiso } from '../../../../interfaces/Permiso';

export const FormUsuario = () => {
  const {
    selectedResult,
    isNew,
    isEdit,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister
  } = useContext(UsuarioContext);

  const [listCatalog, setListCatalog] = useState<IListCatalog>({
    loading: true,
    Departamentos: [],
    Cargos: [],
    Roles: []
  });

  useEffect(() => {
    const getData = async () => {
      let listCatalogo: any[];
      let listRoles: any[];
      const wsCatalogo = await get(apiCatalogoList);
      const wsRoles = await get(apiPermisoList);
      listCatalogo = wsCatalogo;
      listRoles = wsRoles;
      return { listCatalogo, listRoles };
    };
    getData().then((resp) => {
      const { listCatalogo, listRoles } = resp;
      let listDepartamentos = listCatalogo.filter(
        (lc) => lc.Ambito === Constants.CodeAmbitoCatalogoDepartamento
      );
      let listCargos = listCatalogo.filter(
        (lc) => lc.Ambito === Constants.CodeAmbitoCatalogoCargos
      );
      setListCatalog((prev) => ({
        ...prev,
        loading: false,
        Departamentos: listDepartamentos,
        Cargos: listCargos,
        Roles: listRoles
      }));
    });
  }, []);

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
    UsuarioBVQ: false,
    Firma: false,
    CargoId,
    Cargo,
    DepartamentoId,
    Departamento,
    RolId,
    Rol,
    EnviarEmail: false,
    DocFirmado,
    ClaveFirma
  } as IUsuario;

  const _Submit = (formData: IUsuario) => {
    isEdit && updateRegister && updateRegister(formData);
    isNew && createRegister && createRegister(formData);
  };

  return (
    <>
      {listCatalog.loading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Formik initialValues={formValues} onSubmit={_Submit}>
          {function LoadData({ values, errors, handleChange, setFieldValue }) {
            const setData = useCallback(() => {
              if (isEdit) {
                setFieldValue('NombreUsuario', selectedResult.NombreUsuario);
                setFieldValue(
                  'NombresCompletos',
                  selectedResult.NombresCompletos
                );
                setFieldValue('Clave', selectedResult.Clave);
                setFieldValue('Email', selectedResult.Email);
                setFieldValue('IPs', selectedResult.IPs);
                setFieldValue('Estado', selectedResult.Estado);
                setFieldValue('FechaInicio', selectedResult.FechaInicio);
                setFieldValue('FechaFin', selectedResult.FechaFin);
                setFieldValue('Roles', selectedResult.Roles);
                setFieldValue('UsuarioBVQ', selectedResult.UsuarioBVQ);
                setFieldValue('Firma', selectedResult.Firma);
                setFieldValue(
                  'EnviarEmail',
                  selectedResult.EnviarEmail
                    ? selectedResult.EnviarEmail
                    : false
                );
                setFieldValue(
                  'DocFirmado',
                  selectedResult.DocFirmado ? selectedResult.DocFirmado : ''
                );
                setFieldValue(
                  'ClaveFirma',
                  selectedResult.ClaveFirma ? selectedResult.ClaveFirma : ''
                );

                let listDepartamento = listCatalog.Departamentos.filter(
                  (d) => d.ListaSeleccionId === selectedResult.DepartamentoId
                );
                setFieldValue('Departamento', listDepartamento[0]);
                let listCargo = listCatalog.Cargos.filter(
                  (c) => c.ListaSeleccionId === selectedResult.CargoId
                );
                setFieldValue('Cargo', listCargo[0]);
                let listRol = listCatalog.Roles.filter(
                  (r) => r.RolId === selectedResult.RolesId
                );
                setFieldValue('Rol', listRol[0]);
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
                        id="NombresCompletos"
                        label="Nombres Completos"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.NombresCompletos}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.NombresCompletos}
                        helperText={errors.NombresCompletos}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="NombreUsuario"
                        label="Nombre Usuario"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.NombreUsuario}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.NombreUsuario}
                        helperText={errors.NombreUsuario}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="Email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.Email}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.Email}
                        helperText={errors.Email}
                      />
                    </Grid>
                    {!isEdit && (
                      <Grid item xs={12}>
                        <TextField
                          margin="dense"
                          id="Clave"
                          label="Contraseña"
                          type="password"
                          fullWidth
                          variant="standard"
                          onChange={handleChange}
                          value={values.Clave}
                          style={{ width: '100%' }}
                          required
                          error={!!errors.Clave}
                          helperText={errors.Clave}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="IPs"
                        label="IPs"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.IPs}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.IPs}
                        helperText={errors.IPs}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="Estado"
                        label="Estado"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.Estado}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.Estado}
                        helperText={errors.Estado}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="FechaInicio"
                        label="Fecha Inicio"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.FechaInicio}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.FechaInicio}
                        helperText={errors.FechaInicio}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="FechaFin"
                        label="Fecha Fin"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.FechaFin}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.FechaFin}
                        helperText={errors.FechaFin}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        id="Roles"
                        label="Roles"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={values.Roles}
                        style={{ width: '100%' }}
                        required
                        error={!!errors.Roles}
                        helperText={errors.Roles}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        disableClearable
                        disablePortal
                        id="Departamento"
                        onChange={(_event, value) =>
                          setFieldValue('Departamento', value || {})
                        }
                        value={values.Departamento}
                        options={listCatalog.Departamentos}
                        getOptionLabel={(option: ICatalogo) => option.Nombre}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Departamentos"
                            variant="standard"
                            required={false}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        disableClearable
                        disablePortal
                        id="Cargo"
                        onChange={(_event, value) =>
                          setFieldValue('Cargo', value || {})
                        }
                        value={values.Cargo}
                        options={listCatalog.Cargos}
                        getOptionLabel={(option: ICatalogo) => option.Nombre}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Cargos"
                            variant="standard"
                            required={true}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        disableClearable
                        disablePortal
                        id="Rol"
                        onChange={(_event, value) =>
                          setFieldValue('Rol', value || {})
                        }
                        value={values.Rol}
                        options={listCatalog.Roles}
                        getOptionLabel={(option: IPermiso) => option.Nombre}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Roles"
                            variant="standard"
                            required={true}
                          />
                        )}
                      />
                    </Grid>
                    {!isEdit && (
                      <Grid item xs={12}>
                        <FormGroup>
                          <FileFieldFirma
                            name={`DocFirmado`}
                            label={'Firma electronica'}
                          />
                        </FormGroup>
                      </Grid>
                    )}
                    {!isEdit && (
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
                    )}
                    <Grid item xs={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              id="UsuarioBVQ"
                              checked={values.UsuarioBVQ}
                              value={values.UsuarioBVQ}
                              onChange={handleChange}
                            />
                          }
                          label="Usuario BVQ"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              id="Firma"
                              checked={values.Firma}
                              value={values.Firma}
                              onChange={handleChange}
                            />
                          }
                          label="Firma"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              id="EnviarEmail"
                              checked={values.EnviarEmail}
                              value={values.EnviarEmail}
                              onChange={handleChange}
                            />
                          }
                          label="Notificar por mail"
                        />
                      </FormGroup>
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
      )}
    </>
  );
};
