import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import Text from '@/components/Text';
import { formModel } from '@/content/NaturalForm/Model';
import {
  formatDate,
  getValueCatalog,
  getValueMultiCatalog,
  hasRepresentative,
  hasSpouse,
  normalizeLabel
} from 'helpers/Utils';
import { ReactNode, useContext } from 'react';
import { FormularioContext } from '@/contexts/FormularioContext';

interface IField {
  label: string;
  name: string;
}

interface IBaseFieldProps {
  field: IField;
}

interface IFieldProps extends IBaseFieldProps {
  xs?: number;
  sm?: number;
  children: ReactNode;
}

function GeneralTab() {
  const { selectedResult, listCatalogoServicio } =
    useContext(FormularioContext);
  const { ObjectDetalle } = selectedResult;
  const {
    formField: {
      representative,
      typeIdentifier,
      identifier,
      surname,
      secondSurname,
      firstName,
      secondName,
      email,
      cellPhone,
      nationality,
      birthDate,
      maritalStatus,
      country,
      province,
      canton,
      landline,
      address,
      residence,

      identifierSpouse,
      lastNameSpouse,
      firstNameSpouse,
      nationalitySpouse,

      typeIdentifierRepresentative,
      identifierRepresentative,
      surnameRepresentative,
      secondSurnameRepresentative,
      firstNameRepresentative,
      secondNameRepresentative,
      emailRepresentative,
      cellPhoneRepresentative,
      nationalityRepresentative,
      birthDateRepresentative,
      countryRepresentative,
      provinceRepresentative,
      cantonRepresentative,
      landlineRepresentative,
      addressRepresentative,
      residenceRepresentative
    }
  } = formModel;

  const FieldBase = (FieldProps: IFieldProps) => {
    let { field, xs, sm, children } = FieldProps;
    return (
      <Grid item xs={xs ?? 12} sm={sm ?? 6} sx={{ pb: 1 }}>
        <Box>{normalizeLabel(field.label)}:</Box>
        <Text color="black">{children}</Text>
      </Grid>
    );
  };

  const Field = (FieldProps: IBaseFieldProps) => {
    let { field } = FieldProps;
    return <b>{ObjectDetalle[field.name]}</b>;
  };

  const FieldCatalog = (FieldProps: IBaseFieldProps) => {
    let { field } = FieldProps;
    let value = getValueCatalog(field, ObjectDetalle, listCatalogoServicio);
    if (value === 0) return <></>;
    return <b>{value}</b>;
  };

  const FieldDate = (FieldProps: IBaseFieldProps) => {
    let { field } = FieldProps;
    let value = ObjectDetalle[field.name];
    if (value) {
      let newDate = new Date(value);
      return <b>{formatDate(newDate)}</b>;
    }
    return <></>;
  };

  const FieldMultiCatalog = (FieldProps: IBaseFieldProps) => {
    let { field } = FieldProps;
    let value = getValueMultiCatalog(
      field,
      ObjectDetalle,
      listCatalogoServicio
    );
    return <b>{value}</b>;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Información del cliente
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <FieldBase field={nationality}>
                  <FieldMultiCatalog field={nationality} />
                </FieldBase>
                <FieldBase field={identifier}>
                  <FieldCatalog field={typeIdentifier} />:{' '}
                  <Field field={identifier} />
                </FieldBase>
                <FieldBase field={surname}>
                  <Field field={surname} />
                </FieldBase>
                <FieldBase field={secondSurname}>
                  <Field field={secondSurname} />
                </FieldBase>
                <FieldBase field={firstName}>
                  <Field field={firstName} />
                </FieldBase>
                <FieldBase field={secondName}>
                  <Field field={secondName} />
                </FieldBase>
                <FieldBase field={maritalStatus}>
                  <FieldCatalog field={maritalStatus} />
                </FieldBase>
                <FieldBase field={birthDate}>
                  <FieldDate field={birthDate} />
                </FieldBase>
                <FieldBase field={email}>
                  <Field field={email} />
                </FieldBase>
                <FieldBase field={cellPhone}>
                  <Field field={cellPhone} />
                </FieldBase>
                <FieldBase field={landline}>
                  <Field field={landline} />
                </FieldBase>
                <FieldBase field={residence}>
                  <FieldCatalog field={residence} />
                </FieldBase>
                <FieldBase field={country}>
                  <FieldCatalog field={country} />
                </FieldBase>
                <FieldBase field={province}>
                  <FieldCatalog field={province} />
                </FieldBase>
                <FieldBase field={canton}>
                  <FieldCatalog field={canton} />
                </FieldBase>
                <FieldBase field={address}>
                  <Field field={address} />
                </FieldBase>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {hasSpouse(ObjectDetalle[maritalStatus.name]) && (
        <Grid item xs={12}>
          <Card>
            <Box
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Información del cónyuge
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <FieldBase field={nationalitySpouse}>
                    <FieldCatalog field={nationalitySpouse} />
                  </FieldBase>
                  <FieldBase field={identifierSpouse}>
                    <Field field={identifierSpouse} />
                  </FieldBase>
                  <FieldBase field={lastNameSpouse}>
                    <Field field={lastNameSpouse} />
                  </FieldBase>
                  <FieldBase field={firstNameSpouse}>
                    <Field field={firstNameSpouse} />
                  </FieldBase>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {hasRepresentative(ObjectDetalle[representative.name]) && (
        <Grid item xs={12}>
          <Card>
            <Box
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Información del representante legal o apoderado
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <FieldBase field={nationalityRepresentative}>
                    <FieldCatalog field={nationalityRepresentative} />
                  </FieldBase>
                  <FieldBase field={identifierRepresentative}>
                    <FieldCatalog field={typeIdentifierRepresentative} />:{' '}
                    <Field field={identifierRepresentative} />
                  </FieldBase>
                  <FieldBase field={surnameRepresentative}>
                    <Field field={surnameRepresentative} />
                  </FieldBase>
                  <FieldBase field={secondSurnameRepresentative}>
                    <Field field={secondSurnameRepresentative} />
                  </FieldBase>
                  <FieldBase field={firstNameRepresentative}>
                    <Field field={firstNameRepresentative} />
                  </FieldBase>
                  <FieldBase field={secondNameRepresentative}>
                    <Field field={secondNameRepresentative} />
                  </FieldBase>
                  <FieldBase field={birthDateRepresentative}>
                    <FieldDate field={birthDateRepresentative} />
                  </FieldBase>
                  <FieldBase field={emailRepresentative}>
                    <Field field={emailRepresentative} />
                  </FieldBase>
                  <FieldBase field={cellPhoneRepresentative}>
                    <Field field={cellPhoneRepresentative} />
                  </FieldBase>
                  <FieldBase field={landlineRepresentative}>
                    <Field field={landlineRepresentative} />
                  </FieldBase>
                  <FieldBase field={residenceRepresentative}>
                    <FieldCatalog field={residenceRepresentative} />
                  </FieldBase>
                  <FieldBase field={countryRepresentative}>
                    <FieldCatalog field={countryRepresentative} />
                  </FieldBase>
                  <FieldBase field={provinceRepresentative}>
                    <FieldCatalog field={provinceRepresentative} />
                  </FieldBase>
                  <FieldBase field={cantonRepresentative}>
                    <FieldCatalog field={cantonRepresentative} />
                  </FieldBase>
                  <FieldBase field={addressRepresentative}>
                    <Field field={addressRepresentative} />
                  </FieldBase>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default GeneralTab;
