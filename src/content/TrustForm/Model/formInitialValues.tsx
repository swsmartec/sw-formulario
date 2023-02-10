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

export default {
  [identifier.name]: '',
  [businessName.name]: '',
  [nationality.name]: '',
  [residence.name]: '',
  [economicActivity.name]: '',
  [enrollmentDate.name]: '',
  [email.name]: '',
  [emailBilling.name]: '',
  [emailBilling.name]: '',
  [cellPhone.name]: '',
  [typeRepresentative.name]: Constants.CodeTypeRepresentativeNaturalPerson,
  [identifierRepresentative.name]: '',
  [lastNameRepresentative.name]: '',
  [firstNameRepresentative.name]: '',
  [nationalityRepresentative.name]: '',
  [positionRepresentative.name]: '',
  [residenceRepresentative.name]: '',
  [identifierLegal.name]: '',
  [businessNameLegal.name]: '',
  [positionLegal.name]: '',
  [identifierRepresentativeLegal.name]: '',
  [lastNameRepresentativeLegal.name]: '',
  [firstNameRepresentativeLegal.name]: '',
  [nationalityRepresentativeLegal.name]: '',
  [positionRepresentativeLegal.name]: '',
  [residenceRepresentativeLegal.name]: '',
  [functionaries.name]: [
    {
      [functionaries.childItem.identifierFunctionary.name]: '',
      [functionaries.childItem.lastNameFunctionary.name]: '',
      [functionaries.childItem.firstNameFunctionary.name]: ''
    }
  ],
  [termsAndConditions.name]: false,
  [country.name]: '',
  [province.name]: '',
  [canton.name]: '',
  [address.name]: '',
  [landline.name]: '',
  [legalShareholders.name]: [
    {
      [legalShareholders.childItem.identifierShareholdersLegal.name]: '',
      [legalShareholders.childItem.businessNameShareholdersLegal.name]: '',
      [legalShareholders.childItem.nationalityShareholdersLegal.name]: '',
      [legalShareholders.childItem.residenceShareholdersLegal.name]: '',
      [legalShareholders.childItem.percentageShareholdersLegal.name]: ''
    }
  ],
  [naturalShareholders.name]: [
    {
      [naturalShareholders.childItem.identifierShareholdersNatural.name]: '',
      [naturalShareholders.childItem.lastNameShareholdersNatural.name]: '',
      [naturalShareholders.childItem.firstNameShareholdersNatural.name]: '',
      [naturalShareholders.childItem.percentageShareholdersNatural.name]: '',
      [naturalShareholders.childItem.residenceShareholdersNatural.name]: ''
    }
  ],
  [files.name]: [
    {
      [files.childItem.fileName.name]: '',
      [files.childItem.file.name]: null
    }
  ]
};
