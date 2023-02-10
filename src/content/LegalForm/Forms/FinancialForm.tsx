import { Grid, Table } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { apiCatalogList } from '../../../../constants/api';
import { Catalog, Constants, DataList } from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { InputField, SelectField } from '../../../components/FormFields';

export const FinancialForm = (props: any) => {
  const {
    formField: {
      economicActivity,
      companyName,
      companyPosition,
      companyAddress,
      ruc,
      rucAddress,
      typeOfActivity,
      dependentTotal,
      independentTotal,
      subTotal,
      detailExpenses,
      subtotalExpenses,
      active,
      immovables,
      furnitureVehicles,
      passives,
      mortgages,
      otherPassives,
      subtotalPassives
    }
  } = props;
  const { values } = useFormikContext<any>();

  const [isDependiente, setIsDependiente] = React.useState<any>(true);
  const [isInDependiente, setIsInDependiente] = React.useState<any>(false);

  React.useEffect(() => {
    setIsDependiente(
      values[economicActivity.name] == Constants.CodeEconomicActivityDependent
    );
    setIsInDependiente(
      values[economicActivity.name] == Constants.CodeEconomicActivityInDependent
    );
  }, [values]);

  const [externalData, setExternalData] = React.useState<any>({
    listTypeOfActivity: []
  });

  React.useEffect(() => {
    const getData = async () => {
      let listTypeOfActivity: any[];
      const wsTypeOfActivity = await post(apiCatalogList, {
        Codigo: Catalog.CodeTypeOfActivity
      });
      listTypeOfActivity = wsTypeOfActivity[Catalog.CodeTypeOfActivity];
      return { listTypeOfActivity };
    };
    getData().then((resp) => {
      const { listTypeOfActivity } = resp;
      setExternalData({ listTypeOfActivity });
    });
  }, []);

  return (
    <React.Fragment>
      <div className="titleContent">Información financiera</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <SelectField
            name={economicActivity.name}
            label={economicActivity.label}
            options={DataList.EconomicActivity}
            itemKey={'label'}
            itemLabel={'value'}
          />
        </Grid>
      </Grid>
      {isDependiente ? (
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <InputField name={companyName.name} label={companyName.label} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name={companyPosition.name}
              label={companyPosition.label}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name={companyAddress.name}
              label={companyAddress.label}
            />
          </Grid>
        </Grid>
      ) : null}
      {isInDependiente ? (
        <Grid container spacing={1}>
          <Grid item xs={12} md={7}>
            <InputField name={ruc.name} label={ruc.label} />
          </Grid>
          <Grid item xs={12} md={12}>
            <SelectField
              name={typeOfActivity.name}
              label={typeOfActivity.label}
              options={externalData.listTypeOfActivity}
              itemKey={'ITC_ID'}
              itemLabel={'ITC_NOMBRE'}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <InputField name={rucAddress.name} label={rucAddress.label} />
          </Grid>
        </Grid>
      ) : null}

      <br />
      <div className="titleContent">Ingresos y egresos mensuales</div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Table>
            <tr>
              <td style={{ textAlign: 'center' }}>DETALLE DE INGRESOS</td>
              <td style={{ textAlign: 'center' }}>VALOR</td>
            </tr>
            <tr>
              <td>Dependiente:</td>
              <td>
                <InputField name={dependentTotal.name} />
              </td>
            </tr>
            <tr>
              <td>Independiente:</td>
              <td>
                <InputField name={independentTotal.name} />
              </td>
            </tr>
            <tr>
              <td>Total ingresos US $:</td>
              <td>
                <InputField name={subTotal.name} />
              </td>
            </tr>
            <br />
            <tr>
              <td>Activos:</td>
              <td>
                <InputField name={active.name} />
              </td>
            </tr>
            <tr>
              <td>Inmuebles:</td>
              <td>
                <InputField name={immovables.name} />
              </td>
            </tr>
            <tr>
              <td>Muebles (Vehículos):</td>
              <td>
                <InputField name={furnitureVehicles.name} />
              </td>
            </tr>
          </Table>
        </Grid>
        <Grid item xs={12} md={6}>
          <Table>
            <tr>
              <td style={{ textAlign: 'center' }}>DETALLE DE EGRESOS</td>
              <td style={{ textAlign: 'center' }}>VALOR</td>
            </tr>
            <tr>
              <td>
                <InputField name={detailExpenses.name} />
              </td>
              <td>
                <InputField name={subtotalExpenses.name} />
              </td>
            </tr>
            <tr>
              <td>Total egresos US $:</td>
              <td>
                <InputField name={subTotal.name} />
              </td>
            </tr>
            <br />
            <tr>
              <td>Pasivos:</td>
              <td>
                <InputField name={passives.name} />
              </td>
            </tr>
            <tr>
              <td>Hipotecas:</td>
              <td>
                <InputField name={mortgages.name} />
              </td>
            </tr>
            <tr>
              <td>
                <InputField name={otherPassives.name} />
              </td>
              <td>
                <InputField name={subtotalPassives.name} />
              </td>
            </tr>
          </Table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FinancialForm;
