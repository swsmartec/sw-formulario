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
import { formatDate, normalizeLabel } from 'helpers/Utils';
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

function PEPSTab() {
  const { selectedResult } = useContext(FormularioContext);
  const { ObjectDetalle } = selectedResult;
  const {
    formField: {
      vowPEP,
      positionPEP,
      functionPEP,
      dateStartPEP,
      dateEndPEP,
      linkUpPEP,
      detailPEP
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

  const FieldDate = (FieldProps: IBaseFieldProps) => {
    let { field } = FieldProps;
    let value = ObjectDetalle[field.name];
    if (value) {
      let newDate = new Date(value);
      return <b>{formatDate(newDate)}</b>;
    }
    return <></>;
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
                Información figura políticamente expuesta (PEP´S)
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
                  <Box>
                    Declaro bajo juramento que me encuentro/ encontraba
                    ejerciendo un cargo público.
                  </Box>
                  <Text color="black">
                    <Field field={vowPEP} />
                  </Text>
                </Grid>
                {ObjectDetalle[vowPEP.name] == 'SI' && (
                  <>
                    <FieldBase field={positionPEP}>
                      <Field field={positionPEP} />
                    </FieldBase>
                    <FieldBase field={functionPEP}>
                      <Field field={functionPEP} />
                    </FieldBase>
                    <FieldBase field={dateStartPEP}>
                      <FieldDate field={dateStartPEP} />
                    </FieldBase>
                    <FieldBase field={dateEndPEP}>
                      <FieldDate field={dateEndPEP} />
                    </FieldBase>
                  </>
                )}
                <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
                  <Box>
                    Adicionalmente declaro que mantengo ó mantuve vinculación
                    comercial, contractual, laboral, familiar, dentro del
                    segundo grado de consanguinidad o primero de afinidad o se
                    encuentra asociado a cualquier otra forma con una persona
                    que ejerce cargo público.
                  </Box>
                  <Text color="black">
                    <Field field={linkUpPEP} />
                  </Text>
                </Grid>
                {ObjectDetalle[linkUpPEP.name] == 'SI' && (
                  <FieldBase field={detailPEP}>
                    <Field field={detailPEP} />
                  </FieldBase>
                )}
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PEPSTab;
