import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useField } from 'formik';

const MoneyField = (inputProps: any) => {
  const defaultMaskOptions = {
    prefix: '$ ',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false
  };

  const { type, label, help, ...rest } = inputProps;
  const [field, meta, helpers] = useField(inputProps);
  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (e: any) => {
    let value = e.target.value ? e.target.value.toUpperCase() : '';
    setValue(value.substring(2));
    setTouched(false);
    setError(undefined);
  };
  const currencyMask = createNumberMask({
    ...defaultMaskOptions
    //   ...maskOptions,
  });

  return (
    <>
      <div
        className={`label ${meta.touched && meta.error ? 'error-border' : ''}`}
      >
        <MaskedInput
          mask={currencyMask}
          {...inputProps}
          onChange={setFieldProps}
          onFocus={() => {
            setTouched(false);
          }}
        />
      </div>
      {meta.touched && meta.error ? (
        <span className="error">*{meta.error}</span>
      ) : null}
    </>
  );
};

export default MoneyField;
