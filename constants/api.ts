// Base
export const apiCatalogList = 'Apisicav/catalogos';
export const apiCatalogListByParentId = 'Apisicav/catalogos/padre';
export const apiCatalogActividadesList =
  'Apisicav/catalogos/actividadeconomica';

export const apiPersonRetrieve = 'civilrecord/nui';

export const apiFormList = 'Formulario/obtener';
export const apiFormSave = 'Formulario/registro';
export const apiFormGetIdentification = 'Formulario/obtener/identificacion';

export const apiCatalogListDocument = 'Apisicav/catalogos/documento';

// Refactor
// Catalogo
export const apiCatalogoList = 'ListaSeleccion/obtener';
export const apiCatalogoCreate = 'ListaSeleccion/registro';
export const apiCatalogoRetrieve = 'ListaSeleccion/obtener(:id)';
export const apiCatalogoUpdate = 'ListaSeleccion/actualizar(:id)';
export const apiCatalogoDelete = 'ListaSeleccion/eliminar(:id)';

// Usuario
export const apiUsuarioList = 'Usuarios/obtener';
export const apiUsuarioCreate = 'Usuarios/registro';
export const apiUsuarioRetrieve = 'Usuarios/obtener(:id)';
export const apiUsuarioUpdate = 'Usuarios/actualizar(:id)';
export const apiUsuarioPasswordUpdate = 'Usuarios/actualizar/password(:id)';
export const apiUsuarioSignedUpdate = 'Usuarios/actualizar/signed(:id)';
export const apiUsuarioDelete = 'Usuarios/eliminar(:id)';
// Ciudadano
export const apiCiudadanoList = 'Ciudadano/obtener';
export const apiCiudadanoCreate = 'Ciudadano/registro';
export const apiCiudadanoRetrieve = 'Ciudadano/obtener(:id)';
export const apiCiudadanoUpdate = 'Ciudadano/actualizar(:id)';
export const apiCiudadanoDelete = 'Ciudadano/eliminar(:id)';

// Formulario
export const apiFormularioList = 'Formulario/obtener';
export const apiFormularioCreate = 'Formulario/registro';
export const apiFormularioRetrieve = 'Formulario/obtener(:id)';
export const apiFormularioUpdate = 'Formulario/actualizar(:id)';
export const apiFormularioDelete = 'Formulario/eliminar(:id)';
export const apiFormularioActionWorkflow = 'Formulario/Action/Workflow(:id)';
export const apiFormularioActionFirmar = 'Formulario/Action/Firmar(:id)';
export const apiFormularioActionReenviar = 'Formulario/Action/Reenviar(:id)';
export const apiFormularioActionEnviarSicap =
  'Formulario/Action/EnviarSicap(:id)';
export const apiFormularioActionVerificar =
  'Formulario/Action/VerificarListaNegras(:id)';

// Permisos
export const apiPermisoList = 'Roles/obtener';
export const apiPermisoCreate = 'Roles/registro';
export const apiPermisoRetrieve = 'Roles/obtener(:id)';
export const apiPermisoUpdate = 'Roles/actualizar(:id)';
export const apiPermisoDelete = 'Roles/eliminar(:id)';

//Notificacion

export const apiNotificationList = 'webhook/notification';
