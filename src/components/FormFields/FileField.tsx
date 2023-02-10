import { useField } from 'formik';
import React from 'react';
import { normalizeLabel } from '../../../helpers/Utils';

const FileField = (props: any) => {
  const { label, help, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched, setError } = helpers;

  const [postImage, setPostImage]: any = React.useState({ myFile: '' });
  const [size, setSize] = React.useState(undefined);
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 1) {
      setTouched(true);
      setError('File size exceeds 1 MiB');
      setSize(`${fileSize.toFixed(2)} MiB`);
    } else {
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, myFile: base64 });
      setValue(base64);
      setTouched(true);
      setError(undefined);
      setSize(undefined);
    }
  };
  return (
    <>
      <div
        className={`label ${meta.touched && meta.error ? 'error-border' : ''}`}
      >
        <div id={`id_${label}`} className="titleCampo">
          {label}
        </div>
        <input
          type={'file'}
          onChange={handleFileUpload}
          accept="image/jpeg,image/jpg,image/png,application/pdf"
        />
        {size ? <span>Tamaño: {size}</span> : null}
        <input
          type={'hidden'}
          placeholder={normalizeLabel(label)}
          {...field}
          {...props}
          {...rest}
          value={postImage.myFile}
        />
        {meta.touched && meta.error ? (
          <span className="error">*{meta.error}</span>
        ) : null}
      </div>
    </>
  );
};

export default FileField;
