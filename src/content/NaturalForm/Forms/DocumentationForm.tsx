import { FormHelperText, Grid } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { FileField } from '../../../components/FormFields';
import { BaseFormProps } from '../../../../interfaces/forms';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';

export const DocumentationForm = (props: BaseFormProps) => {
  const {
    formField: { files },
    handleUpdateForm
  } = props;
  const { childItem } = files;
  const { values, errors } = useFormikContext<any>();

  const mainFormError = (_errors: any, name: string) => {
    return (
      _errors &&
      _errors[name] &&
      typeof _errors[name] !== 'object' &&
      _errors[name]
    );
  };

  const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    return new File([uint8Array], fileName, { type: mime });
  };

  const downloadBase64Data = (base64String, fileName) => {
    let file = convertBase64ToFile(base64String, fileName);
    saveAs(file, fileName);
  };

  React.useEffect(() => {
    handleUpdateForm(values);
  }, [values]);

  return (
    <React.Fragment>
      <div className="titleContent">Adjuntar la siguiente documentación</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1} className="cstGrid styleMov3">
        <FormHelperText error={!!errors}>
          {mainFormError(errors, files.name)}
        </FormHelperText>

        <FieldArray
          key={files.name}
          name={files.name}
          render={(_arrayHelpers) => (
            <div>
              {values.files &&
                values.files.length > 0 &&
                values.files.map((item: any, index: number) => (
                  <Grid
                    key={`${files.name}.${index}.${childItem.fileName.name}`}
                    item
                    xs={12}
                    md={12}
                  >
                    <FileField
                      name={`${files.name}.${index}.${childItem.file.name}`}
                      label={item.fileName}
                    />
                    {item.file ? (
                      <Button
                        sx={{ mb: 1.5 }}
                        variant="contained"
                        size={'small'}
                        onClick={() => {
                          downloadBase64Data(item.file, item.fileName);
                        }}
                        name="close"
                      >
                        Descargar archivo
                      </Button>
                    ) : null}
                    <br />
                  </Grid>
                ))}
            </div>
          )}
        />
      </Grid>
    </React.Fragment>
  );
};

export default DocumentationForm;
