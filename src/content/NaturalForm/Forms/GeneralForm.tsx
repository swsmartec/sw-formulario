import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { apiCatalogList, apiPersonRetrieve } from '../../../../constants/api';
import { Catalog, Constants, DataList } from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import {
  CheckboxField,
  DatePickerField,
  EmailField,
  InputField,
  RadioField,
  SelectField,
  TerminosCondicionesField
} from '../../../components/FormFields';
import MultiSelectField from '../../../components/FormFields/MultiSelectField';

export const GeneralForm = (props: BaseFormProps) => {
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
      // residence,

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
      birthDateRepresentative
    },
    handleUpdateForm
  } = props;
  const { values } = useFormikContext<any>();
  const [isUnMarried, setUnMarried] = React.useState<boolean>(false);
  const [isYounger, setYounger] = React.useState<boolean>(false);
  const [externalData, setExternalData] = React.useState<any>({
    listNationality: [],
    listMaritalStatus: [],
    listTypeIdentifier: []
  });

  const [searchIdentifier, setSearchIdentifier] =
    React.useState<boolean>(false);
  const [searchIdentifierRepresentative, setSearchIdentifierRepresentative] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const getData = async () => {
      let listNationality: any[];
      let listMaritalStatus: any[];
      let listTypeIdentifier: any[];
      const wsTypeIdentifier = await post(apiCatalogList, {
        Codigo: Catalog.CodeTypeIdentifier
      });
      const wsNationality = await post(apiCatalogList, {
        Codigo: Catalog.CodeCountry
      });
      const wsMaritalStatus = await post(apiCatalogList, {
        Codigo: Catalog.CodeMaritalStatus
      });
      listNationality = wsNationality[Catalog.CodeCountry];
      listMaritalStatus = wsMaritalStatus[Catalog.CodeMaritalStatus];
      listTypeIdentifier = wsTypeIdentifier[Catalog.CodeTypeIdentifier];
      return { listNationality, listMaritalStatus, listTypeIdentifier };
    };
    getData().then((resp) => {
      const { listNationality, listMaritalStatus, listTypeIdentifier } = resp;
      setExternalData({
        listNationality,
        listMaritalStatus,
        listTypeIdentifier
      });
    });
  }, []);

  React.useEffect(() => {
    let unMarried =
      values[maritalStatus.name] == Constants.CodeMaritalStatusMarried ||
      values[maritalStatus.name] == Constants.CodeMaritalStatusFactoUnion;
    setUnMarried(unMarried);
    setYounger(values[representative.name]);
    if (
      values[typeNationalityRepresentative.name] ==
      Constants.CodeTypeNationalityEcuadorian
    ) {
      values[nationalityRepresentative.name] = Constants.CodeCountryEcuador;
    }

    handleUpdateForm(values);
  }, [values]);

  React.useEffect(() => {
    let identifierValue = values[identifier.name];
    if (identifierValue.length === 10) {
      post(apiPersonRetrieve, { IdentificationCard: identifierValue })
        .then((resp) => {
          console.log(resp);
          let lastNameS = resp.Apellidos.split(' ');
          let firstNameS = resp.Nombres.split(' ');
          values[surname.name] = lastNameS[0] || ' ';
          values[secondSurname.name] = lastNameS[1] || ' ';
          values[firstName.name] = firstNameS[0] || ' ';
          values[secondName.name] = firstNameS[1] || ' ';
          setSearchIdentifier(true);
        })
        .catch((e) => console.log(e));
    }
  }, [values[identifier.name]]);

  React.useEffect(() => {
    let identifierValue = values[identifierRepresentative.name];
    if (identifierValue.length === 10) {
      post(apiPersonRetrieve, { IdentificationCard: identifierValue })
        .then((resp) => {
          let lastNameS = resp.Apellidos.split(' ');
          let firstNameS = resp.Nombres.split(' ');
          values[surnameRepresentative.name] = lastNameS[0] || ' ';
          values[secondSurnameRepresentative.name] = lastNameS[1] || ' ';
          values[firstNameRepresentative.name] = firstNameS[0] || ' ';
          values[secondNameRepresentative.name] = firstNameS[1] || ' ';
          setSearchIdentifierRepresentative(true);
        })
        .catch((e) => console.log(e));
    }
  }, [values[identifierRepresentative.name]]);

  return (
    <React.Fragment>
      <div className="titleContent">Información General del Cliente</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1} className={'colContainer'}>
        <Grid item xs={12}>
          <CheckboxField
            name={representative.name}
            label={representative.label}
            help={representative.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RadioField
            name={typeNationality.name}
            label={typeNationality.label}
            options={DataList.Nationality}
            itemKey={'label'}
            itemLabel={'value'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RadioField
            name={typeIdentifier.name}
            label={typeIdentifier.label}
            options={externalData.listTypeIdentifier}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <InputField name={identifier.name} label={identifier.label} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={surname.name}
            label={surname.label}
            disabled={searchIdentifier}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={secondSurname.name}
            label={secondSurname.label}
            disabled={searchIdentifier}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={firstName.name}
            label={firstName.label}
            disabled={searchIdentifier}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={secondName.name}
            label={secondName.label}
            disabled={searchIdentifier}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EmailField name={email.name} label={email.label} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cellPhone.name} label={cellPhone.label} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MultiSelectField
            name={nationality.name}
            label={nationality.label}
            options={externalData.listNationality}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
            help={identifier.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={maritalStatus.name}
            label={maritalStatus.label}
            options={externalData.listMaritalStatus}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField name={birthDate.name} label={birthDate.label} />
        </Grid>
      </Grid>
      {isYounger && (
        <>
          <div className="titleContent" style={{ paddingTop: '20px' }}>
            Información del representante legal o apoderado
          </div>
          <Grid container spacing={1} className={'colContainer'}>
            <Grid item xs={12} sm={7}>
              <RadioField
                name={typeNationalityRepresentative.name}
                label={typeNationalityRepresentative.label}
                options={DataList.Nationality}
                itemKey={'label'}
                itemLabel={'value'}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <RadioField
                name={typeIdentifierRepresentative.name}
                label={typeIdentifierRepresentative.label}
                options={externalData.listTypeIdentifier}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <InputField
                name={identifierRepresentative.name}
                label={identifierRepresentative.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={surnameRepresentative.name}
                label={surnameRepresentative.label}
                disabled={searchIdentifierRepresentative}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={secondSurnameRepresentative.name}
                label={secondSurnameRepresentative.label}
                disabled={searchIdentifierRepresentative}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={firstNameRepresentative.name}
                label={firstNameRepresentative.label}
                disabled={searchIdentifierRepresentative}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={secondNameRepresentative.name}
                label={secondNameRepresentative.label}
                disabled={searchIdentifierRepresentative}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EmailField
                name={emailRepresentative.name}
                label={emailRepresentative.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={cellPhoneRepresentative.name}
                label={cellPhoneRepresentative.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={nationalityRepresentative.name}
                label={nationalityRepresentative.label}
                options={externalData.listNationality}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={birthDateRepresentative.name}
                label={birthDateRepresentative.label}
              />
            </Grid>
          </Grid>
        </>
      )}
      {isUnMarried && (
        <>
          <div className="titleContent" style={{ paddingTop: '20px' }}>
            Información del cónyuge
          </div>
          <Grid container spacing={1} className={'colContainer'}>
            <Grid item xs={12} sm={7}>
              <InputField
                name={identifierSpouse.name}
                label={identifierSpouse.label}
                placeholder={'C.C./C.I./Pas'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={lastNameSpouse.name}
                label={lastNameSpouse.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={firstNameSpouse.name}
                label={firstNameSpouse.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={nationalitySpouse.name}
                label={nationalitySpouse.label}
                options={externalData.listNationality}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <TerminosCondicionesField
          name={termsAndConditions.name}
          label={termsAndConditions.label}
        />
      </Grid>
    </React.Fragment>
  );
};

export default GeneralForm;
