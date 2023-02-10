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

function ListaNegraTab() {
  const { selectedResult } = useContext(FormularioContext);

  const PrettyJson = ({ data }: any) => {
    let objectData = JSON.parse(data);

    return (
      <div>
        <p>IsPep: {objectData['IsPep'] ? 'SI' : 'NO'}</p>
        <p>IsBackList: {objectData['IsBackList'] ? 'SI' : 'NO'}</p>
        <p>strBlackList: {objectData['strBlackList']}</p>
      </div>
    );
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
                Lista Negras
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
                  {selectedResult.DetalleListaNegras != null &&
                  selectedResult.DetalleListaNegras != undefined &&
                  selectedResult.DetalleListaNegras != '' ? (
                    <PrettyJson data={selectedResult?.DetalleListaNegras} />
                  ) : null}
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ListaNegraTab;
