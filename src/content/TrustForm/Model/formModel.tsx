export default {
  formId: 'legalForm',
  formField: {
    identifier: {
      name: 'identifier',
      label: 'RUC/Identificación fiscal *',
      requiredErrorMsg: 'Atributos identificación es requerido.'
    },
    businessName: {
      name: 'businessName',
      label: 'Razón Social *',
      requiredErrorMsg: 'Atributo razón social es requerido.'
    },
    nationality: {
      name: 'nationality',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Atributo nacionalidad es requerido.'
    },
    residence: {
      name: 'residence',
      label: 'Residencia fiscal *',
      requiredErrorMsg: 'Atributo residencia fiscal es requerido.'
    },
    economicActivity: {
      name: 'economicActivity',
      label: 'Actividad económica *',
      requiredErrorMsg: 'Atributo actividad económica es requerido.'
    },
    enrollmentDate: {
      name: 'enrollmentDate',
      label: 'Fecha de inscripción en el registro mercantil *',
      requiredErrorMsg: 'Atributo fecha de inscripción es requerido.'
    },
    email: {
      name: 'email',
      label: 'Correo electrónico *',
      requiredErrorMsg: 'Atributo correo electrónico es requerido.',
      invalidErrorMsg: 'Correo electrónico no válido (e.g. corre@example.com).'
    },
    emailBilling: {
      name: 'emailBilling',
      label: 'Correo electrónico de facturación *',
      requiredErrorMsg: 'Atributo correo electrónico es requerido.',
      invalidErrorMsg: 'Correo electrónico no válido (e.g. corre@example.com).'
    },
    cellPhone: {
      name: 'cellPhone',
      label: 'Celular *',
      requiredErrorMsg: 'Atributo celular es requerido.',
      invalidErrorMsg: 'Atributo celular no valido (e.g. 0999999999)'
    },
    typeRepresentative: {
      name: 'typeRepresentative',
      label: 'Tipo de representante legal  *',
      requiredErrorMsg: 'Atributo Tipo de representante legal es requerido.'
    },
    identifierRepresentative: {
      name: 'identifierRepresentative',
      label: 'C.I./ Pasaporte *',
      requiredErrorMsg: 'Atributo C.I./ Pasaporte es requerido.'
    },
    lastNameRepresentative: {
      name: 'lastNameRepresentative',
      label: 'Apellidos *',
      requiredErrorMsg: 'Atributo apellido es requerido.'
    },
    firstNameRepresentative: {
      name: 'firstNameRepresentative',
      label: 'Nombres *',
      requiredErrorMsg: 'Atributo nombre es requerido.'
    },
    nationalityRepresentative: {
      name: 'nationalitySpouse',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Atributo nacionalidad es requerido.'
    },
    positionRepresentative: {
      name: 'positionRepresentative',
      label: 'Cargo *',
      requiredErrorMsg: 'Atributo cargo es requerido.'
    },
    residenceRepresentative: {
      name: 'residenceRepresentative',
      label: 'Residencia fiscal *',
      requiredErrorMsg: 'Atributo residencia fiscal es requerido.'
    },
    identifierLegal: {
      name: 'identifierLegal',
      label: 'RUC/Identificación fiscal *',
      requiredErrorMsg: 'Atributos identificación es requerido.'
    },
    businessNameLegal: {
      name: 'businessNameLegal',
      label: 'Razón Social *',
      requiredErrorMsg: 'Atributo razón social es requerido.'
    },
    positionLegal: {
      name: 'positionRepresentative',
      label: 'Cargo *',
      requiredErrorMsg: 'Atributo cargo es requerido.'
    },
    identifierRepresentativeLegal: {
      name: 'identifierRepresentativeLegal',
      label: 'C.I./ Pasaporte *',
      requiredErrorMsg: 'Atributo C.I./ Pasaporte es requerido.'
    },
    lastNameRepresentativeLegal: {
      name: 'lastNameRepresentativeLegal',
      label: 'Apellidos *',
      requiredErrorMsg: 'Atributo apellido es requerido.'
    },
    firstNameRepresentativeLegal: {
      name: 'firstNameRepresentativeLegal',
      label: 'Nombres *',
      requiredErrorMsg: 'Atributo nombre es requerido.'
    },
    nationalityRepresentativeLegal: {
      name: 'nationalityRepresentativeLegal',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Atributo nacionalidad es requerido.'
    },
    positionRepresentativeLegal: {
      name: 'positionRepresentativeLegal',
      label: 'Cargo *',
      requiredErrorMsg: 'Atributo cargo es requerido.'
    },
    residenceRepresentativeLegal: {
      name: 'residenceRepresentativeLegal',
      label: 'Residencia fiscal *',
      requiredErrorMsg: 'Atributo residencia fiscal es requerido.'
    },
    functionaries: {
      name: 'functionaries',
      label: 'Funcionarios autorizados *',
      requiredErrorMsg: 'Atributo funcionarios autorizados es requerido.',
      invalidErrorMsg: 'Debe tener como mínimo 1 funcionario autorizado',
      childItem: {
        identifierFunctionary: {
          name: 'identifierFunctionary',
          label: 'C.I./ Pasaporte *',
          requiredErrorMsg: 'Atributo C.I./ Pasaporte es requerido.'
        },
        lastNameFunctionary: {
          name: 'lastNameFunctionary',
          label: 'Apellidos *',
          requiredErrorMsg: 'Atributo apellido es requerido.'
        },
        firstNameFunctionary: {
          name: 'firstNameFunctionary',
          label: 'Nombres *',
          requiredErrorMsg: 'Atributo nombre es requerido.'
        }
      }
    },
    termsAndConditions: {
      name: 'termsAndConditions',
      label: 'Estoy de acuerdo con los términos y condiciones',
      requiredErrorMsg: 'Atributo términos y condiciones es requerido.'
    },
    country: {
      name: 'country',
      label: 'Pais *',
      requiredErrorMsg: 'Atributo pais es requerido.'
    },
    province: {
      name: 'province',
      label: 'Provincia *',
      requiredErrorMsg: 'Atributo provincia es requerido.'
    },
    canton: {
      name: 'canton',
      label: 'Cantón *',
      requiredErrorMsg: 'Atributo cantón es requerido.'
    },
    address: {
      name: 'address',
      label: 'Dirección de domicilio *',
      requiredErrorMsg: 'Atributo dirección es requerido.'
    },
    landline: {
      name: 'landline',
      label: 'Teléfono Fijo (Opcional)'
    },
    legalShareholders: {
      name: 'legalShareholders',
      label: 'Accionistas Jurídico *',
      requiredErrorMsg: 'Atributos accionistas jurídico es requerido.',
      invalidErrorMsg: 'Debe tener como mínimo 1 accionistas jurídico',
      childItem: {
        identifierShareholdersLegal: {
          name: 'identifierShareholdersLegal',
          label: 'RUC/Identificación fiscal *',
          requiredErrorMsg: 'Atributos identificación es requerido.'
        },
        businessNameShareholdersLegal: {
          name: 'businessNameShareholdersLegal',
          label: 'Razón Social *',
          requiredErrorMsg: 'Atributo razón social es requerido.'
        },
        nationalityShareholdersLegal: {
          name: 'nationalityShareholdersLegal',
          label: 'Nacionalidad *',
          requiredErrorMsg: 'Atributo nacionalidad es requerido.'
        },
        residenceShareholdersLegal: {
          name: 'residenceShareholdersLegal',
          label: 'Residencia fiscal *',
          requiredErrorMsg: 'Atributo residencia fiscal es requerido.'
        },
        percentageShareholdersLegal: {
          name: 'percentageShareholdersLegal',
          label: '% de participación*',
          requiredErrorMsg: 'Atributo % de participación es requerido.'
        }
      }
    },
    naturalShareholders: {
      name: 'naturalShareholders',
      label: 'Accionistas Naturales *',
      requiredErrorMsg: 'Atributos accionistas naturales es requerido.',
      invalidErrorMsg: 'Debe tener como mínimo 1 accionistas naturales',
      childItem: {
        identifierShareholdersNatural: {
          name: 'identifierShareholdersNatural',
          label: 'C.I./ Pasaporte *',
          requiredErrorMsg: 'Atributo C.I./ Pasaporte es requerido.'
        },
        lastNameShareholdersNatural: {
          name: 'lastNameShareholdersNatural',
          label: 'Apellidos *',
          requiredErrorMsg: 'Atributo apellido es requerido.'
        },
        firstNameShareholdersNatural: {
          name: 'firstNameShareholdersNatural',
          label: 'Nombres *',
          requiredErrorMsg: 'Atributo nombre es requerido.'
        },
        percentageShareholdersNatural: {
          name: 'percentageShareholdersNatural',
          label: '% de participación*',
          requiredErrorMsg: 'Atributo % de participación es requerido.'
        },
        residenceShareholdersNatural: {
          name: 'residenceShareholdersNatural',
          label: 'Residencia fiscal *',
          requiredErrorMsg: 'Atributo residencia fiscal es requerido.'
        }
      }
    },
    files: {
      name: 'files',
      label: 'Documentación requerida *',
      requiredErrorMsg: 'Documentación es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 referencia bancaria',
      childItem: {
        fileName: {
          name: 'fileName',
          label: 'Nombre del archivo *',
          requiredErrorMsg: 'Nombre del archivo es requerido'
        },
        file: {
          name: 'file',
          label: 'Archivo *',
          requiredErrorMsg: 'Archivo es requerido'
        }
      }
    }
  }
};
