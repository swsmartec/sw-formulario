import { useField } from 'formik';
import React from 'react';
import Select from 'react-select';
import { normalizeLabel } from '../../../helpers/Utils';
// import HelpComponent from '../Components/HelpComponent';

export const MultiSelectField = (props: any) => {
  const { label, options, itemKey, itemLabel, help, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched, setError } = helpers;
  let isMulti = true;

  const setFieldProps = (selectedOption: any) => {
    let listValues = selectedOption
      ? selectedOption.map((item: any) => item[itemKey])
      : [];
    setValue(listValues);
    setTouched(false);
    setError(undefined);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option: any) => field.value.indexOf(option[itemKey]) >= 0
          )
        : options.find((option: any) => option[itemKey] === field.value);
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  return (
    <>
      <div
        className={`label ${meta.touched && meta.error ? 'error-border' : ''}`}
      >
        {label && (
          <div id={`id_${label}`} className="titleCampo">
            {label}
            {/*{help != undefined && <HelpComponent code={help}/>}*/}
          </div>
        )}
        <Select
          {...field}
          {...props}
          {...rest}
          isMulti={true}
          className={'select-custom'}
          placeholder={normalizeLabel(label)}
          options={options}
          value={getValue()}
          onChange={setFieldProps}
          onBlur={setTouched}
          getOptionLabel={(option: any) => option[itemLabel]}
          getOptionValue={(option: any) => option[itemKey]}
        />
        {meta.touched && meta.error ? (
          <span className="error">*{meta.error}</span>
        ) : null}
      </div>
    </>
  );
};

export default MultiSelectField;
