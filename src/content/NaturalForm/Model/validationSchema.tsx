import * as Yup from 'yup';
import { Constants } from '../../../../constants/default';
import naturalFormModel from './formModel';
import differenceInYears from 'date-fns/differenceInYears';
import { normalizeMoney } from '../../../../helpers/Utils';

const {
  formField: {
    representative,
    typeNationality,
    typeIdentifier,
    identifier,
    surname,
    secondSurname,
    firstName,
    secondName,
    email,
    cellPhone,
    nationality,
    birthDate,
    maritalStatus,
    identifierSpouse,
    lastNameSpouse,
    firstNameSpouse,
    nationalitySpouse,
    termsAndConditions,
    country,
    province,
    canton,
    address,
    landline,
    residence,
    economicActivityDependent,
    economicActivityInDependent,
    economicActivityRetired,
    economicActivityNotWork,
    companyName,
    companyPosition,
    companyAddress,
    ruc,
    rucAddress,
    typeOfActivity,
    incomes,
    incomeTotal,
    expenses,
    expenseTotal,
    active,
    activeTotal,
    passives,
    passivesTotal,
    patrimonyTotal,
    bankReferences,
    vowPEP,
    positionPEP,
    functionPEP,
    dateStartPEP,
    dateEndPEP,
    linkUpPEP,
    detailPEP,
    // Apoderado
    typeNationalityRepresentative,
    typeIdentifierRepresentative,
    identifierRepresentative,
    surnameRepresentative,
    secondSurnameRepresentative,
    firstNameRepresentative,
    secondNameRepresentative,
    emailRepresentative,
    cellPhoneRepresentative,
    nationalityRepresentative,
    birthDateRepresentative,

    countryRepresentative,
    provinceRepresentative,
    cantonRepresentative,
    addressRepresentative,
    landlineRepresentative,
    residenceRepresentative,

    economicActivityRepresentativeDependent,
    economicActivityRepresentativeInDependent,
    economicActivityRepresentativeRetired,
    economicActivityRepresentativeNotWork,
    companyNameRepresentative,
    companyPositionRepresentative,
    companyAddressRepresentative,
    rucRepresentative,
    rucAddressRepresentative,
    typeOfActivityRepresentative,
    incomesRepresentative,
    expensesRepresentative,
    activeRepresentative,
    passivesRepresentative,
    bankReferencesRepresentative,
    files
  }
} = naturalFormModel;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default [
  Yup.object().shape({
    [representative.name]: Yup.bool().required(
      `${typeIdentifier.requiredErrorMsg}`
    ),
    [typeNationality.name]: Yup.string().required(
      `${typeIdentifier.requiredErrorMsg}`
    ),
    [typeIdentifier.name]: Yup.string().required(
      `${typeIdentifier.requiredErrorMsg}`
    ),

    [identifier.name]: Yup.string()
      .when(`${typeIdentifier.name}`, {
        is: (type_identifier: any) => {
          return type_identifier === Constants.CodeIdentificationCard;
        },
        then: Yup.string()
          .required(`${identifier.requiredErrorMsg}`)
          .min(10, identifier.invalidMinMsg)
          .max(10, identifier.invalidMinMsg)
          .matches(/^[^.]*$/, {
            message: identifier.invalidErrorMsg
          })
          .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
            message: identifier.invalidSimbolsMsg
          })
          .matches(/^[\s\d)(-]+$/, {
            message: identifier.invalidErrorMsg
          })
      })
      .when(`${typeIdentifier.name}`, {
        is: (type_identifier: any) => {
          return type_identifier === Constants.CodeIdentificationRuc;
        },
        then: Yup.string()
          .required(`${identifier.requiredErrorMsg}`)
          .min(13, identifier.invalidMinMsgRuc)
          .max(13, identifier.invalidMinMsgRuc)
          .matches(/^[^.]*$/, {
            message: identifier.invalidErrorMsg
          })
          .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
            message: identifier.invalidSimbolsMsg
          })
          .matches(/^[\s\d)(-]+$/, {
            message: identifier.invalidErrorMsg
          })
      })
      .when(`${typeIdentifier.name}`, {
        is: (type_identifier: any) => {
          return type_identifier === Constants.CodeIdentificationPassport;
        },
        then: Yup.string().required(`${identifier.requiredErrorMsg}`)
      }),
    [surname.name]: Yup.string().required(`${surname.requiredErrorMsg}`),
    [secondSurname.name]: Yup.string().required(
      `${secondSurname.requiredErrorMsg}`
    ),
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [secondName.name]: Yup.string().required(`${secondName.requiredErrorMsg}`),
    [email.name]: Yup.string()
      .email(`${email.invalidErrorMsg}`)
      .required(`${email.requiredErrorMsg}`),
    [cellPhone.name]: Yup.string()
      .required(`${cellPhone.requiredErrorMsg}`)
      .min(10, cellPhone.invalidMinMsg)
      .matches(phoneRegExp, cellPhone.invalidErrorMsg),
    [nationality.name]: Yup.array()
      .of(Yup.number())
      .min(1, nationality.invalidErrorMsg)
      .required(`${nationality.requiredErrorMsg}`),
    [birthDate.name]: Yup.date()
      .typeError(birthDate.invalidFormatMsg)
      .max(new Date(), birthDate.invalidMaxErrorMsg)
      .required(birthDate.requiredErrorMsg)
      .test('dob', birthDate.invalidErrorMsg, function (value) {
        return (
          Math.abs(differenceInYears(value, new Date())) >= 18 ||
          this.parent[representative.name]
        );
      }),

    [maritalStatus.name]: Yup.string().required(
      `${maritalStatus.requiredErrorMsg}`
    ),
    [identifierSpouse.name]: Yup.string().when(`${maritalStatus.name}`, {
      is: (marital: any) => {
        return (
          parseInt(marital) === Constants.CodeMaritalStatusMarried ||
          parseInt(marital) === Constants.CodeMaritalStatusFactoUnion
        );
      },
      then: Yup.string().required(`${identifierSpouse.requiredErrorMsg}`)
    }),
    [lastNameSpouse.name]: Yup.string().when(`${maritalStatus.name}`, {
      is: (marital: any) => {
        return (
          parseInt(marital) === Constants.CodeMaritalStatusMarried ||
          parseInt(marital) === Constants.CodeMaritalStatusFactoUnion
        );
      },
      then: Yup.string().required(`${lastNameSpouse.requiredErrorMsg}`)
    }),
    [firstNameSpouse.name]: Yup.string().when(`${maritalStatus.name}`, {
      is: (marital: any) => {
        return (
          parseInt(marital) === Constants.CodeMaritalStatusMarried ||
          parseInt(marital) === Constants.CodeMaritalStatusFactoUnion
        );
      },
      then: Yup.string().required(`${firstNameSpouse.requiredErrorMsg}`)
    }),
    [nationalitySpouse.name]: Yup.string().when(`${maritalStatus.name}`, {
      is: (marital: any) => {
        return (
          parseInt(marital) === Constants.CodeMaritalStatusMarried ||
          parseInt(marital) === Constants.CodeMaritalStatusFactoUnion
        );
      },
      then: Yup.string().required(`${nationalitySpouse.requiredErrorMsg}`)
    }),
    [typeNationalityRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${typeNationalityRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [typeIdentifierRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${typeIdentifierRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [identifierRepresentative.name]: Yup.string()
      .when([typeIdentifierRepresentative.name, representative.name], {
        is: (type_identifier_representative, representative_value) => {
          return (
            type_identifier_representative ===
              Constants.CodeIdentificationCard && representative_value
          );
        },
        then: Yup.string()
          .required(`${identifierRepresentative.requiredErrorMsg}`)
          .min(10, identifierRepresentative.invalidMinMsg)
          .max(10, identifierRepresentative.invalidMinMsg)
          .matches(/^[^.]*$/, {
            message: identifierRepresentative.invalidErrorMsg
          })
          .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
            message: identifierRepresentative.invalidSimbolsMsg
          })
          .matches(/^[\s\d)(-]+$/, {
            message: identifierRepresentative.invalidErrorMsg
          })
      })
      .when([typeIdentifierRepresentative.name, representative.name], {
        is: (type_identifier_representative, representative_value) => {
          return (
            type_identifier_representative ===
              Constants.CodeIdentificationRuc && representative_value
          );
        },
        then: Yup.string()
          .required(`${identifierRepresentative.requiredErrorMsg}`)
          .min(13, identifierRepresentative.invalidMinMsgRuc)
          .max(13, identifierRepresentative.invalidMinMsgRuc)
          .matches(/^[^.]*$/, {
            message: identifierRepresentative.invalidErrorMsg
          })
          .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
            message: identifierRepresentative.invalidSimbolsMsg
          })
          .matches(/^[\s\d)(-]+$/, {
            message: identifierRepresentative.invalidErrorMsg
          })
      })
      .when([typeIdentifierRepresentative.name, representative.name], {
        is: (type_identifier_representative, representative_value) => {
          return (
            type_identifier_representative ===
              Constants.CodeIdentificationPassport && representative_value
          );
        },
        then: Yup.string().required(`${identifier.requiredErrorMsg}`)
      }),
    [surnameRepresentative.name]: Yup.string().when(`${representative.name}`, {
      is: (representativeCheck: any) => {
        return representativeCheck;
      },
      then: Yup.string().required(`${surnameRepresentative.requiredErrorMsg}`)
    }),
    [secondSurnameRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${secondSurnameRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [firstNameRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${firstNameRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [secondNameRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${secondNameRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [emailRepresentative.name]: Yup.string().when(`${representative.name}`, {
      is: (representativeCheck: any) => {
        return representativeCheck;
      },
      then: Yup.string()
        .email(`${emailRepresentative.invalidErrorMsg}`)
        .required(`${emailRepresentative.requiredErrorMsg}`)
    }),
    [cellPhoneRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${cellPhoneRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [nationalityRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${nationalityRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [birthDateRepresentative.name]: Yup.date()
      .nullable()
      .when(`${representative.name}`, {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.date()
          .typeError(birthDateRepresentative.invalidFormatMsg)
          .max(new Date(), `${birthDateRepresentative.invalidMaxErrorMsg}`)
          .required(`${birthDateRepresentative.requiredErrorMsg}`)
          .test(
            'dob',
            birthDateRepresentative.invalidErrorMsg,
            function (value) {
              return Math.abs(differenceInYears(value, new Date())) >= 18;
            }
          )
      }),

    [termsAndConditions.name]: Yup.bool().oneOf(
      [true],
      `${termsAndConditions.invalidErrorMsg}`
    )
  }),
  Yup.object().shape({
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [province.name]: Yup.string().when(`${country.name}`, {
      is: (countryCheck: any) => {
        return countryCheck === Constants.CodeCountryEcuador;
      },
      then: Yup.string().required(`${country.requiredErrorMsg}`)
    }),
    [canton.name]: Yup.string().when(`${country.name}`, {
      is: (countryCheck: any) => {
        return countryCheck === Constants.CodeCountryEcuador;
      },
      then: Yup.string().required(`${canton.requiredErrorMsg}`)
    }),
    [address.name]: Yup.string()
      .min(10, address.invalidMinMsg)
      .required(`${address.requiredErrorMsg}`),
    [residence.name]: Yup.string().required(`${residence.requiredErrorMsg}`),
    [landline.name]: Yup.string()
      .matches(/^[^.]*$/, {
        message: landline.invalidErrorMsg
      })
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: landline.invalidSimbolsMsg
      })
      .matches(/^[\s\d)(-]+$/, {
        //original matcher
        message: landline.invalidErrorMsg
      }),
    // Apoderado
    [countryRepresentative.name]: Yup.string().when(`${representative.name}`, {
      is: (representativeCheck: any) => {
        return representativeCheck;
      },
      then: Yup.string().required(`${countryRepresentative.requiredErrorMsg}`)
    }),
    [provinceRepresentative.name]: Yup.string().when(`${representative.name}`, {
      is: (representativeCheck: any) => {
        return representativeCheck;
      },
      then: Yup.string().required(`${provinceRepresentative.requiredErrorMsg}`)
    }),
    [cantonRepresentative.name]: Yup.string().when(`${representative.name}`, {
      is: (representativeCheck: any) => {
        return representativeCheck;
      },
      then: Yup.string().required(`${cantonRepresentative.requiredErrorMsg}`)
    }),
    [addressRepresentative.name]: Yup.string().when(`${representative.name}`, {
      is: (representativeCheck: any) => {
        return representativeCheck;
      },
      then: Yup.string().required(`${addressRepresentative.requiredErrorMsg}`)
    }),
    [landlineRepresentative.name]: Yup.string()
      .matches(/^[^.]*$/, {
        message: landlineRepresentative.invalidErrorMsg
      })
      .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: landlineRepresentative.invalidSimbolsMsg
      })
      .matches(/^[\s\d)(-]+$/, {
        //original matcher
        message: landlineRepresentative.invalidErrorMsg
      }),
    [residenceRepresentative.name]: Yup.string().when(
      `${representative.name}`,
      {
        is: (representativeCheck: any) => {
          return representativeCheck;
        },
        then: Yup.string().required(
          `${residenceRepresentative.requiredErrorMsg}`
        )
      }
    )
  }),
  Yup.object().shape({
    [economicActivityDependent.name]: Yup.bool(),
    [economicActivityInDependent.name]: Yup.bool(),
    [economicActivityRetired.name]: Yup.bool(),
    [economicActivityNotWork.name]: Yup.bool(),
    [companyName.name]: Yup.string().when(`${economicActivityDependent.name}`, {
      is: (dependent: any) => {
        return dependent;
      },
      then: Yup.string().required(`${companyName.requiredErrorMsg}`)
    }),
    [companyPosition.name]: Yup.string().when(
      `${economicActivityDependent.name}`,
      {
        is: (dependent: any) => {
          return dependent;
        },
        then: Yup.string().required(`${companyPosition.requiredErrorMsg}`)
      }
    ),
    [companyAddress.name]: Yup.string().when(
      `${economicActivityDependent.name}`,
      {
        is: (dependent: any) => {
          return dependent;
        },
        then: Yup.string().required(`${companyAddress.requiredErrorMsg}`)
      }
    ),
    [ruc.name]: Yup.string().when(`${economicActivityInDependent.name}`, {
      is: (independent: any) => {
        return independent;
      },
      then: Yup.string()
        .required(`${ruc.requiredErrorMsg}`)
        .min(13, identifier.invalidMinMsgRuc)
        .max(13, identifier.invalidMinMsgRuc)
        .matches(/^[^.]*$/, {
          message: ruc.invalidErrorMsg
        })
        .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
          message: ruc.invalidSimbolsMsg
        })
        .matches(/^[\s\d)(-]+$/, {
          message: ruc.invalidErrorMsg
        })
    }),
    [rucAddress.name]: Yup.string().when(
      `${economicActivityInDependent.name}`,
      {
        is: (independent: any) => {
          return independent;
        },
        then: Yup.string().required(`${rucAddress.requiredErrorMsg}`)
      }
    ),
    [typeOfActivity.name]: Yup.string().when(
      `${economicActivityInDependent.name}`,
      {
        is: (independent: any) => {
          return independent;
        },
        then: Yup.string().required(`${typeOfActivity.requiredErrorMsg}`)
      }
    ),

    [economicActivityRepresentativeDependent.name]: Yup.bool(),
    [economicActivityRepresentativeInDependent.name]: Yup.bool(),
    [economicActivityRepresentativeRetired.name]: Yup.bool(),
    [economicActivityRepresentativeNotWork.name]: Yup.bool(),
    [companyNameRepresentative.name]: Yup.string().when(
      `${economicActivityRepresentativeDependent.name}`,
      {
        is: (representativeDependent: any) => {
          return representativeDependent;
        },
        then: Yup.string().required(
          `${companyNameRepresentative.requiredErrorMsg}`
        )
      }
    ),

    [companyPositionRepresentative.name]: Yup.string().when(
      `${economicActivityRepresentativeDependent.name}`,
      {
        is: (representativeDependent: any) => {
          return representativeDependent;
        },
        then: Yup.string().required(
          `${companyPositionRepresentative.requiredErrorMsg}`
        )
      }
    ),

    [companyAddressRepresentative.name]: Yup.string().when(
      `${economicActivityRepresentativeDependent.name}`,
      {
        is: (representativeDependent: any) => {
          return representativeDependent;
        },
        then: Yup.string().required(
          `${companyAddressRepresentative.requiredErrorMsg}`
        )
      }
    ),

    [rucRepresentative.name]: Yup.number().when(
      `${economicActivityRepresentativeInDependent.name}`,
      {
        is: (representativeIndependent: any) => {
          return representativeIndependent;
        },
        then: Yup.number().required(`${rucRepresentative.requiredErrorMsg}`)
      }
    ),
    [rucAddressRepresentative.name]: Yup.string().when(
      `${economicActivityRepresentativeInDependent.name}`,
      {
        is: (representativeIndependent: any) => {
          return representativeIndependent;
        },
        then: Yup.string().required(
          `${rucAddressRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [typeOfActivityRepresentative.name]: Yup.string().when(
      `${economicActivityRepresentativeInDependent.name}`,
      {
        is: (representativeIndependent: any) => {
          return representativeIndependent;
        },
        then: Yup.string().required(
          `${typeOfActivityRepresentative.requiredErrorMsg}`
        )
      }
    ),

    [incomesRepresentative.name]: Yup.array().when(`${representative.name}`, {
      is: (incomesRepresent: any) => {
        return incomesRepresent;
      },
      then: Yup.array()
        .of(
          Yup.object().shape({
            [incomesRepresentative.childItem.incomeDetail.name]:
              Yup.string().required(
                `${incomesRepresentative.childItem.incomeDetail.requiredErrorMsg}`
              ),
            [incomesRepresentative.childItem.incomeValue.name]: Yup.string()
              .required(
                `${incomesRepresentative.childItem.incomeValue.requiredErrorMsg}`
              )
              .min(
                0,
                incomesRepresentative.childItem.incomeValue.invalidMinErrorMsg
              )
          })
        )
        .required(`${incomesRepresentative.requiredErrorMsg}`)
        .min(1, `${incomesRepresentative.invalidErrorMsg}`)
        .test('sum', 'La sumatoria debe ser mayor a cero', (rows = []) => {
          const total = rows.reduce((tot: number, row: any) => {
            let value = parseFloat(
              normalizeMoney(
                row[incomesRepresentative.childItem.incomeValue.name]
              )
            );
            return tot + (value || 0);
          }, 0);

          return total > 0;
        })
    }),

    [expensesRepresentative.name]: Yup.array().when(`${representative.name}`, {
      is: (expensesRepresentat: any) => {
        return expensesRepresentat;
      },
      then: Yup.array()
        .of(
          Yup.object().shape({
            [expensesRepresentative.childItem.expenseDetail.name]:
              Yup.string().required(
                `${expensesRepresentative.childItem.expenseDetail.requiredErrorMsg}`
              ),
            [expensesRepresentative.childItem.expenseValue.name]: Yup.string()
              .required(
                `${expensesRepresentative.childItem.expenseValue.requiredErrorMsg}`
              )
              .min(
                0,
                expensesRepresentative.childItem.expenseValue.invalidMinErrorMsg
              )
          })
        )
        .required(`${expensesRepresentative.requiredErrorMsg}`)
        .min(1, `${expensesRepresentative.invalidErrorMsg}`)
        .test('sum', 'La sumatoria debe ser mayor a cero', (rows = []) => {
          const total = rows.reduce((tot: number, row: any) => {
            let value = parseFloat(
              normalizeMoney(
                row[expensesRepresentative.childItem.expenseValue.name]
              )
            );
            return tot + (value || 0);
          }, 0);

          return total > 0;
        })
    }),
    [activeRepresentative.name]: Yup.array().when(`${representative.name}`, {
      is: (activeRepresent: any) => {
        return activeRepresent;
      },
      then: Yup.array()
        .of(
          Yup.object().shape({
            [activeRepresentative.childItem.activeDetail.name]:
              Yup.string().required(
                `${activeRepresentative.childItem.activeDetail.requiredErrorMsg}`
              ),
            [activeRepresentative.childItem.activeValue.name]: Yup.string()
              .required(
                `${activeRepresentative.childItem.activeValue.requiredErrorMsg}`
              )
              .min(
                0,
                activeRepresentative.childItem.activeValue.invalidMinErrorMsg
              )
          })
        )
        .required(`${activeRepresentative.requiredErrorMsg}`)
        .min(1, `${activeRepresentative.invalidErrorMsg}`)
        .test('sum', 'La sumatoria debe ser mayor a cero', (rows = []) => {
          const total = rows.reduce((tot: number, row: any) => {
            let value = parseFloat(
              normalizeMoney(
                row[activeRepresentative.childItem.activeValue.name]
              )
            );
            return tot + (value || 0);
          }, 0);
          return total > 0;
        })
    }),

    [passivesRepresentative.name]: Yup.array().when(`${representative.name}`, {
      is: (passivesRepresent: any) => {
        return passivesRepresent;
      },
      then: Yup.array()
        .of(
          Yup.object().shape({
            [passivesRepresentative.childItem.passiveDetail.name]:
              Yup.string().required(
                `${passivesRepresentative.childItem.passiveDetail.requiredErrorMsg}`
              ),
            [passivesRepresentative.childItem.passiveValue.name]: Yup.string()
              .required(
                `${passivesRepresentative.childItem.passiveValue.requiredErrorMsg}`
              )
              .min(
                0,
                passivesRepresentative.childItem.passiveValue.invalidMinErrorMsg
              )
          })
        )
        .required(`${passivesRepresentative.requiredErrorMsg}`)
        .min(1, `${passivesRepresentative.invalidErrorMsg}`)
        .test('sum', 'La sumatoria debe ser mayor a cero', (rows = []) => {
          const total = rows.reduce((tot: number, row: any) => {
            let value = parseFloat(
              normalizeMoney(
                row[passivesRepresentative.childItem.passiveValue.name]
              )
            );
            return tot + (value || 0);
          }, 0);

          return total > 0;
        })
    }),
    [incomeTotal.name]: Yup.number(),
    [incomes.name]: Yup.array()
      .of(
        Yup.object().shape({
          [incomes.childItem.incomeDetail.name]: Yup.string().required(
            `${incomes.childItem.incomeDetail.requiredErrorMsg}`
          ),
          [incomes.childItem.incomeValue.name]: Yup.string()
            .required(`${incomes.childItem.incomeValue.requiredErrorMsg}`)
            .min(0, incomes.childItem.incomeValue.invalidMinErrorMsg)
        })
      )
      .required(`${incomes.requiredErrorMsg}`)
      .min(1, `${incomes.invalidErrorMsg}`)
      .test('sum', 'La sumatoria debe ser mayor a cero', (rows = []) => {
        const total = rows.reduce((tot: number, row: any) => {
          let value = parseFloat(
            normalizeMoney(row[incomes.childItem.incomeValue.name])
          );
          return tot + (value || 0);
        }, 0);

        return total > 0;
      }),
    [expenses.name]: Yup.array()
      .of(
        Yup.object().shape({
          [expenses.childItem.expenseDetail.name]: Yup.string().required(
            `${expenses.childItem.expenseDetail.requiredErrorMsg}`
          ),
          [expenses.childItem.expenseValue.name]: Yup.string()
            // .typeError(expenses.childItem.expenseValue.invalidErrorMsg)
            .required(`${expenses.childItem.expenseValue.requiredErrorMsg}`)
            .min(0, expenses.childItem.expenseValue.invalidMinErrorMsg)
        })
      )
      .required(`${expenses.requiredErrorMsg}`)
      .min(1, `${expenses.invalidErrorMsg}`)
      .test('sum', 'La sumatoria debe ser mayor a cero', (rows = []) => {
        const total = rows.reduce((tot: number, row: any) => {
          let value = parseFloat(
            normalizeMoney(row[expenses.childItem.expenseValue.name])
          );
          return tot + (value || 0);
        }, 0);

        return total > 0;
      }),
    [expenseTotal.name]: Yup.number().required(
      `${expenseTotal.requiredErrorMsg}`
    ),
    [active.name]: Yup.array()
      .of(
        Yup.object().shape({
          [active.childItem.activeDetail.name]: Yup.string().required(
            `${active.childItem.activeDetail.requiredErrorMsg}`
          ),
          [active.childItem.activeValue.name]: Yup.string()
            // .typeError(active.childItem.activeValue.invalidErrorMsg)
            .required(`${active.childItem.activeValue.requiredErrorMsg}`)
            .min(0, active.childItem.activeValue.invalidMinErrorMsg)
        })
      )
      .required(`${active.requiredErrorMsg}`)
      .min(1, `${active.invalidErrorMsg}`)
      .test('sum', 'La sumatoria debe ser mayor a cero.', (rows = []) => {
        const total = rows.reduce((tot: number, row: any) => {
          let value = parseFloat(
            normalizeMoney(row[active.childItem.activeValue.name])
          );
          return tot + (value || 0);
        }, 0);

        return total > 0;
      }),
    [activeTotal.name]: Yup.number().required(
      `${activeTotal.requiredErrorMsg}`
    ),
    [passives.name]: Yup.array()
      .of(
        Yup.object().shape({
          [passives.childItem.passiveDetail.name]: Yup.string().required(
            `${passives.childItem.passiveDetail.requiredErrorMsg}`
          ),
          [passives.childItem.passiveValue.name]: Yup.string()
            // .typeError(passives.childItem.passiveValue.invalidErrorMsg)
            .required(`${passives.childItem.passiveValue.requiredErrorMsg}`)
            .min(0, passives.childItem.passiveValue.invalidMinErrorMsg)
        })
      )
      .required(`${passives.requiredErrorMsg}`)
      .min(1, `${passives.invalidErrorMsg}`)
      .test('sum', 'La sumatoria debe ser mayor a cero.', (rows = []) => {
        const total = rows.reduce((tot: number, row: any) => {
          let value = parseFloat(
            normalizeMoney(row[passives.childItem.passiveValue.name])
          );
          return tot + (value || 0);
        }, 0);
        return total > 0;
      }),
    [passivesTotal.name]: Yup.number().required(
      `${passivesTotal.requiredErrorMsg}`
    ),
    [patrimonyTotal.name]: Yup.number().required(
      `${patrimonyTotal.requiredErrorMsg}`
    )
  }),
  Yup.object().shape({
    [bankReferences.name]: Yup.array()
      .of(
        Yup.object().shape({
          [bankReferences.childItem.nameBank.name]: Yup.string().required(
            `${bankReferences.childItem.nameBank.requiredErrorMsg}`
          ),
          [bankReferences.childItem.accountNumber.name]: Yup.number()
            .typeError(bankReferences.childItem.accountNumber.invalidErrorMsg)
            .required(
              `${bankReferences.childItem.accountNumber.requiredErrorMsg}`
            ),
          [bankReferences.childItem.accountType.name]: Yup.string().required(
            `${bankReferences.childItem.accountType.requiredErrorMsg}`
          ),
          [bankReferences.childItem.authorizedAccount.name]:
            Yup.boolean().required(
              `${bankReferences.childItem.authorizedAccount.requiredErrorMsg}`
            )
        })
      )
      .required(`${bankReferences.requiredErrorMsg}`)
      .min(1, `${bankReferences.invalidErrorMsg}`)
      .test(
        'uniqueIn',
        bankReferences.invalidAuthorizedErrorMsg,
        (rows = []) => {
          return (
            rows.filter(
              (row) =>
                row[bankReferences.childItem.authorizedAccount.name] === true
            ).length < 2
          );
        }
      ),

    [bankReferencesRepresentative.name]: Yup.array().when(
      `${representative.name}`,
      {
        is: (bankReferencesReprest: any) => {
          return bankReferencesReprest;
        },
        then: Yup.array()
          .of(
            Yup.object().shape({
              [bankReferencesRepresentative.childItem.nameBank.name]:
                Yup.string().required(
                  `${bankReferencesRepresentative.childItem.nameBank.requiredErrorMsg}`
                ),
              [bankReferencesRepresentative.childItem.accountNumber.name]:
                Yup.number().required(
                  `${bankReferencesRepresentative.childItem.accountNumber.requiredErrorMsg}`
                ),
              [bankReferencesRepresentative.childItem.accountType.name]:
                Yup.string().required(
                  `${bankReferencesRepresentative.childItem.accountType.requiredErrorMsg}`
                ),
              [bankReferencesRepresentative.childItem.authorizedAccount.name]:
                Yup.string().required(
                  `${bankReferencesRepresentative.childItem.authorizedAccount.requiredErrorMsg}`
                )

              // [bankReferencesRepresentative.childItem.nameBank.name]: Yup.string()
              //     .when(`${representative.name}`, {
              //         is: (representativeCheck: any) => {
              //             return representativeCheck == true;
              //         },
              //         then: Yup.string().required(`${bankReferencesRepresentative.childItem.nameBank.requiredErrorMsg}`)
              //     }),
              // [bankReferencesRepresentative.childItem.accountNumber.name]: Yup.string()
              //     .when(`${representative.name}`, {
              //         is: (representativeCheck: any) => {
              //             return representativeCheck == true;
              //         },
              //         then: Yup.string().required(`${bankReferencesRepresentative.childItem.accountNumber.requiredErrorMsg}`)
              //     }),

              // [bankReferencesRepresentative.childItem.accountType.name]: Yup.string()
              //     .when(`${representative.name}`, {
              //         is: (representativeCheck: any) => {
              //             return representativeCheck == true;
              //         },
              //         then: Yup.string().required(`${bankReferencesRepresentative.childItem.accountType.requiredErrorMsg}`)
              //     }),
              // [bankReferencesRepresentative.childItem.authorizedAccount.name]: Yup.string()
              //     .when(`${representative.name}`, {
              //         is: (representativeCheck: any) => {
              //             return representativeCheck == true;
              //         },
              //         then: Yup.string().required(`${bankReferencesRepresentative.childItem.authorizedAccount.requiredErrorMsg}`)
              //     })
            })
          )
          .required(`${bankReferencesRepresentative.requiredErrorMsg}`)
          .min(1, `${bankReferencesRepresentative.invalidErrorMsg}`)
      }
    )
  }),
  Yup.object().shape({
    [vowPEP.name]: Yup.string().required(`${vowPEP.requiredErrorMsg}`),
    [positionPEP.name]: Yup.string().when(`${vowPEP.name}`, {
      is: (publicOffice: any) => {
        return publicOffice === Constants.CodeAffidavitPublicOffice;
      },
      then: Yup.string().required(`${positionPEP.requiredErrorMsg}`)
    }),
    [functionPEP.name]: Yup.string().when(`${vowPEP.name}`, {
      is: (publicOffice: any) => {
        return publicOffice === Constants.CodeAffidavitPublicOffice;
      },
      then: Yup.string().required(`${functionPEP.requiredErrorMsg}`)
    }),
    [dateStartPEP.name]: Yup.date()
      .nullable()
      .when(`${vowPEP.name}`, {
        is: (publicOffice: any) => {
          return publicOffice === Constants.CodeAffidavitPublicOffice;
        },
        then: Yup.date()
          .typeError(dateStartPEP.invalidFormatMsg)
          .max(new Date(), dateStartPEP.invalidMaxErrorMsg)
          .required(`${dateStartPEP.requiredErrorMsg}`)
      }),
    [dateEndPEP.name]: Yup.date()
      .nullable()
      .when(`${vowPEP.name}`, {
        is: (publicOffice: any) => {
          return publicOffice === Constants.CodeAffidavitPublicOffice;
        },
        then: Yup.date()
          .typeError(dateStartPEP.invalidFormatMsg)
          .max(new Date(), dateStartPEP.invalidMaxErrorMsg)
          .required(`${dateEndPEP.requiredErrorMsg}`)
      }),
    [linkUpPEP.name]: Yup.string().required(`${linkUpPEP.requiredErrorMsg}`),
    [detailPEP.name]: Yup.string().when(`${linkUpPEP.name}`, {
      is: (publicOffice: any) => {
        return publicOffice === Constants.CodeAffidavitBusinessRelationship;
      },
      then: Yup.string().required(`${detailPEP.requiredErrorMsg}`)
    })
  }),
  Yup.object().shape({
    [files.name]: Yup.array()
      .of(
        Yup.object().shape({
          [files.childItem.fileName.name]: Yup.string().required(
            `${files.childItem.fileName.requiredErrorMsg}`
          ),
          [files.childItem.file.name]: Yup.mixed().required(
            `${files.childItem.file.requiredErrorMsg}`
          )
        })
      )
      .required(`${files.requiredErrorMsg}`)
  })
];
