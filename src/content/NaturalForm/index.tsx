import { Button, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { BaseFormProps, BaseFormRequest, BaseStep } from 'interfaces/base';
import React, { useState } from 'react';
import { apiFormSave } from '../../../constants/api';
import { useLocalStorageState } from '../../../helpers/localStorageState';
import { post } from '../../../helpers/service';
import useStyles from '../../components/FormFields/styles';
import SuccessComponent from '../SuccessComponent';
import {
  DocumentationForm,
  FinancialForm,
  GeneralForm,
  PEPForm,
  ReferenceForm,
  ResidencyForm
} from './Forms';
import { formModel, validationSchema } from './Model';
import { Constants } from '../../../constants/default';

export const NaturalForm = (props: BaseFormProps) => {
  const { keyStorage, valuesForm } = props;
  const { formId, formField } = formModel;
  const classes = useStyles();

  const listSteps: BaseStep[] = [
    {
      title: 'Información General',
      icon: require('../../../assets/images/ic_01.svg').default
    },
    {
      title: 'Información de Residencia',
      icon: require('../../../assets/images/ic_02.svg').default
    },
    {
      title: 'Información Financiera',
      icon: require('../../../assets/images/ic_03.svg').default
    },
    {
      title: 'Referencias Bancarias',
      icon: require('../../../assets/images/ic_04.svg').default
    },
    {
      title: 'PEPS',
      icon: require('../../../assets/images/ic_05.svg').default
    },
    {
      title: 'Documentos Habilitantes',
      icon: require('../../../assets/images/ic_06.svg').default
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === listSteps.length - 1;

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: keyStorage,
    value: valuesForm
  });

  const transformDataNew = (_values: object) => {
    let identifierValue = _values[formField.identifier.name];
    let fullNameValue =
      _values[formField.firstName.name] +
      ' ' +
      _values[formField.secondName.name] +
      ' ' +
      _values[formField.surname.name] +
      ' ' +
      _values[formField.secondSurname.name];
    let detailValue = JSON.stringify(_values);
    return {
      Identificacion: identifierValue,
      RazonSocial: fullNameValue,
      DetalleFormulario: detailValue,
      TipoFormularioId: Constants.CodeTipoFormularioNatural,
      EstadoId: Constants.CodeEstadoCreado
    } as BaseFormRequest;
  };

  const _sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const _submitForm = (_values: any, actions: any) => {
    let dataSend = transformDataNew(_values);
    post(apiFormSave, dataSend)
      .then(() => {
        actions.setSubmitting(false);
        setActiveStep(activeStep + 1);
        handleUpdateForm(valuesForm);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _handleSubmit = async (values: any, actions: any) => {
    if (isLastStep) {
      await _sleep(1000);
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const _handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const _renderStepContent = (indexStep: number, handleUpdateForm: any) => {
    switch (indexStep) {
      case 0:
        return (
          <GeneralForm
            formField={formField}
            handleUpdateForm={handleUpdateForm}
          />
        );
      case 1:
        return (
          <ResidencyForm
            formField={formField}
            handleUpdateForm={handleUpdateForm}
          />
        );
      case 2:
        return (
          <FinancialForm
            formField={formField}
            handleUpdateForm={handleUpdateForm}
          />
        );
      case 3:
        return (
          <ReferenceForm
            formField={formField}
            handleUpdateForm={handleUpdateForm}
          />
        );
      case 4:
        return (
          <PEPForm formField={formField} handleUpdateForm={handleUpdateForm} />
        );
      case 5:
        return (
          <DocumentationForm
            formField={formField}
            handleUpdateForm={handleUpdateForm}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <React.Fragment>
      <div className="main">
        <div className="contentContainer">
          <div className="leftContent">
            <div className="Scriptcontent">
              {listSteps.map((label: BaseStep, index: number) => (
                <div
                  key={label.title}
                  className={`step ${activeStep >= index ? 'step-active' : ''}`}
                >
                  <div>
                    <div className="circle">
                      <img
                        src={label.icon}
                        alt={label.title}
                        title={label.title}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="title">Paso {index + 1}</div>
                    <div className="caption">{label.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rightContent">
            <div className={'contenido'}>
              <React.Fragment>
                {activeStep === listSteps.length ? (
                  <SuccessComponent />
                ) : (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={currentValidationSchema}
                    onSubmit={_handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form id={formId}>
                        {_renderStepContent(activeStep, handleUpdateForm)}
                        <div className="buttonContainer">
                          {activeStep !== 0 && (
                            <Button
                              onClick={_handleBack}
                              className={classes.button}
                            >
                              Anterior
                            </Button>
                          )}

                          <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            {isLastStep ? 'Guardar' : 'Siguiente'}
                          </Button>
                          {isSubmitting && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NaturalForm;
