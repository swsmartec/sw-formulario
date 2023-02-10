import { Checkbox, FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useField } from 'formik';
import React from 'react';
import TerminosCondicionesComponent from '@/content/TerminosCondicionesComponent';

const CheckboxField = (props: any) => {
  const { label, help, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return (
    <FormControl {...rest} sx={{ display: 'inline-block' }}>
      <div
        id={`id_${label}`}
        className="titleCampo"
        style={{ float: 'right', paddingTop: '12px' }}
      >
        <TerminosCondicionesComponent />
      </div>
      <FormControlLabel
        value={field.value}
        checked={field.value}
        control={<Checkbox {...field} onChange={_onChange} />}
        label={label}
        sx={{ marginRight: '4px' }}
      />
      {meta.touched && meta.error ? (
        <div className="error">*{meta.error}</div>
      ) : null}
    </FormControl>
  );
};

export default CheckboxField;
