import { useField } from 'formik';
import React from 'react';
import Select from 'react-select';
import HelpComponent from '@/content/HelpComponent';
import { normalizeLabel } from '../../../helpers/Utils';

export const SelectField = (props: any) => {
  const { label, options, itemKey, itemLabel, help, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (selectedOption: any) => {
    setValue(selectedOption[itemKey]);
    setTouched(false);
    setError(undefined);
  };

  let labelValue = label ? label : 'Seleccionar..';

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
        <Select
          className={'select-custom'}
          placeholder={normalizeLabel(labelValue)}
          {...field}
          {...props}
          {...rest}
          value={
            options
              ? options.find((option: any) => {
                  return option[itemKey] === field.value;
                })
              : ''
          }
          getOptionLabel={(option: any) => option[itemLabel]}
          getOptionValue={(option: any) => option[itemKey]}
          onChange={(option: any) => setFieldProps(option)}
          onBlur={setTouched}
        />
        {meta.touched && meta.error ? (
          <span className="error">*{meta.error}</span>
        ) : null}
      </div>
    </>
  );
};

export default SelectField;
