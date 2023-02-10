import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { apiFormSave } from '../../../constants/api';
import { useLocalStorageState } from '../../../helpers/localStorageState';
import { post } from '../../../helpers/service';
import { BaseFormProps, BaseStep } from '../../../interfaces/base';
import useStyles from '../../components/FormFields/styles';
import SuccessComponent from '../SuccessComponent';
import {
  DocumentationForm,
  GeneralForm,
  ResidencyForm,
  SriForm
} from './Forms';
import { formModel, validationSchema } from './Model';
import { Constants } from '../../../constants/default';

export const LegalForm = (props: BaseFormProps) => {
  const { keyStorage, valuesForm } = props;
  const { formId, formField } = formModel;
  const classes = useStyles();

  const listSteps: BaseStep[] = [
    {
      title: 'Información de la institución',
      icon: require('../../../assets/images/ic_01.svg').default
    },
    {
      title: 'Información de Residencia',
      icon: require('../../../assets/images/ic_02.svg').default
    },
    {
      title: 'Información del SRI',
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
    let fullNameValue = _values[formField.businessName.name];
    let detailValue = JSON.stringify(_values);
    return {
      Identificacion: identifierValue,
      RazonSocial: fullNameValue,
      DetalleFormulario: detailValue,
      TipoFormularioId: Constants.CodeTipoFormularioFideicomisos,
      EstadoId: Constants.CodeEstadoCreado
    } as any;
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
          <SriForm formField={formField} handleUpdateForm={handleUpdateForm} />
        );
      case 3:
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
              {listSteps.map((label, index) => (
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
                        <div className={classes.buttons}>
                          {activeStep !== 0 && (
                            <Button
                              onClick={_handleBack}
                              className={classes.button}
                            >
                              Anterior
                            </Button>
                          )}
                          <div className={classes.wrapper}>
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

export default LegalForm;
