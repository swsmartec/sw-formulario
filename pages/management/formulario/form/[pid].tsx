import LegalForm from '@/content/LegalForm/index';
import NaturalForm from '@/content/NaturalForm/index';
import TrustForm from '@/content/TrustForm/index';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { get } from '../../../../helpers/service';
import { Config } from '../../../../constants/default';

function FormView() {
  const router = useRouter();
  const [listValues, setListValues] = React.useState<any>({});
  const [tipoformulario, setTipoFormulario] =
    React.useState<string>('PersonaNatural');
  const [keyStorage, setKeyStorage] = React.useState<string>('PersonaNatural');
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const { pid } = router.query;
  React.useEffect(() => {
    const getData = async () => {
      let listFormulary: any;
      const wsTypeIdentifier = await get(`Formulario/obtener(${pid})`);
      listFormulary = wsTypeIdentifier;
      return listFormulary;
    };
    if (!router.isReady) {
      return;
    }
    getData().then((resp) => {
      const listFormulary = resp;
      setListValues(JSON.parse(listFormulary.DetalleFormulario));
      if (listFormulary.TipoFormulario) {
        setTipoFormulario(listFormulary.TipoFormulario?.Valor);
        setKeyStorage(listFormulary.TipoFormulario?.Valor + pid);
      }
      setShowForm(true);
    });
  }, [pid]);

  return (
    <>
      <Head>
        <title>Editar formulario :: {Config.TitleSite}</title>
      </Head>
      <Container maxWidth="lg">
        <div>
          {showForm && tipoformulario == 'PersonaNatural' ? (
            <NaturalForm keyStorage={keyStorage} valuesForm={listValues} />
          ) : null}
          {showForm && tipoformulario == 'PersonaJuridica' ? (
            <LegalForm keyStorage={keyStorage} valuesForm={listValues} />
          ) : null}
          {showForm && tipoformulario == 'Fideicomisos' ? (
            <TrustForm keyStorage={keyStorage} valuesForm={listValues} />
          ) : null}
        </div>
      </Container>
    </>
  );
}

FormView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default FormView;
