import { FormHelperText, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { apiCatalogList } from '../../../../constants/api';
import { Catalog } from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import {
  CheckboxField,
  InputField,
  SelectField
} from '../../../components/FormFields';

export const ReferenceForm = (props: BaseFormProps) => {
  const {
    formField: { representative, bankReferences, bankReferencesRepresentative },
    handleUpdateForm
  } = props;
  const { childItem } = bankReferences;
  const { values, errors } = useFormikContext<any>();

  const [externalData, setExternalData] = React.useState<any>({
    listNameBank: [],
    listAccountType: []
  });

  React.useEffect(() => {
    const getData = async () => {
      let listNameBank: any[];
      let listAccountType: any[];
      const wsNameBank = await post(apiCatalogList, {
        Codigo: Catalog.CodeFinancialInstitutions
      });
      const wsAccountType = await post(apiCatalogList, {
        Codigo: Catalog.CodeTypeBankAccount
      });
      listNameBank = wsNameBank[Catalog.CodeFinancialInstitutions];
      listAccountType = wsAccountType[Catalog.CodeTypeBankAccount];
      return { listNameBank, listAccountType };
    };
    getData().then((resp) => {
      const { listNameBank, listAccountType } = resp;
      setExternalData({ listNameBank, listAccountType });
    });
  }, []);

  const mainFormError = (_errors: any, name: string) => {
    return (
      _errors &&
      _errors[name] &&
      typeof _errors[name] !== 'object' &&
      _errors[name]
    );
  };

  React.useEffect(() => {
    handleUpdateForm(values);
  }, [values]);

  // @ts-ignore
  return (
    <React.Fragment>
      <div className="titleContent">Referencias bancarias</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={3} className="cstGrid styleMov3">
        <FormHelperText error={!!errors}>
          {mainFormError(errors, bankReferences.name)}
        </FormHelperText>
        <FieldArray
          key={bankReferences.name}
          name={bankReferences.name}
          render={(arrayHelpers) => (
            <div>
              <div className={'inline-container step4Style'}>
                <div
                  className={
                    'inline-container-item inline-container-title width-25'
                  }
                >
                  {childItem.nameBank.label}
                </div>
                <div
                  className={
                    'inline-container-item inline-container-title width-20'
                  }
                >
                  {childItem.accountNumber.label}
                </div>
                <div
                  className={
                    'inline-container-item inline-container-title width-20'
                  }
                >
                  {childItem.accountType.label}
                </div>
                <div
                  className={
                    'inline-container-item inline-container-title width-10x'
                  }
                >
                  {childItem.authorizedAccount.label}
                </div>
                <div
                  className={
                    'inline-container-item inline-container-title width-10x actions'
                  }
                ></div>
              </div>
              {values.bankReferences &&
                values.bankReferences.length > 0 &&
                values.bankReferences.map((item: any, index: number) => (
                  <div
                    key={`${bankReferences.name}.${index}.${childItem.nameBank.name}`}
                    className={'inline-container step4Style'}
                  >
                    <div className={'inline-container-item width-25'}>
                      <SelectField
                        name={`${bankReferences.name}.${index}.${childItem.nameBank.name}`}
                        options={externalData.listNameBank}
                        itemKey={'ITC_ID'}
                        value={item.nameBank}
                        itemLabel={'ITC_NOMBRE'}
                      />
                    </div>
                    <div className={'inline-container-item width-20'}>
                      <InputField
                        name={`${bankReferences.name}.${index}.${childItem.accountNumber.name}`}
                        value={item.accountNumber}
                      />
                    </div>
                    <div className={'inline-container-item width-20'}>
                      <SelectField
                        name={`${bankReferences.name}.${index}.${childItem.accountType.name}`}
                        options={externalData.listAccountType}
                        itemKey={'ITC_ID'}
                        value={item.accountType}
                        itemLabel={'ITC_NOMBRE'}
                      />
                    </div>
                    <div
                      className={'inline-container-item width-10x'}
                      style={{ alignContent: 'center' }}
                    >
                      <CheckboxField
                        name={`${bankReferences.name}.${index}.${childItem.authorizedAccount.name}`}
                        value={item.authorizedAccount}
                      />
                    </div>
                    <div className="width-10x">
                      <Button
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                        name="close"
                        style={{ color: 'white' }}
                      >
                        <div className="btnDeleterow"></div>
                      </Button>
                    </div>
                  </div>
                ))}
              <div>
                <Button
                  onClick={() => {
                    arrayHelpers.push({
                      [childItem.nameBank.name]: '',
                      [childItem.accountNumber.name]: '',
                      [childItem.accountType.name]: '',
                      [childItem.authorizedAccount.name]: false
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
      <br />
      {values[representative.name] && (
        <>
          <div className="titleContent">Referencias bancarias apoderado</div>
          <p className="cstLine">Por favor llena los siguientes campos:</p>
          <Grid container spacing={3} className="cstGrid styleMov3">
            <FormHelperText error={!!errors}>
              {mainFormError(errors, bankReferencesRepresentative.name)}
            </FormHelperText>
            <FieldArray
              key={bankReferencesRepresentative.name}
              name={bankReferencesRepresentative.name}
              render={(arrayHelpers) => (
                <div>
                  <div className={'inline-container step4Style'}>
                    <div
                      className={
                        'inline-container-item inline-container-title width-25'
                      }
                    >
                      {bankReferencesRepresentative.childItem.nameBank.label}
                    </div>
                    <div
                      className={
                        'inline-container-item inline-container-title width-20'
                      }
                    >
                      {
                        bankReferencesRepresentative.childItem.accountNumber
                          .label
                      }
                    </div>
                    <div
                      className={
                        'inline-container-item inline-container-title width-20'
                      }
                    >
                      {bankReferencesRepresentative.childItem.accountType.label}
                    </div>
                    <div
                      className={
                        'inline-container-item inline-container-title width-10x'
                      }
                    >
                      {
                        bankReferencesRepresentative.childItem.authorizedAccount
                          .label
                      }
                    </div>
                    <div
                      className={
                        'inline-container-item inline-container-title width-10x actions'
                      }
                    ></div>
                  </div>
                  {values.bankReferencesRepresentative &&
                    values.bankReferencesRepresentative.length > 0 &&
                    values.bankReferencesRepresentative.map(
                      (item: any, index: number) => (
                        <div
                          key={`${bankReferencesRepresentative.name}.${index}.${bankReferencesRepresentative.childItem.nameBank.name}`}
                          className={'inline-container step4Style'}
                        >
                          <div className={'inline-container-item width-25'}>
                            <SelectField
                              name={`${bankReferencesRepresentative.name}.${index}.${bankReferencesRepresentative.childItem.nameBank.name}`}
                              options={externalData.listNameBank}
                              itemKey={'ITC_ID'}
                              value={item.nameBank}
                              itemLabel={'ITC_NOMBRE'}
                            />
                          </div>
                          <div className={'inline-container-item width-20'}>
                            <InputField
                              name={`${bankReferencesRepresentative.name}.${index}.${bankReferencesRepresentative.childItem.accountNumber.name}`}
                              value={item.accountNumber}
                            />
                          </div>
                          <div className={'inline-container-item width-20'}>
                            <SelectField
                              name={`${bankReferencesRepresentative.name}.${index}.${bankReferencesRepresentative.childItem.accountType.name}`}
                              options={externalData.listAccountType}
                              itemKey={'ITC_ID'}
                              value={item.accountType}
                              itemLabel={'ITC_NOMBRE'}
                            />
                          </div>
                          <div
                            className={'inline-container-item 10x'}
                            style={{ alignContent: 'center' }}
                          >
                            <CheckboxField
                              name={`${bankReferencesRepresentative.name}.${index}.${bankReferencesRepresentative.childItem.authorizedAccount.name}`}
                              value={item.authorizedAccount}
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
                              <div className="btnDeleterow"></div>
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  <div>
                    <Button
                      onClick={() => {
                        arrayHelpers.push({
                          [bankReferencesRepresentative.childItem.nameBank
                            .name]: '',
                          [bankReferencesRepresentative.childItem.accountNumber
                            .name]: '',
                          [bankReferencesRepresentative.childItem.accountType
                            .name]: '',
                          [bankReferencesRepresentative.childItem
                            .authorizedAccount.name]: false
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
        </>
      )}
    </React.Fragment>
  );
};

export default ReferenceForm;
