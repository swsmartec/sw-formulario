import { FormHelperText, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { apiCatalogList } from '../../../../constants/api';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import { InputField, SelectField } from '../../../components/FormFields';

export const SriForm = (props: BaseFormProps) => {
  const {
    formField: { legalShareholders, naturalShareholders },
    handleUpdateForm
  } = props;
  const [externalData, setExternalData] = React.useState<any>({
    listNationality: [],
    listMaritalStatus: []
  });

  const { values, errors } = useFormikContext<any>();
  React.useEffect(() => {
    const getData = async () => {
      let listNationality: any[];
      let listMaritalStatus: any[];
      const wsNationality = await post(apiCatalogList, { Codigo: 'PAIS' });
      const wsMaritalStatus = await post(apiCatalogList, {
        Codigo: 'PRE_EST_CIV'
      });
      listNationality = wsNationality['PAIS'];
      listMaritalStatus = wsMaritalStatus['PRE_EST_CIV'];
      return { listNationality, listMaritalStatus };
    };
    getData().then((resp) => {
      const { listNationality, listMaritalStatus } = resp;
      setExternalData({ listNationality, listMaritalStatus });
    });
  }, []);

  React.useEffect(() => {
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
      <div className="titleContent">Accionistas (mayores al 10%)</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <div className="titleContent">Accionistas Juridicos</div>
      <Grid container spacing={1} className={'colContainer'}>
        <FormHelperText error={!!errors}>
          {mainFormError(errors, legalShareholders.name)}
        </FormHelperText>
        <Grid item xs={12} sm={12}>
          <FieldArray
            key={legalShareholders.name}
            name={legalShareholders.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      legalShareholders.childItem.identifierShareholdersLegal
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      legalShareholders.childItem.businessNameShareholdersLegal
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      legalShareholders.childItem.nationalityShareholdersLegal
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      legalShareholders.childItem.residenceShareholdersLegal
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      legalShareholders.childItem.percentageShareholdersLegal
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-10'
                    }
                  >
                    Acciones
                  </div>
                </div>
                {values.legalShareholders &&
                  values.legalShareholders.length > 0 &&
                  values.legalShareholders.map((item: any, index: number) => (
                    <div
                      key={`${legalShareholders.name}.${index}.${legalShareholders.childItem.identifierShareholdersLegal.name}`}
                      className={'inline-container'}
                    >
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${legalShareholders.name}.${index}.${legalShareholders.childItem.identifierShareholdersLegal.name}`}
                          label={
                            legalShareholders.childItem
                              .identifierShareholdersLegal.label
                          }
                          value={item.identifierShareholdersLegal}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${legalShareholders.name}.${index}.${legalShareholders.childItem.businessNameShareholdersLegal.name}`}
                          label={
                            legalShareholders.childItem
                              .businessNameShareholdersLegal.label
                          }
                          value={item.businessNameShareholdersLegal}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <SelectField
                          name={`${legalShareholders.name}.${index}.${legalShareholders.childItem.nationalityShareholdersLegal.name}`}
                          label={
                            legalShareholders.childItem
                              .nationalityShareholdersLegal.label
                          }
                          options={externalData.listNationality}
                          value={item.nationalityShareholdersLegal}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <SelectField
                          name={`${legalShareholders.name}.${index}.${legalShareholders.childItem.residenceShareholdersLegal.name}`}
                          label={
                            legalShareholders.childItem
                              .residenceShareholdersLegal.label
                          }
                          options={externalData.listNationality}
                          value={item.residenceShareholdersLegal}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${legalShareholders.name}.${index}.${legalShareholders.childItem.percentageShareholdersLegal.name}`}
                          label={
                            legalShareholders.childItem
                              .percentageShareholdersLegal.label
                          }
                          value={item.percentageShareholdersLegal}
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
                    onClick={() => {
                      arrayHelpers.push({
                        [legalShareholders.childItem.identifierShareholdersLegal
                          .name]: '',
                        [legalShareholders.childItem
                          .businessNameShareholdersLegal.name]: '',
                        [legalShareholders.childItem
                          .nationalityShareholdersLegal.name]: '',
                        [legalShareholders.childItem.residenceShareholdersLegal
                          .name]: '',
                        [legalShareholders.childItem.percentageShareholdersLegal
                          .name]: ''
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
      <div className="titleContent">Accionistas naturales</div>
      <Grid container spacing={1} className={'colContainer'}>
        <FormHelperText error={!!errors}>
          {mainFormError(errors, naturalShareholders.name)}
        </FormHelperText>
        <Grid item xs={12} sm={12}>
          <FieldArray
            key={naturalShareholders.name}
            name={naturalShareholders.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      naturalShareholders.childItem
                        .identifierShareholdersNatural.label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      naturalShareholders.childItem.lastNameShareholdersNatural
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      naturalShareholders.childItem.firstNameShareholdersNatural
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      naturalShareholders.childItem.residenceShareholdersNatural
                        .label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {
                      naturalShareholders.childItem
                        .percentageShareholdersNatural.label
                    }
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-10'
                    }
                  >
                    Acciones
                  </div>
                </div>
                {values.naturalShareholders &&
                  values.naturalShareholders.length > 0 &&
                  values.naturalShareholders.map((item: any, index: number) => (
                    <div
                      key={`${naturalShareholders.name}.${index}.${naturalShareholders.childItem.identifierShareholdersNatural.name}`}
                      className={'inline-container'}
                    >
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${naturalShareholders.name}.${index}.${naturalShareholders.childItem.identifierShareholdersNatural.name}`}
                          label={
                            naturalShareholders.childItem
                              .identifierShareholdersNatural.label
                          }
                          value={item.identifierShareholdersNatural}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${naturalShareholders.name}.${index}.${naturalShareholders.childItem.lastNameShareholdersNatural.name}`}
                          label={
                            naturalShareholders.childItem
                              .lastNameShareholdersNatural.label
                          }
                          value={item.lastNameShareholdersNatural}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${naturalShareholders.name}.${index}.${naturalShareholders.childItem.firstNameShareholdersNatural.name}`}
                          label={
                            naturalShareholders.childItem
                              .firstNameShareholdersNatural.label
                          }
                          value={item.firstNameShareholdersNatural}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <SelectField
                          name={`${naturalShareholders.name}.${index}.${naturalShareholders.childItem.residenceShareholdersNatural.name}`}
                          label={
                            naturalShareholders.childItem
                              .residenceShareholdersNatural.label
                          }
                          value={item.residenceShareholdersNatural}
                          options={externalData.listNationality}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div className={'inline-container-item'}>
                        <InputField
                          name={`${naturalShareholders.name}.${index}.${naturalShareholders.childItem.percentageShareholdersNatural.name}`}
                          label={
                            naturalShareholders.childItem
                              .percentageShareholdersNatural.label
                          }
                          value={item.percentageShareholdersNatural}
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
                    onClick={() => {
                      arrayHelpers.push({
                        [naturalShareholders.childItem
                          .identifierShareholdersNatural.name]: '',
                        [naturalShareholders.childItem
                          .lastNameShareholdersNatural.name]: '',
                        [naturalShareholders.childItem
                          .firstNameShareholdersNatural.name]: '',
                        [naturalShareholders.childItem
                          .percentageShareholdersNatural.name]: '',
                        [naturalShareholders.childItem
                          .residenceShareholdersNatural.name]: ''
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
    </React.Fragment>
  );
};

export default SriForm;
