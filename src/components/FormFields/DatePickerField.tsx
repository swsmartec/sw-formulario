import { useField } from 'formik';
import React from 'react';
import HelpComponent from '@/content/HelpComponent';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

export const DatePickerField = (props: any) => {
  const { label, help, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched, setError } = helpers;
  const { value } = meta;
  const setFieldProps = (newValue: any) => {
    setValue(newValue);
    setTouched(false);
    setError(undefined);
  };

  return (
    <>
      <div
        className={`date-picker-form label ${
          meta.touched && meta.error ? 'error-border' : ''
        }`}
      >
        <div id={`id_${label}`} className="titleCampo">
          {label}
          {help != undefined && <HelpComponent code={help} />}
        </div>
        <DatePicker
          value={value}
          inputFormat={'dd/MM/yyyy'}
          onChange={(newValue) => {
            setFieldProps(newValue);
          }}
          renderInput={(params) => (
            <TextField
              className="date-picker-input"
              {...params}
              {...field}
              {...props}
              {...rest}
              label={''}
              fullWidth
              inputProps={{
                ...params.inputProps,
                placeholder: 'dd/mm/aaaa'
              }}
            />
          )}
        />

        {meta.touched && meta.error ? (
          <div className="error">*{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default DatePickerField;
