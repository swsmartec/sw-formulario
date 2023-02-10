import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Formulario/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Footer from '@/components/Footer';
import { FormularioProvider } from '@/contexts/FormularioContext';
import DetailFormulario from '@/content/Management/Formulario/DetailFormulario';
import { Config } from '../../../../constants/default';
import React from 'react';

function DetailView() {
  return (
    <FormularioProvider>
      <Head>
        <title>Detalle de formulario :: {Config.TitleSite}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <DetailFormulario />
      <Footer />
    </FormularioProvider>
  );
}

DetailView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DetailView;
