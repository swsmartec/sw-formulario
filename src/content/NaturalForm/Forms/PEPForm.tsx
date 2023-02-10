import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { DataList } from '../../../../constants/default';
import { BaseFormProps } from '../../../../interfaces/forms';
import {
  DatePickerField,
  InputField,
  RadioField
} from '../../../components/FormFields';
import HelpComponent from '@/content/HelpComponent';

export const PEPForm = (props: BaseFormProps) => {
  const {
    formField: {
      vowPEP,
      positionPEP,
      functionPEP,
      dateStartPEP,
      dateEndPEP,
      linkUpPEP,
      detailPEP
    },
    handleUpdateForm
  } = props;
  const { values } = useFormikContext<any>();

  React.useEffect(() => {
    handleUpdateForm(values);
  }, [values]);

  return (
    <React.Fragment>
      <div className="titleContent">
        Información figura políticamente expuesta (PEP´S){' '}
        <HelpComponent code={'peps'} />
      </div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          Declaro bajo juramento que me encuentro/ encontraba ejerciendo un
          cargo público.
          <RadioField
            name={vowPEP.name}
            options={DataList.YesOrNo}
            itemKey={'label'}
            itemLabel={'value'}
          />
        </Grid>
        {values[vowPEP.name] == 'SI' && (
          <>
            <Grid item xs={12} md={6}>
              <InputField name={positionPEP.name} label={positionPEP.label} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField name={functionPEP.name} label={functionPEP.label} />
            </Grid>
            <Grid item xs={12} md={6} className="cstSpace">
              <DatePickerField
                name={dateStartPEP.name}
                label={dateStartPEP.label}
              />
            </Grid>
            <Grid item xs={12} md={6} className="cstSpace">
              <DatePickerField
                name={dateEndPEP.name}
                label={dateEndPEP.label}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} md={12}>
          Adicionalmente declaro que mantengo ó mantuve vinculación comercial,
          contractual, laboral, familiar, dentro del segundo grado de
          consanguinidad o primero de afinidad o se encuentra asociado a
          cualquier otra forma con una persona que ejerce cargo público.
          <RadioField
            name={linkUpPEP.name}
            options={DataList.YesOrNo}
            itemKey={'label'}
            itemLabel={'value'}
          />
        </Grid>
        {values[linkUpPEP.name] == 'SI' && (
          <Grid item xs={12} md={12} className="topSpace">
            Por favor detallar el nombre de la persona jurídica o natural y
            cargo:
            <InputField name={detailPEP.name} label={detailPEP.label} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PEPForm;
