import { Typography } from '@mui/material';
import React from 'react';

export const SuccessComponent = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Gracias por registrarse en PICAVAl.
      </Typography>
      <Typography variant="subtitle1">
        Su número de orden es #2001539. Hemos enviado por correo electrónico la
        confirmación de su pedido, y le enviaremos una actualización cuando su
        pedido haya sido atentido.
      </Typography>
    </React.Fragment>
  );
};

export default SuccessComponent;
