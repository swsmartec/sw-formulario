import { useField } from 'formik';
import React from 'react';
import HelpComponent from '@/content/HelpComponent';
import { normalizeLabel } from '../../../helpers/Utils';

const EmailField = (props: any) => {
  const { label, help, ...rest } = props;
  const [field, meta] = useField(props);
  return (
    <>
      <div
        className={`label ${meta.touched && meta.error ? 'error-border' : ''}`}
      >
        <div id={`id_${label}`} className="titleCampo">
          {label}
          {help != undefined && <HelpComponent code={help} />}
        </div>
        <input
          type={'email'}
          placeholder={normalizeLabel(label)}
          {...field}
          {...props}
          {...rest}
        />
        {meta.touched && meta.error ? (
          <span className="error">*{meta.error}</span>
        ) : null}
      </div>
    </>
  );
};

export default EmailField;
