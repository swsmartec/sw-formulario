import { FormHelperText, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { apiCatalogList } from '../../../../constants/api';
import {
  Catalog,
  ListCodeCatalogFinancial
} from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import {
  CheckboxField,
  InputField,
  MoneyField,
  SelectField
} from '../../../components/FormFields';
import HelpComponent from '@/content/HelpComponent';
import { normalizeMoney } from '../../../../helpers/Utils';

export const FinancialForm = (props: BaseFormProps) => {
  const {
    formField: {
      representative,
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
      // Apoderado
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
      patrimonyTotalRepresentative
    },
    handleUpdateForm
  } = props;

  const { childItem } = expenses;
  const { values, errors } = useFormikContext<any>();
  const [isDependiente, setIsDependiente] = React.useState<boolean>(true);
  const [isInDependiente, setIsInDependiente] = React.useState<boolean>(false);
  const [isDependienteRepresentative, setIsDependienteRepresentative] =
    React.useState<boolean>(true);
  const [isInDependienteRepresentative, setIsInDependienteRepresentative] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setIsDependiente(values[economicActivityDependent.name]);
    setIsInDependiente(values[economicActivityInDependent.name]);
    values[expenseTotal.name] = values[expenses.name].reduce(
      (tot: number, row: any) => {
        let value = parseFloat(
          normalizeMoney(row[childItem.expenseValue.name])
        );
        return tot + (value || 0);
      },
      0
    );
    values[incomeTotal.name] = values[incomes.name].reduce(
      (tot: number, row: any) => {
        let value = parseFloat(
          normalizeMoney(row[incomes.childItem.incomeValue.name])
        );
        return tot + (value || 0);
      },
      0
    );

    values[activeTotal.name] = values[active.name].reduce(
      (tot: number, row: any) => {
        let value = parseFloat(
          normalizeMoney(row[active.childItem.activeValue.name])
        );
        return tot + (value || 0);
      },
      0
    );

    values[passivesTotal.name] = values[passives.name].reduce(
      (tot: number, row: any) => {
        let value = parseFloat(
          normalizeMoney(row[passives.childItem.passiveValue.name])
        );
        return tot + (value || 0);
      },
      0
    );
    values[patrimonyTotal.name] = (
      values[activeTotal.name] - values[passivesTotal.name]
    ).toFixed(2);
    // Apoderado
    setIsDependienteRepresentative(
      values[economicActivityRepresentativeDependent.name]
    );
    setIsInDependienteRepresentative(
      values[economicActivityRepresentativeInDependent.name]
    );
    values[expenseTotalRepresentative.name] = values[
      expensesRepresentative.name
    ].reduce((tot: number, row: any) => {
      let value = parseFloat(
        normalizeMoney(row[expensesRepresentative.childItem.expenseValue.name])
      );
      return tot + (value || 0);
    }, 0);
    values[incomeTotalRepresentative.name] = values[
      incomesRepresentative.name
    ].reduce((tot: number, row: any) => {
      let value = parseFloat(
        normalizeMoney(row[incomesRepresentative.childItem.incomeValue.name])
      );
      return tot + (value || 0);
    }, 0);

    values[activeTotalRepresentative.name] = values[
      activeRepresentative.name
    ].reduce((tot: number, row: any) => {
      let value = parseFloat(
        normalizeMoney(row[activeRepresentative.childItem.activeValue.name])
      );
      return tot + (value || 0);
    }, 0);

    values[passivesTotalRepresentative.name] = values[
      passivesRepresentative.name
    ].reduce((tot: number, row: any) => {
      let value = parseFloat(
        normalizeMoney(row[passivesRepresentative.childItem.passiveValue.name])
      );
      return tot + (value || 0);
    }, 0);

    values[patrimonyTotalRepresentative.name] = (
      values[activeTotalRepresentative.name] -
      values[passivesTotalRepresentative.name]
    ).toFixed(2);

    handleUpdateForm(values);
  }, [values]);

  const [externalData, setExternalData] = React.useState<any>({
    listTypeOfActivity: [],
    listIncomes: [],
    listExpenses: [],
    listActive: [],
    listPassives: []
  });

  const mainFormError = (_errors: any, name: string) => {
    return (
      _errors &&
      _errors[name] &&
      typeof _errors[name] !== 'object' &&
      _errors[name]
    );
  };

  React.useEffect(() => {
    const getData = async () => {
      const listCatalog = await post(apiCatalogList, {
        Codigo: ListCodeCatalogFinancial.join(',')
      });
      return { listCatalog };
    };
    getData().then((resp) => {
      const { listCatalog } = resp;
      let listTypeOfActivity = listCatalog[Catalog.CodeTypeOfActivity];
      let listIncomes = listCatalog[Catalog.CodeCatalogoIngresos];
      let listExpenses = listCatalog[Catalog.CodeCatalogoEgresos];
      let listActive = [].concat(
        listCatalog[Catalog.CodeCatalogoActivoInmuebles],
        listCatalog[Catalog.CodeCatalogoActivoMuebles]
      );
      let listPassives = listCatalog[Catalog.CodeCatalogoPasivos];
      setExternalData({
        listTypeOfActivity,
        listIncomes,
        listExpenses,
        listActive,
        listPassives
      });
    });
  }, []);

  return (
    <React.Fragment>
      <div className="titleContent">Información financiera</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <div className="titleCampo titleStyle2">Actividad económica</div>
          <CheckboxField
            className="label"
            name={economicActivityDependent.name}
            label={economicActivityDependent.label}
          />
          <CheckboxField
            className="label"
            name={economicActivityInDependent.name}
            label={economicActivityInDependent.label}
          />
          <CheckboxField
            className="label"
            name={economicActivityRetired.name}
            label={economicActivityRetired.label}
          />
          <CheckboxField
            className="label"
            name={economicActivityNotWork.name}
            label={economicActivityNotWork.label}
          />
        </Grid>
      </Grid>
      {isDependiente ? (
        <>
          <div className="titleCampo titleStyle2">
            Dependiente
            <HelpComponent code={'dependiente'} />
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <InputField name={companyName.name} label={companyName.label} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                name={companyPosition.name}
                label={companyPosition.label}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                name={companyAddress.name}
                label={companyAddress.label}
              />
            </Grid>
          </Grid>
        </>
      ) : null}
      {isInDependiente ? (
        <>
          <div className="titleCampo titleStyle2">
            Independiente
            <HelpComponent code={'independiente'} />
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
              <InputField name={ruc.name} label={ruc.label} />
            </Grid>
            <Grid item xs={12} md={12}>
              <SelectField
                name={typeOfActivity.name}
                label={typeOfActivity.label}
                options={externalData.listTypeOfActivity}
                itemKey={'ITC_CODIGO'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputField name={rucAddress.name} label={rucAddress.label} />
            </Grid>
          </Grid>
        </>
      ) : null}
      <div className="titleCampo titleStyle2">
        Ingresos
        <HelpComponent code={'incomes'} />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          {mainFormError(errors, incomes.name) && (
            <FormHelperText error={!!errors}>
              {mainFormError(errors, incomes.name)}
            </FormHelperText>
          )}
          <FieldArray
            key={incomes.name}
            name={incomes.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {incomes.childItem.incomeDetail.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {incomes.childItem.incomeValue.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20 actions'
                    }
                  ></div>
                </div>
                {values.incomes &&
                  values.incomes.length > 0 &&
                  values.incomes.map((item: any, index: number) => (
                    <div
                      key={`${incomes.name}.${index}.${incomes.childItem.incomeDetail.name}`}
                      className={'inline-container'}
                    >
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        <SelectField
                          name={`${incomes.name}.${index}.${incomes.childItem.incomeDetail.name}`}
                          value={item.incomeDetail}
                          options={externalData.listIncomes}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item btnSizeM inline-container-title width-20'
                        }
                      >
                        <MoneyField
                          placeholder="$ 0.00"
                          type="text"
                          name={`${incomes.name}.${index}.${incomes.childItem.incomeValue.name}`}
                          value={item.incomeValue}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item btnSizeM inline-container-title width-20 leftAlign'
                        }
                      >
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
                    className="btnMargin"
                    onClick={() => {
                      arrayHelpers.push({
                        [incomes.childItem.incomeDetail.name]: '',
                        [incomes.childItem.incomeValue.name]: 0
                      });
                    }}
                    style={{ background: '#3f51b5', color: 'white' }}
                    name="add"
                  >
                    <div className="btnAddrow">
                      <span>+</span>Añadir
                    </div>
                  </Button>
                </div>
              </div>
            )}
          />
        </Grid>
      </Grid>
      <br />
      <div className="titleCampo titleStyle2">
        Egresos
        <HelpComponent code={'expenses'} />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          {mainFormError(errors, expenses.name) && (
            <FormHelperText error={!!errors}>
              {mainFormError(errors, expenses.name)}
            </FormHelperText>
          )}
          <FieldArray
            key={expenses.name}
            name={expenses.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {childItem.expenseDetail.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {childItem.expenseValue.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20 actions'
                    }
                  ></div>
                </div>
                {values.expenses &&
                  values.expenses.length > 0 &&
                  values.expenses.map((item: any, index: number) => (
                    <div
                      key={`${expenses.name}.${index}.${childItem.expenseDetail.name}`}
                      className={'inline-container'}
                    >
                      <div
                        className={
                          'inline-container-item inline-container-item inline-container-title width-20'
                        }
                      >
                        <SelectField
                          name={`${expenses.name}.${index}.${childItem.expenseDetail.name}`}
                          value={item.expenseDetail}
                          options={externalData.listExpenses}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item btnSizeM inline-container-item inline-container-title width-20'
                        }
                      >
                        <MoneyField
                          placeholder="$ 0.00"
                          type="text"
                          name={`${expenses.name}.${index}.${childItem.expenseValue.name}`}
                          value={item.expenseValue}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item btnSizeM inline-container-item inline-container-title width-20 leftAlign'
                        }
                      >
                        <Button
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                          name="close"
                          style={{ color: 'white' }}
                        >
                          <div className="btnDeleterow "></div>
                        </Button>
                      </div>
                    </div>
                  ))}
                <div>
                  <Button
                    className="btnMargin"
                    onClick={() => {
                      arrayHelpers.push({
                        [childItem.expenseDetail.name]: '',
                        [childItem.expenseValue.name]: 0
                      });
                    }}
                    style={{ background: '#3f51b5', color: 'white' }}
                    name="add"
                  >
                    <div className="btnAddrow">
                      <span>+</span>Añadir
                    </div>
                  </Button>
                </div>
              </div>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <InputField
            name={incomeTotal.name}
            label={incomeTotal.label}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <InputField
            name={expenseTotal.name}
            label={expenseTotal.label}
            readOnly
          />
        </Grid>
      </Grid>
      <br />
      <div className="titleCampo titleStyle2">Activos</div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          {mainFormError(errors, active.name) && (
            <FormHelperText error={!!errors}>
              {mainFormError(errors, active.name)}
            </FormHelperText>
          )}
          <FieldArray
            key={active.name}
            name={active.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {active.childItem.activeDetail.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {active.childItem.activeValue.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20 actions'
                    }
                  ></div>
                </div>
                {values.active &&
                  values.active.length > 0 &&
                  values.active.map((item: any, index: number) => (
                    <div
                      key={`${active.name}.${index}.${active.childItem.activeDetail.name}`}
                      className={'inline-container'}
                    >
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        <SelectField
                          name={`${active.name}.${index}.${active.childItem.activeDetail.name}`}
                          value={item.activeDetail}
                          options={externalData.listActive}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item btnSizeM inline-container-title width-20'
                        }
                      >
                        <MoneyField
                          placeholder="$ 0.00"
                          type="text"
                          name={`${active.name}.${index}.${active.childItem.activeValue.name}`}
                          value={item.activeValue}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20 leftAlign'
                        }
                      >
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
                    className="btnMargin"
                    onClick={() => {
                      arrayHelpers.push({
                        [active.childItem.activeDetail.name]: '',
                        [active.childItem.activeValue.name]: 0
                      });
                    }}
                    style={{ background: '#3f51b5', color: 'white' }}
                    name="add"
                  >
                    <div className="btnAddrow">
                      <span>+</span>Añadir
                    </div>
                  </Button>
                </div>
              </div>
            )}
          />
        </Grid>
      </Grid>
      <br />
      <div className="titleCampo titleStyle2">Pasivos</div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          {mainFormError(errors, passives.name) && (
            <FormHelperText error={!!errors}>
              {mainFormError(errors, passives.name)}
            </FormHelperText>
          )}
          <FieldArray
            key={passives.name}
            name={passives.name}
            render={(arrayHelpers) => (
              <div>
                <div className={'inline-container'}>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {passives.childItem.passiveDetail.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20'
                    }
                  >
                    {passives.childItem.passiveValue.label}
                  </div>
                  <div
                    className={
                      'inline-container-item inline-container-title width-20 actions'
                    }
                  ></div>
                </div>
                {values.passives &&
                  values.passives.length > 0 &&
                  values.passives.map((item: any, index: number) => (
                    <div
                      key={`${passives.name}.${index}.${passives.childItem.passiveDetail.name}`}
                      className={'inline-container'}
                    >
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        <SelectField
                          name={`${passives.name}.${index}.${passives.childItem.passiveDetail.name}`}
                          value={item.passiveDetail}
                          options={externalData.listPassives}
                          itemKey={'ITC_ID'}
                          itemLabel={'ITC_NOMBRE'}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item btnSizeM inline-container-title width-20'
                        }
                      >
                        <MoneyField
                          placeholder="$ 0.00"
                          type="text"
                          name={`${passives.name}.${index}.${passives.childItem.passiveValue.name}`}
                          value={item.passiveValue}
                        />
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20 leftAlign'
                        }
                      >
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
                    className="btnMargin"
                    onClick={() => {
                      arrayHelpers.push({
                        [passives.childItem.passiveDetail.name]: '',
                        [passives.childItem.passiveValue.name]: 0
                      });
                    }}
                    style={{ background: '#3f51b5', color: 'white' }}
                    name="add"
                  >
                    <div className="btnAddrow">
                      <span>+</span>Añadir
                    </div>
                  </Button>
                </div>
              </div>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} md={4}>
          <InputField
            name={activeTotal.name}
            label={activeTotal.label}
            readOnly
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <InputField
            name={passivesTotal.name}
            label={passivesTotal.label}
            readOnly
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <InputField
            name={patrimonyTotal.name}
            label={patrimonyTotal.label}
            readOnly
          />
        </Grid>
      </Grid>
      {/*  Apoderado  */}
      {values[representative.name] && (
        <>
          <div className="titleContent" style={{ paddingTop: '20px' }}>
            Información financiera apoderado
          </div>
          <p className="cstLine">Por favor llena los siguientes campos:</p>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <div className="titleCampo titleStyle2">Actividad económica</div>
              <CheckboxField
                className="label"
                name={economicActivityRepresentativeDependent.name}
                label={economicActivityRepresentativeDependent.label}
              />
              <CheckboxField
                className="label"
                name={economicActivityRepresentativeInDependent.name}
                label={economicActivityRepresentativeInDependent.label}
              />
              <CheckboxField
                className="label"
                name={economicActivityRepresentativeRetired.name}
                label={economicActivityRepresentativeRetired.label}
              />
              <CheckboxField
                className="label"
                name={economicActivityRepresentativeNotWork.name}
                label={economicActivityRepresentativeNotWork.label}
              />
            </Grid>
          </Grid>
          {isDependienteRepresentative ? (
            <>
              <div className="titleCampo titleStyle2">Dependiente</div>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <InputField
                    name={companyNameRepresentative.name}
                    label={companyNameRepresentative.label}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    name={companyPositionRepresentative.name}
                    label={companyPositionRepresentative.label}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    name={companyAddressRepresentative.name}
                    label={companyAddressRepresentative.label}
                  />
                </Grid>
              </Grid>
            </>
          ) : null}
          {isInDependienteRepresentative ? (
            <>
              <div className="titleCampo titleStyle2">Independiente</div>
              <Grid container spacing={1}>
                <Grid item xs={12} md={7}>
                  <InputField
                    name={rucRepresentative.name}
                    label={rucRepresentative.label}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SelectField
                    name={typeOfActivityRepresentative.name}
                    label={typeOfActivityRepresentative.label}
                    options={externalData.listTypeOfActivity}
                    itemKey={'ITC_CODIGO'}
                    itemLabel={'ITC_NOMBRE'}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputField
                    name={rucAddressRepresentative.name}
                    label={rucAddressRepresentative.label}
                  />
                </Grid>
              </Grid>
            </>
          ) : null}
          <div className="titleCampo titleStyle2">Ingresos</div>
          <Grid container spacing={1}>
            <Grid item xs={6} md={12}>
              {mainFormError(errors, incomesRepresentative.name) && (
                <FormHelperText error={!!errors}>
                  {mainFormError(errors, incomesRepresentative.name)}
                </FormHelperText>
              )}
              <FieldArray
                key={incomesRepresentative.name}
                name={incomesRepresentative.name}
                render={(arrayHelpers) => (
                  <div>
                    <div className={'inline-container'}>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {incomesRepresentative.childItem.incomeDetail.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {incomesRepresentative.childItem.incomeValue.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20 actions'
                        }
                      ></div>
                    </div>
                    {values.incomesRepresentative &&
                      values.incomesRepresentative.length > 0 &&
                      values.incomesRepresentative.map(
                        (item: any, index: number) => (
                          <div
                            key={`${incomesRepresentative.name}.${index}.${incomesRepresentative.childItem.incomeDetail.name}`}
                            className={'inline-container'}
                          >
                            <div
                              className={
                                'inline-container-item inline-container-title width-20'
                              }
                            >
                              <SelectField
                                name={`${incomesRepresentative.name}.${index}.${incomesRepresentative.childItem.incomeDetail.name}`}
                                value={item.incomeDetail}
                                options={externalData.listIncomes}
                                itemKey={'ITC_ID'}
                                itemLabel={'ITC_NOMBRE'}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item btnSizeM inline-container-title width-20'
                              }
                            >
                              <MoneyField
                                placeholder="$ 0.00"
                                type="text"
                                name={`${incomesRepresentative.name}.${index}.${incomesRepresentative.childItem.incomeValue.name}`}
                                value={item.incomeValue}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item inline-container-title width-20 leftAlign'
                              }
                            >
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
                        className="btnMargin"
                        onClick={() => {
                          arrayHelpers.push({
                            [incomesRepresentative.childItem.incomeDetail.name]:
                              '',
                            [incomesRepresentative.childItem.incomeValue
                              .name]: 0
                          });
                        }}
                        style={{ background: '#3f51b5', color: 'white' }}
                        name="add"
                      >
                        <div className="btnAddrow">
                          <span>+</span>Añadir
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <br />
          <div className="titleCampo">Egresos</div>
          <Grid container>
            <Grid item xs={6} md={12}>
              {mainFormError(errors, expensesRepresentative.name) && (
                <FormHelperText error={!!errors}>
                  {mainFormError(errors, expensesRepresentative.name)}
                </FormHelperText>
              )}
              <FieldArray
                key={expensesRepresentative.name}
                name={expensesRepresentative.name}
                render={(arrayHelpers) => (
                  <div>
                    <div className={'inline-container'}>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {expensesRepresentative.childItem.expenseDetail.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {expensesRepresentative.childItem.expenseValue.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20 actions'
                        }
                      ></div>
                    </div>
                    {values.expensesRepresentative &&
                      values.expensesRepresentative.length > 0 &&
                      values.expensesRepresentative.map(
                        (item: any, index: number) => (
                          <div
                            key={`${expensesRepresentative.name}.${index}.${expensesRepresentative.childItem.expenseDetail.name}`}
                            className={'inline-container'}
                          >
                            <div
                              className={
                                'inline-container-item inline-container-title width-20'
                              }
                            >
                              <SelectField
                                name={`${expensesRepresentative.name}.${index}.${expensesRepresentative.childItem.expenseDetail.name}`}
                                value={item.expenseDetail}
                                options={externalData.listExpenses}
                                itemKey={'ITC_ID'}
                                itemLabel={'ITC_NOMBRE'}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item btnSizeM inline-container-title width-20'
                              }
                            >
                              <MoneyField
                                placeholder="$ 0.00"
                                type="text"
                                name={`${expensesRepresentative.name}.${index}.${expensesRepresentative.childItem.expenseValue.name}`}
                                value={item.expenseValue}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item inline-container-title width-20 leftAlign'
                              }
                            >
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
                        className="btnMargin"
                        onClick={() => {
                          arrayHelpers.push({
                            [expensesRepresentative.childItem.expenseDetail
                              .name]: '',
                            [expensesRepresentative.childItem.expenseValue
                              .name]: 0
                          });
                        }}
                        style={{ background: '#3f51b5', color: 'white' }}
                        name="add"
                      >
                        <div className="btnAddrow">
                          <span>+</span>Añadir
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6} md={6}>
              <InputField
                name={incomeTotalRepresentative.name}
                label={incomeTotalRepresentative.label}
                readOnly
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <InputField
                name={expenseTotalRepresentative.name}
                label={expenseTotalRepresentative.label}
                readOnly
              />
            </Grid>
          </Grid>
          <br />
          <div className="titleCampo titleStyle2">Activos</div>
          <Grid container spacing={1}>
            <Grid item xs={6} md={12}>
              {mainFormError(errors, expensesRepresentative.name) && (
                <FormHelperText error={!!errors}>
                  {mainFormError(errors, expensesRepresentative.name)}
                </FormHelperText>
              )}
              <FieldArray
                key={activeRepresentative.name}
                name={activeRepresentative.name}
                render={(arrayHelpers) => (
                  <div>
                    <div className={'inline-container'}>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {activeRepresentative.childItem.activeDetail.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {activeRepresentative.childItem.activeValue.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20 actions'
                        }
                      ></div>
                    </div>
                    {values.activeRepresentative &&
                      values.activeRepresentative.length > 0 &&
                      values.activeRepresentative.map(
                        (item: any, index: number) => (
                          <div
                            key={`${activeRepresentative.name}.${index}.${activeRepresentative.childItem.activeDetail.name}`}
                            className={'inline-container'}
                          >
                            <div
                              className={
                                'inline-container-item inline-container-title width-20'
                              }
                            >
                              <SelectField
                                name={`${activeRepresentative.name}.${index}.${activeRepresentative.childItem.activeDetail.name}`}
                                value={item.activeDetail}
                                options={externalData.listActive}
                                itemKey={'ITC_ID'}
                                itemLabel={'ITC_NOMBRE'}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item btnSizeM inline-container-title width-20'
                              }
                            >
                              <MoneyField
                                placeholder="$ 0.00"
                                type="text"
                                name={`${activeRepresentative.name}.${index}.${activeRepresentative.childItem.activeValue.name}`}
                                value={item.activeValue}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item inline-container-title width-20 leftAlign'
                              }
                            >
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
                        className="btnMargin"
                        onClick={() => {
                          arrayHelpers.push({
                            [activeRepresentative.childItem.activeDetail.name]:
                              '',
                            [activeRepresentative.childItem.activeValue.name]: 0
                          });
                        }}
                        style={{ background: '#3f51b5', color: 'white' }}
                        name="add"
                      >
                        <div className="btnAddrow">
                          <span>+</span>Añadir
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <br />
          <div className="titleCampo titleStyle2">Pasivos</div>
          <Grid container spacing={1}>
            <Grid item xs={6} md={12}>
              {mainFormError(errors, passivesRepresentative.name) && (
                <FormHelperText error={!!errors}>
                  {mainFormError(errors, passivesRepresentative.name)}
                </FormHelperText>
              )}
              <FieldArray
                key={passivesRepresentative.name}
                name={passivesRepresentative.name}
                render={(arrayHelpers) => (
                  <div>
                    <div className={'inline-container'}>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {passivesRepresentative.childItem.passiveDetail.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20'
                        }
                      >
                        {passivesRepresentative.childItem.passiveValue.label}
                      </div>
                      <div
                        className={
                          'inline-container-item inline-container-title width-20 actions'
                        }
                      ></div>
                    </div>
                    {values.passivesRepresentative &&
                      values.passivesRepresentative.length > 0 &&
                      values.passivesRepresentative.map(
                        (item: any, index: number) => (
                          <div
                            key={`${passivesRepresentative.name}.${index}.${passivesRepresentative.childItem.passiveDetail.name}`}
                            className={'inline-container'}
                          >
                            <div
                              className={
                                'inline-container-item inline-container-title width-20'
                              }
                            >
                              <SelectField
                                name={`${passivesRepresentative.name}.${index}.${passivesRepresentative.childItem.passiveDetail.name}`}
                                value={item.passiveDetail}
                                options={externalData.listPassives}
                                itemKey={'ITC_ID'}
                                itemLabel={'ITC_NOMBRE'}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item btnSizeM inline-container-title width-20'
                              }
                            >
                              <MoneyField
                                placeholder="$ 0.00"
                                type="text"
                                name={`${passivesRepresentative.name}.${index}.${passivesRepresentative.childItem.passiveValue.name}`}
                                value={item.passiveValue}
                              />
                            </div>
                            <div
                              className={
                                'inline-container-item inline-container-title width-20 leftAlign'
                              }
                            >
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
                        className="btnMargin"
                        onClick={() => {
                          arrayHelpers.push({
                            [passivesRepresentative.childItem.passiveDetail
                              .name]: '',
                            [passivesRepresentative.childItem.passiveValue
                              .name]: 0
                          });
                        }}
                        style={{ background: '#3f51b5', color: 'white' }}
                        name="add"
                      >
                        <div className="btnAddrow">
                          <span>+</span>Añadir
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6} md={4}>
              <InputField
                name={activeTotalRepresentative.name}
                label={activeTotalRepresentative.label}
                readOnly
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <InputField
                name={passivesTotalRepresentative.name}
                label={passivesTotalRepresentative.label}
                readOnly
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <InputField
                name={patrimonyTotalRepresentative.name}
                label={patrimonyTotalRepresentative.label}
                readOnly
              />
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};

export default FinancialForm;
