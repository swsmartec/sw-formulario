import { Grid, Tab, Tabs } from '@mui/material';
import {
  StepperNatural,
  StepperNaturalCode
} from '../../../../../../../constants/stepper';
import { ChangeEvent, useState } from 'react';
import { styled } from '@mui/material/styles';
import GeneralTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/General';
import FinancieroTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/Financiero';
import ReferenciasTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/Referencias';
import PEPSTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/PEPS';
import DocumentacionTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/Documentacion';
import EnvioTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/Envio';
import ComentarioTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/Comentario';
import ListaNegraTab from '@/content/Management/Formulario/Tipo/Natural/Detail/Tabs/ListaNegra';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const NaturalDetailView = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    StepperNaturalCode.General
  );

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <TabsWrapper
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {StepperNatural.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabsWrapper>
      </Grid>
      <Grid item xs={12}>
        {currentTab === StepperNaturalCode.General && <GeneralTab />}
        {currentTab === StepperNaturalCode.Financiera && <FinancieroTab />}
        {currentTab === StepperNaturalCode.Referencias && <ReferenciasTab />}
        {currentTab === StepperNaturalCode.Peps && <PEPSTab />}
        {currentTab === StepperNaturalCode.Documentos && <DocumentacionTab />}
        {currentTab === StepperNaturalCode.Comentario && <ComentarioTab />}
        {currentTab === StepperNaturalCode.ListaNegra && <ListaNegraTab />}
        {currentTab === StepperNaturalCode.Envio && <EnvioTab />}
      </Grid>
    </Grid>
  );
};

export default NaturalDetailView;
