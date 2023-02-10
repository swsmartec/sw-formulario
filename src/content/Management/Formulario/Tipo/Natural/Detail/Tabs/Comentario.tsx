import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { FormularioContext } from '@/contexts/FormularioContext';

function ComentarioTab() {
  const { selectedResult } = useContext(FormularioContext);

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
                Comentarios Oficial de Cumplimiento
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
                  <Box>{selectedResult.Observaciones}</Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ComentarioTab;
