import { FormHelperText, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import {
  apiCatalogList,
  apiCatalogListDocument
} from '../../../../constants/api';
import { Catalog, Constants, DataList } from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import {
  CheckboxField,
  DatePickerField,
  EmailField,
  InputField,
  RadioField,
  SelectField
} from '../../../components/FormFields';

export const GeneralForm = (props: BaseFormProps) => {
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
      files
    },
    handleUpdateForm
  } = props;

  const { values, errors } = useFormikContext<any>();
  const [isNatural, setNatural] = React.useState<boolean>(true);
  const [externalData, setExternalData] = React.useState<any>({
    listNationality: [],
    listTypeOfActivity: []
  });

  React.useEffect(() => {
    const getData = async () => {
      let listNationality: any[];
      let listTypeOfActivity: any[];
      const wsTypeOfActivity = await post(apiCatalogList, {
        Codigo: Catalog.CodeTypeOfActivity
      });
      const wsNationality = await post(apiCatalogList, {
        Codigo: Catalog.CodeCountry
      });
      listTypeOfActivity = wsTypeOfActivity[Catalog.CodeTypeOfActivity];
      listNationality = wsNationality[Catalog.CodeCountry];
      return { listNationality, listTypeOfActivity };
    };
    getData().then((resp) => {
      const { listNationality, listTypeOfActivity } = resp;
      setExternalData({ listNationality, listTypeOfActivity });
    });
  }, []);

  React.useEffect(() => {
    post(apiCatalogListDocument, { Codigo: Catalog.CodeTipoDocumentoPJ })
      .then((resp) => {
        let valueFile = null;
        values[files.name] = resp.map((fil) => {
          if (values[files.name] && values[files.name].length > 0) {
            let findFile = values[files.name].filter(
              (file) => file.fileName == fil.DOC_NOMBRE
            );
            if (findFile.length > 0) {
              valueFile = findFile[0].file;
            }
          }
          return { fileName: fil.DOC_NOMBRE, file: valueFile };
        });
      })
      .catch((e) => console.log(e));
  }, []);

  React.useEffect(() => {
    let naturalCheck =
      values[typeRepresentative.name] ==
      Constants.CodeTypeRepresentativeNaturalPerson;
    setNatural(naturalCheck);
    handleUpdateForm(values);
  }, [values]);

  const mainFormError = (_errors: any, name: string) => {
    return (
      _errors &&
      _errors[name] &&
      typeof _errors[name] !== 'object' &&
      _errors[name]
    );
  };

  return (
    <React.Fragment>
      <div className="titleContent">Información de la institución</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1} className={'colContainer'}>
        <Grid item xs={12} sm={7}>
          <InputField name={identifier.name} label={identifier.label} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputField name={businessName.name} label={businessName.label} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={nationality.name}
            label={nationality.label}
            options={externalData.listNationality}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={residence.name}
            label={residence.label}
            options={externalData.listNationality}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={economicActivity.name}
            label={economicActivity.label}
            options={externalData.listTypeOfActivity}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={enrollmentDate.name}
            label={enrollmentDate.label}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EmailField name={email.name} label={email.label} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EmailField name={emailBilling.name} label={emailBilling.label} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={cellPhone.name} label={cellPhone.label} />
        </Grid>
      </Grid>
      <div className="titleContent">Datos Representante Legal</div>
      <Grid container spacing={1} className={'colContainer'}>
        <Grid item xs={12} sm={6}>
          <RadioField
            name={typeRepresentative.name}
            label={typeRepresentative.label}
            options={DataList.TypePerson}
            itemKey={'label'}
            itemLabel={'value'}
          />
        </Grid>
      </Grid>
      {isNatural ? (
        <>
          <Grid container spacing={1} className={'colContainer'}>
            <Grid item xs={12} sm={7}>
              <InputField
                name={identifierRepresentative.name}
                label={identifierRepresentative.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={lastNameRepresentative.name}
                label={lastNameRepresentative.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={firstNameRepresentative.name}
                label={firstNameRepresentative.label}
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
              <SelectField
                name={residenceRepresentative.name}
                label={residenceRepresentative.label}
                options={externalData.listNationality}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={positionRepresentative.name}
                label={positionRepresentative.label}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={1} className={'colContainer'}>
            <Grid item xs={12} sm={7}>
              <InputField
                name={identifierLegal.name}
                label={identifierLegal.label}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField
                name={businessNameLegal.name}
                label={businessNameLegal.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={positionLegal.name}
                label={positionLegal.label}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <div className="titleCampo">
                Representante legal de la persona jurídica
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <InputField
                name={identifierRepresentativeLegal.name}
                label={identifierRepresentativeLegal.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={lastNameRepresentativeLegal.name}
                label={lastNameRepresentativeLegal.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={firstNameRepresentativeLegal.name}
                label={firstNameRepresentativeLegal.label}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={nationalityRepresentativeLegal.name}
                label={nationalityRepresentativeLegal.label}
                options={externalData.listNationality}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={residenceRepresentativeLegal.name}
                label={residenceRepresentativeLegal.label}
                options={externalData.listNationality}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={positionRepresentativeLegal.name}
                label={positionRepresentativeLegal.label}
              />
            </Grid>
          </Grid>
        </>
      )}
      <div className="titleContent">Funcionarios autorizados</div>
      <p className="cstLine">
        Para dar instrucciones de negociaciones con la casa de valores:
      </p>
      <Grid container spacing={1} className={'colContainer'}>
        <FormHelperText error={!!errors}>
          {mainFormError(errors, functionaries.name)}
        </FormHelperText>
        <Grid item xs={12} sm={12}>
          <FieldArray
            key={functionaries.name}
            name={functionaries.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  ></div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  ></div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  ></div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-10'
                    }
                  ></div>
                </div>
                {values.functionaries &&
                  values.functionaries.length > 0 &&
                  values.functionaries.map((item: any, index: number) => (
                    <div
                      key={`${functionaries.name}.${index}.${functionaries.childItem.identifierFunctionary.name}`}
                      className={'inline-container'}
                    >
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${functionaries.name}.${index}.${functionaries.childItem.identifierFunctionary.name}`}
                          label={
                            functionaries.childItem.identifierFunctionary.label
                          }
                          value={item.identifierFunctionary}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${functionaries.name}.${index}.${functionaries.childItem.lastNameFunctionary.name}`}
                          label={
                            functionaries.childItem.lastNameFunctionary.label
                          }
                          value={item.lastNameFunctionary}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${functionaries.name}.${index}.${functionaries.childItem.firstNameFunctionary.name}`}
                          label={
                            functionaries.childItem.firstNameFunctionary.label
                          }
                          value={item.firstNameFunctionary}
                        />
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                          name="close"
                          style={{ color: 'white' }}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  ))}
                <div>
                  <Button
                    className={'btnAdd'}
                    onClick={() => {
                      arrayHelpers.push({
                        [functionaries.childItem.identifierFunctionary.name]:
                          '',
                        [functionaries.childItem.lastNameFunctionary.name]: '',
                        [functionaries.childItem.firstNameFunctionary.name]: ''
                      });
                    }}
                    style={{ background: '#3f51b5', color: 'white' }}
                    name="add"
                  >
                    + Añadir
                  </Button>
                </div>
              </div>
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CheckboxField
          name={termsAndConditions.name}
          label={termsAndConditions.label}
        />
      </Grid>
    </React.Fragment>
  );
};

export default GeneralForm;
