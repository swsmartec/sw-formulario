export const Catalog = {
  CodeCanton: 'PRE_CANT',
  CodeCountry: 'PRE_NAC',
  CodeMaritalStatus: 'PRE_EST_CIV',
  CodeProvince: 'PRE_PROV',
  CodeTypeIdentifier: 'TIPO_IDENT_BEN',
  CodeTypeOfActivity: 'CAT_PER_ACV_ECO',
  CodeFinancialInstitutions: 'PRE_BANK',
  CodeTypeBankAccount: 'TIPO_CTA_BAN',
  CodeTipoDocumentoPN: 'TIPO_DOC_PNA',
  CodeTipoDocumentoPNA: 'TIPO_DOC_PNA_APO',
  CodeTipoDocumentoPJ: 'TIPO_DOC_PJU',
  CodeTipoDocumentoFD: 'TIPO_DOC_PJU',
  CodeCatalogoIngresos: 'PRE_CON_ING',
  CodeCatalogoEgresos: 'PRE_CON_EGR',
  CodeCatalogoActivoInmuebles: 'PRE_BIE_INM',
  CodeCatalogoActivoMuebles: 'PRE_BIE_MUE',
  CodeCatalogoPasivos: 'DESC_PASIVO_CL'
};

export const ListCodesCatalog = [
  Catalog.CodeCountry,
  Catalog.CodeProvince,
  Catalog.CodeCanton,
  Catalog.CodeMaritalStatus,
  Catalog.CodeTypeIdentifier,
  Catalog.CodeFinancialInstitutions,
  Catalog.CodeTypeBankAccount,
  Catalog.CodeCatalogoIngresos,
  Catalog.CodeCatalogoEgresos,
  Catalog.CodeCatalogoActivoInmuebles,
  Catalog.CodeCatalogoActivoMuebles,
  Catalog.CodeCatalogoPasivos
];

export const ListCodeCatalogFinancial = [
  Catalog.CodeTypeOfActivity,
  Catalog.CodeCatalogoIngresos,
  Catalog.CodeCatalogoEgresos,
  Catalog.CodeCatalogoActivoInmuebles,
  Catalog.CodeCatalogoActivoMuebles,
  Catalog.CodeCatalogoPasivos
];

export const Constants = {
  CodeAffidavitBusinessRelationship: 'SI',
  CodeAffidavitPublicOffice: 'SI',
  CodeCountryEcuador: 1184,
  CodeEconomicActivityDependent: 'Dependiente',
  CodeEconomicActivityInDependent: 'Independiente',
  CodeMaritalStatusMarried: 259,
  CodeMaritalStatusFactoUnion: 628,
  CodeTypeRepresentativeLegalPerson: 'Persona Jurídica',
  CodeTypeRepresentativeNaturalPerson: 'Persona Natural',
  CodeTypeNationalityEcuadorian: 'Ecuatoriano',
  CodeCheckRepresentative: false,
  CodeIdentificationCard: '4868',
  CodeIdentificationRuc: '4869',
  CodeIdentificationPassport: '4870',

  CodeTipoFormularioNatural: 1,
  CodeTipoFormularioJuridico: 2,
  CodeTipoFormularioFideicomisos: 3,

  CodeEstadoCreado: 4,
  CodeEstadoAsignado: 5,
  CodeEstadoRevisado: 6,
  CodeEstadoRevisadoOficialCumplimiento: 7,
  CodeEstadoEnviarCliente: 8,
  CodeEstadoLegalizadoCliente: 9,
  CodeEstadoEnvioSicav: 10,
  CodeEstadoBlackLists: 0,

  CodeAmbitoCatalogoDepartamento: 'Departamento',
  CodeAmbitoCatalogoCargos: 'Cargo',
  CodeAmbitoCatalogoRoles: 'Roles'
};

export const DataList = {
  EconomicActivity: [
    { ITC_ID: 'Dependiente', ITC_NOMBRE: 'Dependiente' },
    { ITC_ID: 'Independiente', ITC_NOMBRE: 'Independiente' },
    { ITC_ID: 'Jubilado', ITC_NOMBRE: 'Jubilado' },
    { ITC_ID: 'No Trabaja', ITC_NOMBRE: 'No Trabaja' }
  ],
  Nationality: [
    { label: 'Ecuatoriano', value: 'Ecuatoriano' },
    { label: 'Extranjero', value: 'Extranjero' }
  ],
  TypePerson: [
    { label: 'Persona Natural', value: 'Persona Natural' },
    { label: 'Persona Jurídica', value: 'Persona Jurídica' }
  ],
  YesOrNo: [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ],
  TypeIncomes: [
    { label: 'DEPENDIENTE', value: 'DEPENDIENTE' },
    { label: 'INDEPENDIENTE', value: 'INDEPENDIENTE' }
  ],
  TypeExpenses: [
    { label: 'PRESTAMOS', value: 'PRESTAMOS' },
    { label: 'PENSIONES', value: 'PENSIONES' }
  ],
  TypeActives: [
    { label: 'INMUEBLES', value: 'INMUEBLES' },
    { label: 'VEHICULOS', value: 'VEHICULOS' }
  ],
  TypePassives: [{ label: 'HIPOTECAS', value: 'HIPOTECAS' }]
};

export enum ROLE {
  Admin = 'Administrador',
  Operator = 'PerfilNegocio',
  Official = 'OficialCumplimiento',

  ViewFormulario = 'formulario_view',
  AddFormulario = 'formulario_add',
  ChangeFormulario = 'formulario_change',
  DeleteFormulario = 'formulario_delete',

  ViewCiudadano = 'ciudadano_view',
  AddCiudadano = 'ciudadano_add',
  ChangeCiudadano = 'ciudadano_change',
  DeleteCiudadano = 'ciudadano_delete',

  ViewCatalogo = 'catalogo_view',
  AddCatalogo = 'catalogo_add',
  ChangeCatalogo = 'catalogo_change',
  DeleteCatalogo = 'catalogo_delete',

  ViewUsuario = 'usuario_view',
  AddUsuario = 'usuario_add',
  ChangeUsuario = 'usuario_change',
  DeleteUsuario = 'usuario_delete',

  ViewPermiso = 'permiso_view',
  AddPermiso = 'permiso_view',
  ChangePermiso = 'permiso_view',
  DeletePermiso = 'permiso_view'
}

export const Config = {
  TitleSite: 'Picaval | Casa de Valores',
  Paginate: 10,
  PaginateScale: [5, 10, 25, 30]
};
