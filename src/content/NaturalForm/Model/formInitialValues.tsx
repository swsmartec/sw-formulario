import { Constants } from '../../../../constants/default';
import formModel from './formModel';

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
    //    Apoderado
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
    incomeTotalRepresentative,
    expensesRepresentative,
    expenseTotalRepresentative,
    activeRepresentative,
    activeTotalRepresentative,
    passivesRepresentative,
    passivesTotalRepresentative,
    patrimonyTotalRepresentative,
    bankReferencesRepresentative,
    files
  }
} = formModel;

export default {
  [representative.name]: Constants.CodeCheckRepresentative,
  [typeNationality.name]: Constants.CodeTypeNationalityEcuadorian,
  [typeIdentifier.name]: Constants.CodeIdentificationCard,
  [identifier.name]: '',
  [surname.name]: '',
  [secondSurname.name]: '',
  [firstName.name]: '',
  [secondName.name]: '',
  [email.name]: '',
  [cellPhone.name]: '',
  [nationality.name]: [Constants.CodeCountryEcuador],
  [birthDate.name]: null,
  [maritalStatus.name]: '',
  [identifierSpouse.name]: '',
  [lastNameSpouse.name]: '',
  [firstNameSpouse.name]: '',
  [nationalitySpouse.name]: Constants.CodeCountryEcuador,
  [termsAndConditions.name]: false,
  [country.name]: Constants.CodeCountryEcuador,
  [province.name]: '',
  [canton.name]: '',
  [address.name]: '',
  [landline.name]: '',
  [residence.name]: Constants.CodeCountryEcuador,
  [economicActivityDependent.name]: true,
  [economicActivityInDependent.name]: false,
  [economicActivityRetired.name]: false,
  [economicActivityNotWork.name]: false,
  [companyName.name]: '',
  [companyPosition.name]: '',
  [companyAddress.name]: '',
  [ruc.name]: '',
  [rucAddress.name]: '',
  [typeOfActivity.name]: '',
  [incomes.name]: [
    {
      [incomes.childItem.incomeDetail.name]: 0,
      [incomes.childItem.incomeValue.name]: 0
    }
  ],
  [incomeTotal.name]: 0,
  [expenses.name]: [
    {
      [expenses.childItem.expenseDetail.name]: 0,
      [expenses.childItem.expenseValue.name]: 0
    }
  ],
  [expenseTotal.name]: 0,
  [active.name]: [
    {
      [active.childItem.activeDetail.name]: 0,
      [active.childItem.activeValue.name]: 0
    }
  ],
  [activeTotal.name]: 0,
  [passives.name]: [
    {
      [passives.childItem.passiveDetail.name]: 0,
      [passives.childItem.passiveValue.name]: 0
    }
  ],
  [passivesTotal.name]: 0,
  [patrimonyTotal.name]: 0,
  [bankReferences.name]: [
    {
      [bankReferences.childItem.nameBank.name]: '',
      [bankReferences.childItem.accountNumber.name]: '',
      [bankReferences.childItem.accountType.name]: '',
      [bankReferences.childItem.authorizedAccount.name]: true
    },
    {
      [bankReferences.childItem.nameBank.name]: '',
      [bankReferences.childItem.accountNumber.name]: '',
      [bankReferences.childItem.accountType.name]: '',
      [bankReferences.childItem.authorizedAccount.name]: false
    }
  ],
  [vowPEP.name]: '',
  [positionPEP.name]: '',
  [functionPEP.name]: '',
  [dateStartPEP.name]: null,
  [dateEndPEP.name]: null,
  [linkUpPEP.name]: '',
  [detailPEP.name]: '',

  //    Apoderado
  [typeNationalityRepresentative.name]: Constants.CodeTypeNationalityEcuadorian,
  [typeIdentifierRepresentative.name]: Constants.CodeIdentificationCard,
  [identifierRepresentative.name]: '',
  [surnameRepresentative.name]: '',
  [secondSurnameRepresentative.name]: '',
  [firstNameRepresentative.name]: '',
  [secondNameRepresentative.name]: '',
  [emailRepresentative.name]: '',
  [cellPhoneRepresentative.name]: '',
  [nationalityRepresentative.name]: '',
  [birthDateRepresentative.name]: null,
  [countryRepresentative.name]: Constants.CodeCountryEcuador,
  [provinceRepresentative.name]: '',
  [cantonRepresentative.name]: '',
  [addressRepresentative.name]: '',
  [landlineRepresentative.name]: '',
  [residenceRepresentative.name]: '',

  [economicActivityRepresentativeDependent.name]: false,
  [economicActivityRepresentativeInDependent.name]: false,
  [economicActivityRepresentativeRetired.name]: false,
  [economicActivityRepresentativeNotWork.name]: false,
  [companyNameRepresentative.name]: '',
  [companyPositionRepresentative.name]: '',
  [companyAddressRepresentative.name]: '',
  [rucRepresentative.name]: '',
  [rucAddressRepresentative.name]: '',
  [typeOfActivityRepresentative.name]: '',
  [incomesRepresentative.name]: [
    {
      [incomesRepresentative.childItem.incomeDetail.name]: '',
      [incomesRepresentative.childItem.incomeValue.name]: 0
    }
  ],
  [incomeTotalRepresentative.name]: 0,
  [expensesRepresentative.name]: [
    {
      [expensesRepresentative.childItem.expenseDetail.name]: '',
      [expensesRepresentative.childItem.expenseValue.name]: 0
    }
  ],
  [expenseTotalRepresentative.name]: 0,
  [activeRepresentative.name]: [
    {
      [activeRepresentative.childItem.activeDetail.name]: '',
      [activeRepresentative.childItem.activeValue.name]: 0
    }
  ],
  [activeTotalRepresentative.name]: 0,
  [passivesRepresentative.name]: [
    {
      [passivesRepresentative.childItem.passiveDetail.name]: '',
      [passivesRepresentative.childItem.passiveValue.name]: 0
    }
  ],
  [passivesTotalRepresentative.name]: 0,
  [patrimonyTotalRepresentative.name]: 0,
  [bankReferencesRepresentative.name]: [
    {
      [bankReferencesRepresentative.childItem.nameBank.name]: '',
      [bankReferencesRepresentative.childItem.accountNumber.name]: '',
      [bankReferencesRepresentative.childItem.accountType.name]: '',
      [bankReferencesRepresentative.childItem.authorizedAccount.name]: true
    },
    {
      [bankReferencesRepresentative.childItem.nameBank.name]: '',
      [bankReferencesRepresentative.childItem.accountNumber.name]: '',
      [bankReferencesRepresentative.childItem.accountType.name]: '',
      [bankReferencesRepresentative.childItem.authorizedAccount.name]: false
    }
  ],
  [vowPEP.name]: 'NO',
  [linkUpPEP.name]: 'NO',
  [files.name]: [
    {
      [files.childItem.fileName.name]: '',
      [files.childItem.file.name]: null
    }
  ]
};
