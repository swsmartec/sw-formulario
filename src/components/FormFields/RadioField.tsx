import { Field, useField } from 'formik';
import React from 'react';
import HelpComponent from '@/content/HelpComponent';

const RadioField = (props: any) => {
  const { label, options, itemKey, itemLabel, help, ...rest } = props;
  const [field, meta] = useField(props);
  return (
    <div className={'label'}>
      <div id={`id_${label}`} className="titleCampo">
        {label}
        {help != undefined && <HelpComponent code={help} />}
      </div>
      <div role="group" aria-labelledby={`id_${label}`}>
        {options.map((item: any) => {
          return (
            <label
              style={{ marginRight: '5px' }}
              className="simple"
              key={item[itemKey]}
            >
              <Field
                type="radio"
                name={field.name}
                value={`${item[itemKey]}`}
                style={{ marginRight: '5px' }}
              />
              {item[itemLabel]}
            </label>
          );
        })}
      </div>
      {meta.touched && meta.error ? (
        <span className="error">*{meta.error}</span>
      ) : null}
    </div>
  );
};

export default RadioField;
