import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import GridFormulario from '@/content/Management/Formulario/GridFormulario';
import HeaderFormulario from '@/content/Management/Formulario/HeaderFormulario';
import { FormularioProvider } from '@/contexts/FormularioContext';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Card, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Config } from 'constants/default';

function View() {
  return (
    <FormularioProvider>
      <Head>
        <title>Formulario :: {Config.TitleSite}</title>
      </Head>
      <PageTitleWrapper>
        <HeaderFormulario />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <GridFormulario />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </FormularioProvider>
  );
}

View.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default View;
