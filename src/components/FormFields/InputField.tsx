import { useField } from 'formik';
import React from 'react';
import HelpComponent from '@/content/HelpComponent';
import { normalizeLabel } from '../../../helpers/Utils';

const InputField = (props: any) => {
  const { type, label, help, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched, setError } = helpers;

  const typeValue = type ? type : 'text';
  const setFieldProps = (e: any) => {
    let value = e.target.value ? e.target.value.toUpperCase() : '';
    setValue(value);
    setTouched(false);
    setError(undefined);
  };

  return (
    <>
      <div
        className={`label ${meta.touched && meta.error ? 'error-border' : ''}`}
      >
        {label && (
          <div id={`id_${label}`} className="titleCampo">
            {label}
            {help != undefined && <HelpComponent code={help} />}
          </div>
        )}
        <input
          type={typeValue}
          placeholder={normalizeLabel(label)}
          {...field}
          {...props}
          {...rest}
          onChange={setFieldProps}
          onFocus={() => {
            setTouched(false);
          }}
        />
        {meta.touched && meta.error ? (
          <span className="error">*{meta.error}</span>
        ) : null}
      </div>
    </>
  );
};

export default InputField;
