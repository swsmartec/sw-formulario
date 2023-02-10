export default {
  formId: 'naturalForm',
  formField: {
    representative: {
      name: 'representative',
      label: 'Apoderado',
      requiredErrorMsg: 'Apoderado es requerido.'
    },
    typeNationality: {
      name: 'typeNationality',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Nacionalidad es requerida.'
    },
    typeIdentifier: {
      name: 'typeIdentifier',
      label: 'Tipo de identificación *',
      requiredErrorMsg: 'Tipo de identificación es requerido.'
    },
    identifier: {
      name: 'identifier',
      label: 'Identificación *',
      requiredErrorMsg: 'Identificación es requerida.',
      invalidErrorMsg: 'Formato no valido Ejm: (9999999999)',
      invalidSimbolsMsg: 'No puede ingresar símbolos.',
      invalidMinMsg: 'Número de carácteres debe ser igual a 10. ',
      invalidMinMsgRuc: 'Número de carácteres debe ser igual a 13. '
    },
    surname: {
      name: 'surname',
      label: 'Apellido paterno *',
      requiredErrorMsg: 'Apellido paterno es requerido.'
    },
    secondSurname: {
      name: 'secondSurname',
      label: 'Apellido materno *',
      requiredErrorMsg: 'Apellido materno es requerido.',
      readonly: 'readonly'
    },
    firstName: {
      name: 'firstName',
      label: 'Primer nombre *',
      requiredErrorMsg: 'Primer nombre es requerido.'
    },
    secondName: {
      name: 'secondName',
      label: 'Segundo nombre *',
      requiredErrorMsg: 'Segundo nombre es requerido.'
    },
    email: {
      name: 'email',
      label: 'Correo electrónico *',
      requiredErrorMsg: 'Correo electrónico es requerido.',
      invalidErrorMsg: 'Correo electrónico no válido (ej. corre@example.com).'
    },
    cellPhone: {
      name: 'cellPhone',
      label: 'Celular *',
      requiredErrorMsg: 'Número celular es requerido.',
      invalidErrorMsg: 'Número celular no válido (ej. 0999999999)',
      invalidMinMsg: 'Extensión de número de celular debe ser mayor a 9.'
    },
    nationality: {
      name: 'nationality',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Nacionalidad es requerida.',
      invalidErrorMsg: 'Se debe ingresar como minimo una nacionalidad.'
    },
    birthDate: {
      name: 'birthDate',
      label: 'Fecha nacimiento *',
      requiredErrorMsg: 'Fecha de nacimiento es requerida.',
      invalidFormatMsg: 'La fecha debe ser en formato dd/mm/aaaa',
      invalidErrorMsg: 'Se requiere información de su apoderado.',
      invalidMaxErrorMsg:
        'La fecha de nacimiento no puede ser mayor a la fecha actual.'
    },
    maritalStatus: {
      name: 'maritalStatus',
      label: 'Estado civil *',
      requiredErrorMsg: 'Estado civil es requerido.'
    },
    identifierSpouse: {
      name: 'identifierSpouse',
      label: 'C.I./Pasaporte/RUC *',
      requiredErrorMsg: 'Identificación del cónyuge es requerida.'
    },
    lastNameSpouse: {
      name: 'lastNameSpouse',
      label: 'Apellidos del cónyuge *',
      requiredErrorMsg: 'Apellidos del cónyuge son requeridos.'
    },
    firstNameSpouse: {
      name: 'firstNameSpouse',
      label: 'Nombres del cónyuge *',
      requiredErrorMsg: 'Nombres del cónyuge son requeridos.'
    },
    nationalitySpouse: {
      name: 'nationalitySpouse',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Nacionalidad cónyuge es requerida.'
    },
    termsAndConditions: {
      name: 'termsAndConditions',
      label: 'Estoy de acuerdo con los',
      requiredErrorMsg: 'Términos y condiciones es requerido.',
      invalidErrorMsg: 'Necesita aceptar los términos y condiciones'
    },
    country: {
      name: 'country',
      label: 'País *',
      requiredErrorMsg: 'País es requerido.'
    },
    province: {
      name: 'province',
      label: 'Provincia *',
      requiredErrorMsg: 'Provincia es requerida.'
    },
    canton: {
      name: 'canton',
      label: 'Cantón *',
      requiredErrorMsg: 'Cantón es requerido.'
    },
    address: {
      name: 'address',
      label: 'Dirección de domicilio *',
      requiredErrorMsg: 'Dirección es requerido.',
      invalidMinMsg: 'Dirección debe tener como minimo 8 caracteres.'
    },
    landline: {
      name: 'landline',
      label: 'Teléfono fijo (Opcional)',
      invalidErrorMsg: 'Teléfono fijo no válido.',
      invalidSimbolsMsg: 'No puede ingresar símbolos.'
    },
    residence: {
      name: 'residence',
      label: 'Residencia fiscal *',
      requiredErrorMsg: 'Residencia fiscal es requerida.'
    },
    economicActivityDependent: {
      name: 'economicActivityDependent',
      label: 'Dependiente',
      requiredErrorMsg: 'Actividad económica dependiente es requerida.'
    },
    economicActivityInDependent: {
      name: 'economicActivityInDependent',
      label: 'Independiente',
      requiredErrorMsg: 'Actividad económica independiente es requerida.'
    },
    economicActivityRetired: {
      name: 'economicActivityRetired',
      label: 'Jubilado',
      requiredErrorMsg: 'Requerido.'
    },
    economicActivityNotWork: {
      name: 'economicActivityNotWork',
      label: 'No Trabaja',
      requiredErrorMsg: 'Requerido.'
    },
    companyName: {
      name: 'companyName',
      label: 'Nombre de la compañía *',
      requiredErrorMsg: 'Nombre de compañía es requerido.'
    },
    companyPosition: {
      name: 'companyPosition',
      label: 'Cargo *',
      requiredErrorMsg: 'Cargo es requerido.'
    },
    companyAddress: {
      name: 'companyAddress',
      label: 'Dirección *',
      requiredErrorMsg: 'Dirección es requerido.'
    },

    ruc: {
      name: 'ruc',
      label: 'Número de RUC *',
      requiredErrorMsg: 'RUC es requerido.',
      invalidErrorMsg: 'Formato no valido Ejm: (9999999999)',
      invalidSimbolsMsg: 'No puede ingresar símbolos.',
      invalidMinMsgRuc: 'Número de carácteres debe ser igual a 13. '
    },
    rucAddress: {
      name: 'rucAddress',
      label: 'Dirección *',
      requiredErrorMsg: 'Dirección es requerido.'
    },
    typeOfActivity: {
      name: 'typeOfActivity',
      label: 'Tipo de actividad *',
      requiredErrorMsg: 'Tipo de actividad es requerido.'
    },
    incomes: {
      name: 'incomes',
      label: 'Ingresos *',
      requiredErrorMsg: 'Ingreso es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 ingresos',
      childItem: {
        incomeDetail: {
          name: 'incomeDetail',
          label: 'Detalle de ingreso *',
          requiredErrorMsg: 'Detalle de ingreso es requerido.'
        },
        incomeValue: {
          name: 'incomeValue',
          label: 'Valor de ingreso *',
          requiredErrorMsg: 'Valor de ingreso es requerido.',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    incomeTotal: {
      name: 'incomeTotal',
      label: 'Total de ingreso *',
      requiredErrorMsg: 'Total de ingreso es requerido.'
    },
    expenses: {
      name: 'expenses',
      label: 'Egreso *',
      requiredErrorMsg: 'Egreso es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 egreso',
      childItem: {
        expenseDetail: {
          name: 'expenseDetail',
          label: 'Detalle de egreso *',
          requiredErrorMsg: 'Detalle de egreso es requerido'
        },
        expenseValue: {
          name: 'expenseValue',
          label: 'Valor de egreso *',
          requiredErrorMsg: 'Valor de egreso es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    expenseTotal: {
      name: 'expenseTotal',
      label: 'Total de egreso *',
      requiredErrorMsg: 'Total de egreso es requerido'
    },
    active: {
      name: 'active',
      label: 'Activos *',
      requiredErrorMsg: 'Activos es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 activos',
      childItem: {
        activeDetail: {
          name: 'activeDetail',
          label: 'Detalle de activo *',
          requiredErrorMsg: 'Detalle de activo es requerido'
        },
        activeValue: {
          name: 'activeValue',
          label: 'Valor de activo *',
          requiredErrorMsg: 'Valor de activo es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    activeTotal: {
      name: 'activeTotal',
      label: 'Activo total *',
      requiredErrorMsg: 'Activo total es requerido'
    },
    passives: {
      name: 'passives',
      label: 'Pasivos *',
      requiredErrorMsg: 'Pasivos es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 pasivos',
      childItem: {
        passiveDetail: {
          name: 'passiveDetail',
          label: 'Detalle de pasivo *',
          requiredErrorMsg: 'Detalle del pasivo es requerido'
        },
        passiveValue: {
          name: 'passiveValue',
          label: 'Valor de pasivo *',
          requiredErrorMsg: 'Valor de pasivo es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    passivesTotal: {
      name: 'passivesTotal',
      label: 'Total de pasivo *',
      requiredErrorMsg: 'Total de pasivo es requerido'
    },
    patrimonyTotal: {
      name: 'patrimonyTotal',
      label: 'Patrimonio *',
      requiredErrorMsg: 'Patrimonio es requerido'
    },
    bankReferences: {
      name: 'bankReferences',
      label: 'Referencias bancarias *',
      requiredErrorMsg: 'Referencias bancarias es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 referencia bancaria',
      invalidAuthorizedErrorMsg: 'Solo puede tener una cuenta autorizada',
      childItem: {
        nameBank: {
          name: 'nameBank',
          label: 'Nombre del Banco o Institución Financiera *',
          requiredErrorMsg: 'Institución financiero es requerido'
        },
        accountNumber: {
          name: 'accountNumber',
          label: 'Número de Cuenta *',
          requiredErrorMsg: 'Número de cuenta es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico'
        },
        accountType: {
          name: 'accountType',
          label: 'Tipo de Cuenta *',
          requiredErrorMsg: 'Tipo de cuenta es requerido'
        },
        countryBank: {
          name: 'countryBank',
          label: 'País *',
          requiredErrorMsg: 'El país es requerido'
        },
        authorizedAccount: {
          name: 'authorizedAccount',
          label: 'Cuenta autorizada *',
          requiredErrorMsg: 'Cuenta autorizada es requerido'
        }
      }
    },
    vowPEP: {
      name: 'vow',
      label: 'Declaración juramentada*',
      requiredErrorMsg: 'Declaración es requerido'
    },
    positionPEP: {
      name: 'positionPEP',
      label: 'Cargo *',
      requiredErrorMsg: 'Cargo es requerido'
    },
    functionPEP: {
      name: 'functionPEP',
      label: 'Función *',
      requiredErrorMsg: 'Función es requerido'
    },
    dateStartPEP: {
      name: 'dateStartPEP',
      label: 'Fecha de Nombramiento designación *',
      requiredErrorMsg: 'Fecha de nombramiento es requerido',
      invalidFormatMsg: 'La fecha debe ser en formato dd/mm/aaaa',
      invalidMaxErrorMsg:
        'La fecha de nombramiento no puede ser mayor a la fecha actual.'
    },
    dateEndPEP: {
      name: 'dateEndPEP',
      label: 'Fecha de culminación al cargo (de no estar en funciones)  *',
      requiredErrorMsg: 'Fecha de culminación al cargo es requerido',
      invalidFormatMsg: 'La fecha debe ser en formato dd/mm/aaaa',
      invalidMaxErrorMsg:
        'La fecha de culminación al cargo no puede ser mayor a la fecha actual.'
    },
    linkUpPEP: {
      name: 'linkUpPEP',
      label: 'Vinculación comercial  *',
      requiredErrorMsg: 'Vinculación comercial es requerido'
    },
    detailPEP: {
      name: 'detailPEP',
      label: 'Detalle persona jurídica o natural  *',
      requiredErrorMsg: 'Detalle persona jurídica o natural es requerido'
    },
    fileIdentifier: {
      name: 'fileIdentifier',
      label:
        'Copia de cédula de identidad y papeleta de votación, de ser el caso copia de cédula del cónyuge. *',
      requiredErrorMsg: 'Archivo cedula es requerido'
    },
    filePassport: {
      name: 'filePassport',
      label:
        'Copia de la visa o permiso de ingreso y permanencia temporal para el caso de extranjeros no residentes en el Ecuador. *',
      requiredErrorMsg: 'Archivo pasaporte es requerido'
    },
    fileLightSheett: {
      name: 'fileLightSheett',
      label:
        'Copia de la planilla de luz, agua o teléfono (no mayor a 3 meses). *',
      requiredErrorMsg: 'Archivo planilla de luz es requerido'
    },
    fileBankReference: {
      name: 'fileBankReference',
      label:
        'Certificado/ Referencia bancaria original actualizada (no mayor a 6 meses). *',
      requiredErrorMsg: 'Archivo referencia bancaria es requerido'
    },
    fileMaritalDissolution: {
      name: 'fileMaritalDissolution',
      label:
        'Copia de la disolución de la sociedad conyugal, separación de bienes o capitulaciones matrimoniales (si aplicare). *',
      requiredErrorMsg:
        'Archivo disolución de la sociedad conyugal es requerido'
    },
    // #####
    //    Apoderado
    typeNationalityRepresentative: {
      name: 'typeNationalityRepresentative',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Nacionalidad es requerido.'
    },
    typeIdentifierRepresentative: {
      name: 'typeIdentifierRepresentative',
      label: 'Tipo de identificación *',
      requiredErrorMsg: 'Tipo de identificación es requerido.'
    },
    identifierRepresentative: {
      name: 'identifierRepresentative',
      label: 'Identificación *',
      requiredErrorMsg: 'Identificación es requerida.',
      invalidErrorMsg: 'Formato no valido Ejm: (9999999999)',
      invalidSimbolsMsg: 'No puede ingresar símbolos.',
      invalidMinMsg: 'Número de carácteres debe ser igual a 10. ',
      invalidMinMsgRuc: 'Número de carácteres debe ser igual a 13. '
    },
    surnameRepresentative: {
      name: 'surnameRepresentative',
      label: 'Apellido paterno *',
      requiredErrorMsg: 'Apellido paterno es requerido.'
    },
    secondSurnameRepresentative: {
      name: 'secondSurnameRepresentative',
      label: 'Apellido materno *',
      requiredErrorMsg: 'Apellido materno es requerido.'
    },
    firstNameRepresentative: {
      name: 'firstNameRepresentative',
      label: 'Primer nombre *',
      requiredErrorMsg: 'Primer nombre es requerido.'
    },
    secondNameRepresentative: {
      name: 'secondNameRepresentative',
      label: 'Segundo nombre *',
      requiredErrorMsg: 'Segundo nombre es requerido.'
    },
    emailRepresentative: {
      name: 'emailRepresentative',
      label: 'Correo electrónico *',
      requiredErrorMsg: 'Correo electrónico es requerido.',
      invalidErrorMsg: 'Correo electrónico no válido (ej. corre@example.com).'
    },
    cellPhoneRepresentative: {
      name: 'cellPhoneRepresentative',
      label: 'Celular *',
      requiredErrorMsg: 'Celular es requerido.',
      invalidErrorMsg: 'Celular no valido (ej. 0999999999)'
    },
    nationalityRepresentative: {
      name: 'nationalityRepresentative',
      label: 'Nacionalidad *',
      requiredErrorMsg: 'Nacionalidad es requerido.'
    },
    birthDateRepresentative: {
      name: 'birthDateRepresentative',
      label: 'Fecha nacimiento *',
      requiredErrorMsg: 'Fecha de nacimiento es requerida.',
      invalidFormatMsg: 'La fecha debe ser en formato dd/mm/aaaa',
      invalidErrorMsg:
        'Fecha de nacimiento invalida debe ser una persona mayor.',
      invalidMaxErrorMsg:
        'La fecha de nacimiento no puede ser mayor a la fecha actual.'
    },
    countryRepresentative: {
      name: 'countryRepresentative',
      label: 'País *',
      requiredErrorMsg: 'País es requerido.'
    },
    provinceRepresentative: {
      name: 'provinceRepresentative',
      label: 'Provincia *',
      requiredErrorMsg: 'Provincia es requerida.'
    },
    cantonRepresentative: {
      name: 'cantonRepresentative',
      label: 'Cantón *',
      requiredErrorMsg: 'Cantón es requerido.'
    },
    addressRepresentative: {
      name: 'addressRepresentative',
      label: 'Dirección de domicilio *',
      requiredErrorMsg: 'Dirección es requerido.'
    },
    landlineRepresentative: {
      name: 'landlineRepresentative',
      label: 'Teléfono Fijo (Opcional)',
      invalidErrorMsg: 'Teléfono fijo no válido.',
      invalidSimbolsMsg: 'No puede ingresar símbolos.'
    },
    residenceRepresentative: {
      name: 'residenceRepresentative',
      label: 'Residencia fiscal *',
      requiredErrorMsg: 'Residencia fiscal es requerida.'
    },
    // #
    economicActivityRepresentativeDependent: {
      name: 'economicActivityRepresentativeDependent',
      label: 'Dependiente',
      requiredErrorMsg: 'Dependiente es requerido.'
    },
    economicActivityRepresentativeInDependent: {
      name: 'economicActivityRepresentativeInDependent',
      label: 'Independiente',
      requiredErrorMsg: 'Independiente es requerido.'
    },
    economicActivityRepresentativeRetired: {
      name: 'economicActivityRepresentativeRetired',
      label: 'Jubilado',
      requiredErrorMsg: 'Jubilado es requerido.'
    },
    economicActivityRepresentativeNotWork: {
      name: 'economicActivityRepresentativeNotWork',
      label: 'No Trabaja',
      requiredErrorMsg: 'No trabaja es requerido.'
    },
    companyNameRepresentative: {
      name: 'companyNameRepresentative',
      label: 'Nombre de la compañía *',
      requiredErrorMsg: 'Nombre de compañía es requerido.'
    },
    companyPositionRepresentative: {
      name: 'companyPositionRepresentative',
      label: 'Cargo *',
      requiredErrorMsg: 'Cargo es requerido.'
    },
    companyAddressRepresentative: {
      name: 'companyAddressRepresentative',
      label: 'Dirección *',
      requiredErrorMsg: 'Dirección es requerido.'
    },

    rucRepresentative: {
      name: 'rucRepresentative',
      label: 'Número de RUC *',
      requiredErrorMsg: 'RUC es requerido.'
    },
    rucAddressRepresentative: {
      name: 'rucAddressRepresentative',
      label: 'Dirección *',
      requiredErrorMsg: 'Dirección es requerido.'
    },
    typeOfActivityRepresentative: {
      name: 'typeOfActivityRepresentative',
      label: 'Tipo de actividad *',
      requiredErrorMsg: 'Tipo de actividad es requerido.'
    },
    incomesRepresentative: {
      name: 'incomesRepresentative',
      label: 'Ingresos *',
      requiredErrorMsg: 'Ingresos es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 ingresos',
      childItem: {
        incomeDetail: {
          name: 'incomeDetail',
          label: 'Detalle de ingreso *',
          requiredErrorMsg: 'Detalle de ingreso es requerido.'
        },
        incomeValue: {
          name: 'incomeValue',
          label: 'Valor de ingreso *',
          requiredErrorMsg: 'Valor de ingreso es requerido.',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    incomeTotalRepresentative: {
      name: 'incomeTotalRepresentative',
      label: 'Total de ingreso *',
      requiredErrorMsg: 'Total de ingreso es requerido.'
    },
    expensesRepresentative: {
      name: 'expensesRepresentative',
      label: 'Egreso *',
      requiredErrorMsg: 'Egreso es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 egreso',
      childItem: {
        expenseDetail: {
          name: 'expenseDetail',
          label: 'Detalle de egreso *',
          requiredErrorMsg: 'Detalle de egreso es requerido'
        },
        expenseValue: {
          name: 'expenseValue',
          label: 'Valor de egreso *',
          requiredErrorMsg: 'Valor de egreso es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    expenseTotalRepresentative: {
      name: 'expenseTotalRepresentative',
      label: 'Total de egreso *',
      requiredErrorMsg: 'Total de egreso es requerido'
    },
    activeRepresentative: {
      name: 'activeRepresentative',
      label: 'Activos *',
      requiredErrorMsg: 'Activos es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 activos',
      childItem: {
        activeDetail: {
          name: 'activeDetail',
          label: 'Detalle de activo *',
          requiredErrorMsg: 'Detalle de activo es requerido'
        },
        activeValue: {
          name: 'activeValue',
          label: 'Valor de activo *',
          requiredErrorMsg: 'Valor de activo es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    activeTotalRepresentative: {
      name: 'activeTotalRepresentative',
      label: 'Activo total *',
      requiredErrorMsg: 'Activo total es requerido'
    },
    passivesRepresentative: {
      name: 'passivesRepresentative',
      label: 'Pasivos *',
      requiredErrorMsg: 'Pasivos es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 activos',
      childItem: {
        passiveDetail: {
          name: 'passiveDetail',
          label: 'Detalle de pasivo *',
          requiredErrorMsg: 'Detalle de pasivo es requerido'
        },
        passiveValue: {
          name: 'passiveValue',
          label: 'Valor de pasivo *',
          requiredErrorMsg: 'Valor de pasivo es requerido',
          invalidErrorMsg: 'El valor debe ser de tipo numérico',
          invalidMinErrorMsg: 'El valor debe ser positivo'
        }
      }
    },
    passivesTotalRepresentative: {
      name: 'passivesTotalRepresentative',
      label: 'Total de pasivo *',
      requiredErrorMsg: 'Total de pasivo es requerido'
    },
    patrimonyTotalRepresentative: {
      name: 'patrimonyTotalRepresentative',
      label: 'Patrimonio *',
      requiredErrorMsg: 'Patrimonio es requerido'
    },
    bankReferencesRepresentative: {
      name: 'bankReferencesRepresentative',
      label: 'Referencias bancarias *',
      requiredErrorMsg: 'Referencias bancarias es requerido',
      invalidErrorMsg: 'Debe tener como mínimo 1 referencia bancaria',
      childItem: {
        nameBank: {
          name: 'nameBank',
          label: 'Nombre del Banco o Institución Financiera *',
          requiredErrorMsg: 'Institución financiero es requerido'
        },
        accountNumber: {
          name: 'accountNumber',
          label: 'Número de Cuenta *',
          requiredErrorMsg: 'Número de cuenta es requerido'
        },
        accountType: {
          name: 'accountType',
          label: 'Tipo de Cuenta *',
          requiredErrorMsg: 'Tipo de cuenta es requerido'
        },
        countryBank: {
          name: 'countryBank',
          label: 'País *',
          requiredErrorMsg: 'El país es requerido'
        },
        authorizedAccount: {
          name: 'authorizedAccount',
          label: 'Cuenta autorizada *',
          requiredErrorMsg: 'Cuenta autorizada es requerida'
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
          requiredErrorMsg: 'Archivo es requerido y no debe supera 1 MiB'
        }
      }
    }
  }
};
