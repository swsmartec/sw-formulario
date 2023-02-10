import * as Yup from 'yup';
import { Constants } from '../../../../constants/default';
import formModel from './formModel';

const {
  formField: {
    identifier,
    businessName,
    nationality,
    residence,
    economicActivity,
    enrollmentDate,
    email,
    emailBilling,
    cellPhone,
    typeRepresentative,
    identifierRepresentative,
    lastNameRepresentative,
    firstNameRepresentative,
    nationalityRepresentative,
    positionRepresentative,
    residenceRepresentative,
    identifierLegal,
    businessNameLegal,
    positionLegal,
    identifierRepresentativeLegal,
    lastNameRepresentativeLegal,
    firstNameRepresentativeLegal,
    nationalityRepresentativeLegal,
    positionRepresentativeLegal,
    residenceRepresentativeLegal,
    functionaries,
    termsAndConditions,
    country,
    province,
    canton,
    address,
    landline,
    legalShareholders,
    naturalShareholders,
    files
  }
} = formModel;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default [
  Yup.object().shape({
    [identifier.name]: Yup.string().required(`${identifier.requiredErrorMsg}`),
    [businessName.name]: Yup.string().required(
      `${businessName.requiredErrorMsg}`
    ),
    [nationality.name]: Yup.string().required(
      `${nationality.requiredErrorMsg}`
    ),
    [residence.name]: Yup.string().required(`${residence.requiredErrorMsg}`),
    [economicActivity.name]: Yup.string().required(
      `${economicActivity.requiredErrorMsg}`
    ),
    [enrollmentDate.name]: Yup.string().required(
      `${enrollmentDate.requiredErrorMsg}`
    ),
    [email.name]: Yup.string()
      .email(`${email.invalidErrorMsg}`)
      .required(`${email.requiredErrorMsg}`),
    [emailBilling.name]: Yup.string()
      .email(`${emailBilling.invalidErrorMsg}`)
      .required(`${emailBilling.requiredErrorMsg}`),
    [cellPhone.name]: Yup.string()
      .required(`${cellPhone.requiredErrorMsg}`)
      .matches(phoneRegExp, cellPhone.invalidErrorMsg),
    [typeRepresentative.name]: Yup.string().required(
      `${typeRepresentative.requiredErrorMsg}`
    ),
    [identifierRepresentative.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative ===
            Constants.CodeTypeRepresentativeNaturalPerson
          );
        },
        then: Yup.string().required(
          `${identifierRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [lastNameRepresentative.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative ===
            Constants.CodeTypeRepresentativeNaturalPerson
          );
        },
        then: Yup.string().required(
          `${lastNameRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [firstNameRepresentative.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative ===
            Constants.CodeTypeRepresentativeNaturalPerson
          );
        },
        then: Yup.string().required(
          `${firstNameRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [nationalityRepresentative.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative ===
            Constants.CodeTypeRepresentativeNaturalPerson
          );
        },
        then: Yup.string().required(
          `${nationalityRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [positionRepresentative.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative ===
            Constants.CodeTypeRepresentativeNaturalPerson
          );
        },
        then: Yup.string().required(
          `${positionRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [residenceRepresentative.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative ===
            Constants.CodeTypeRepresentativeNaturalPerson
          );
        },
        then: Yup.string().required(
          `${residenceRepresentative.requiredErrorMsg}`
        )
      }
    ),
    [identifierLegal.name]: Yup.string().when(`${typeRepresentative.name}`, {
      is: (type_representative: any) => {
        return (
          type_representative === Constants.CodeTypeRepresentativeLegalPerson
        );
      },
      then: Yup.string().required(`${identifierLegal.requiredErrorMsg}`)
    }),
    [businessNameLegal.name]: Yup.string().when(`${typeRepresentative.name}`, {
      is: (type_representative: any) => {
        return (
          type_representative === Constants.CodeTypeRepresentativeLegalPerson
        );
      },
      then: Yup.string().required(`${businessNameLegal.requiredErrorMsg}`)
    }),
    [positionLegal.name]: Yup.string().when(`${typeRepresentative.name}`, {
      is: (type_representative: any) => {
        return (
          type_representative === Constants.CodeTypeRepresentativeLegalPerson
        );
      },
      then: Yup.string().required(`${positionLegal.requiredErrorMsg}`)
    }),
    [identifierRepresentativeLegal.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative === Constants.CodeTypeRepresentativeLegalPerson
          );
        },
        then: Yup.string().required(
          `${identifierRepresentativeLegal.requiredErrorMsg}`
        )
      }
    ),
    [lastNameRepresentativeLegal.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative === Constants.CodeTypeRepresentativeLegalPerson
          );
        },
        then: Yup.string().required(
          `${lastNameRepresentativeLegal.requiredErrorMsg}`
        )
      }
    ),
    [firstNameRepresentativeLegal.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative === Constants.CodeTypeRepresentativeLegalPerson
          );
        },
        then: Yup.string().required(
          `${firstNameRepresentativeLegal.requiredErrorMsg}`
        )
      }
    ),
    [nationalityRepresentativeLegal.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative === Constants.CodeTypeRepresentativeLegalPerson
          );
        },
        then: Yup.string().required(
          `${nationalityRepresentativeLegal.requiredErrorMsg}`
        )
      }
    ),
    [positionRepresentativeLegal.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative === Constants.CodeTypeRepresentativeLegalPerson
          );
        },
        then: Yup.string().required(
          `${positionRepresentativeLegal.requiredErrorMsg}`
        )
      }
    ),
    [residenceRepresentativeLegal.name]: Yup.string().when(
      `${typeRepresentative.name}`,
      {
        is: (type_representative: any) => {
          return (
            type_representative === Constants.CodeTypeRepresentativeLegalPerson
          );
        },
        then: Yup.string().required(
          `${residenceRepresentativeLegal.requiredErrorMsg}`
        )
      }
    ),
    [functionaries.name]: Yup.array()
      .of(
        Yup.object().shape({
          [functionaries.childItem.identifierFunctionary.name]:
            Yup.string().required(
              `${functionaries.childItem.identifierFunctionary.requiredErrorMsg}`
            ),
          [functionaries.childItem.lastNameFunctionary.name]:
            Yup.string().required(
              `${functionaries.childItem.lastNameFunctionary.requiredErrorMsg}`
            ),
          [functionaries.childItem.firstNameFunctionary.name]:
            Yup.string().required(
              `${functionaries.childItem.firstNameFunctionary.requiredErrorMsg}`
            )
        })
      )
      .required(`${functionaries.requiredErrorMsg}`)
      .min(1, `${functionaries.invalidErrorMsg}`),

    [termsAndConditions.name]: Yup.bool().oneOf(
      [true],
      `${termsAndConditions.requiredErrorMsg}`
    )
  }),
  Yup.object().shape({
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [province.name]: Yup.string().required(`${province.requiredErrorMsg}`),
    [canton.name]: Yup.string().required(`${canton.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [landline.name]: Yup.string()
  }),
  Yup.object().shape({
    [legalShareholders.name]: Yup.array()
      .of(
        Yup.object().shape({
          [legalShareholders.childItem.identifierShareholdersLegal.name]:
            Yup.string().required(
              `${legalShareholders.childItem.identifierShareholdersLegal.requiredErrorMsg}`
            ),
          [legalShareholders.childItem.businessNameShareholdersLegal.name]:
            Yup.string().required(
              `${legalShareholders.childItem.businessNameShareholdersLegal.requiredErrorMsg}`
            ),
          [legalShareholders.childItem.nationalityShareholdersLegal.name]:
            Yup.string().required(
              `${legalShareholders.childItem.nationalityShareholdersLegal.requiredErrorMsg}`
            ),
          [legalShareholders.childItem.residenceShareholdersLegal.name]:
            Yup.string().required(
              `${legalShareholders.childItem.residenceShareholdersLegal.requiredErrorMsg}`
            ),
          [legalShareholders.childItem.percentageShareholdersLegal.name]:
            Yup.string().required(
              `${legalShareholders.childItem.percentageShareholdersLegal.requiredErrorMsg}`
            )
        })
      )
      .required(`${functionaries.requiredErrorMsg}`)
      .min(1, `${functionaries.invalidErrorMsg}`),
    [naturalShareholders.name]: Yup.array()
      .of(
        Yup.object().shape({
          [naturalShareholders.childItem.identifierShareholdersNatural.name]:
            Yup.string().required(
              `${naturalShareholders.childItem.identifierShareholdersNatural.requiredErrorMsg}`
            ),
          [naturalShareholders.childItem.lastNameShareholdersNatural.name]:
            Yup.string().required(
              `${naturalShareholders.childItem.lastNameShareholdersNatural.requiredErrorMsg}`
            ),
          [naturalShareholders.childItem.firstNameShareholdersNatural.name]:
            Yup.string().required(
              `${naturalShareholders.childItem.firstNameShareholdersNatural.requiredErrorMsg}`
            ),
          [naturalShareholders.childItem.percentageShareholdersNatural.name]:
            Yup.string().required(
              `${naturalShareholders.childItem.percentageShareholdersNatural.requiredErrorMsg}`
            ),
          [naturalShareholders.childItem.residenceShareholdersNatural.name]:
            Yup.string().required(
              `${naturalShareholders.childItem.residenceShareholdersNatural.requiredErrorMsg}`
            )
        })
      )
      .required(`${functionaries.requiredErrorMsg}`)
      .min(1, `${functionaries.invalidErrorMsg}`)
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
