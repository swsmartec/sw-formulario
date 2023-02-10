import { Grid, Typography } from '@mui/material';

function HeaderFormulario() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Formulario
        </Typography>
        <Typography variant="subtitle2">
          Estos son sus formularios recientes
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HeaderFormulario;
