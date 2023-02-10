import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TableContainer,
  Typography
} from '@mui/material';
import Text from '@/components/Text';
import { formModel } from '@/content/NaturalForm/Model';
import {
  getCatalog,
  getValueCatalog,
  normalizeLabel,
  range
} from 'helpers/Utils';
import { useContext } from 'react';
import { FormularioContext } from '@/contexts/FormularioContext';
import { IBaseFieldProps, IFieldProps } from 'interfaces/Formulario';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface ITableProps {
  index: number;
}

function FinancieroTab() {
  const { selectedResult, listCatalogoServicio } =
    useContext(FormularioContext);
  const { ObjectDetalle } = selectedResult;
  const {
    formField: {
      representative,
      economicActivityDependent,
      economicActivityInDependent,
      economicActivityRetired,
      economicActivityNotWork,
      companyName,
      companyPosition,
      companyAddress,
      ruc,
      rucAddress,
      typeOfActivity,
      incomes,
      incomeTotal,
      expenses,
      expenseTotal,
      active,
      activeTotal,
      passives,
      passivesTotal,
      patrimonyTotal,
      // Apoderado
      economicActivityRepresentativeDependent,
      economicActivityRepresentativeInDependent,
      economicActivityRepresentativeRetired,
      economicActivityRepresentativeNotWork,
      companyNameRepresentative,
      companyPositionRepresentative,
      companyAddressRepresentative,
      rucRepresentative,
      rucAddressRepresentative,
      typeOfActivityRepresentative,
      incomesRepresentative,
      incomeTotalRepresentative,
      expensesRepresentative,
      expenseTotalRepresentative,
      activeRepresentative,
      activeTotalRepresentative,
      passivesRepresentative,
      passivesTotalRepresentative,
      patrimonyTotalRepresentative
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

  const FieldCatalog = (FieldProps: IBaseFieldProps) => {
    let { field } = FieldProps;
    let value = getValueCatalog(field, ObjectDetalle, listCatalogoServicio);
    return <b>{value}</b>;
  };

  let _incomes = ObjectDetalle[incomes.name];
  let _expenses = ObjectDetalle[expenses.name];
  let _active = ObjectDetalle[active.name];
  let _passives = ObjectDetalle[passives.name];

  let lenIncomes = Math.max(_incomes.length, _expenses.length);
  let lenExpenses = Math.max(_active.length, _passives.length);

  let _incomesR = ObjectDetalle[incomesRepresentative.name];
  let _expensesR = ObjectDetalle[expensesRepresentative.name];
  let _activeR = ObjectDetalle[activeRepresentative.name];
  let _passivesR = ObjectDetalle[passivesRepresentative.name];

  let lenIncomesR = Math.max(_incomesR.length, _expensesR.length);
  let lenExpensesR = Math.max(_activeR.length, _passivesR.length);

  const RenderIncomeTableRow = (TableProps: ITableProps) => {
    let { index } = TableProps;
    let income = _incomes[index];
    let expense = _expenses[index];
    return (
      <TableRow>
        <TableCell align="right">
          {getCatalog(income?.incomeDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{income?.incomeValue}</TableCell>
        <TableCell align="right">
          {getCatalog(expense?.expenseDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{expense?.expenseValue}</TableCell>
      </TableRow>
    );
  };

  const RenderExpensesTableRow = (TableProps: ITableProps) => {
    let { index } = TableProps;
    let active = _active[index];
    let passives = _passives[index];
    return (
      <TableRow>
        <TableCell align="right">
          {getCatalog(active?.activeDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{active?.activeValue}</TableCell>
        <TableCell align="right">
          {getCatalog(passives?.passiveDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{passives?.passiveValue}</TableCell>
      </TableRow>
    );
  };

  const RenderIncomeRTableRow = (TableProps: ITableProps) => {
    let { index } = TableProps;
    let income = _incomesR[index];
    let expense = _expensesR[index];
    return (
      <TableRow>
        <TableCell align="right">
          {getCatalog(income?.incomeDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{income?.incomeValue}</TableCell>
        <TableCell align="right">
          {getCatalog(expense?.expenseDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{expense?.expenseValue}</TableCell>
      </TableRow>
    );
  };

  const RenderExpensesRTableRow = (TableProps: ITableProps) => {
    let { index } = TableProps;
    let active = _activeR[index];
    let passives = _passivesR[index];
    return (
      <TableRow>
        <TableCell align="right">
          {getCatalog(active?.activeDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{active?.activeValue}</TableCell>
        <TableCell align="right">
          {getCatalog(passives?.passiveDetail, listCatalogoServicio)}
        </TableCell>
        <TableCell align="right">{passives?.passiveValue}</TableCell>
      </TableRow>
    );
  };

  const getEconomicActivity = () => {
    let listString = [];
    if (ObjectDetalle[economicActivityDependent.name])
      listString.push(economicActivityDependent.label.toUpperCase());
    if (ObjectDetalle[economicActivityInDependent.name])
      listString.push(economicActivityInDependent.label.toUpperCase());
    if (ObjectDetalle[economicActivityRetired.name])
      listString.push(economicActivityRetired.label.toUpperCase());
    if (ObjectDetalle[economicActivityNotWork.name])
      listString.push(economicActivityNotWork.label.toUpperCase());
    return <b>{listString.join(', ')}</b>;
  };

  const getEconomicActivityRepresentative = () => {
    let listString = [];
    if (ObjectDetalle[economicActivityRepresentativeDependent.name])
      listString.push(
        economicActivityRepresentativeDependent.label.toUpperCase()
      );
    if (ObjectDetalle[economicActivityRepresentativeInDependent.name])
      listString.push(
        economicActivityRepresentativeInDependent.label.toUpperCase()
      );
    if (ObjectDetalle[economicActivityRepresentativeRetired.name])
      listString.push(
        economicActivityRepresentativeRetired.label.toUpperCase()
      );
    if (ObjectDetalle[economicActivityRepresentativeNotWork.name])
      listString.push(
        economicActivityRepresentativeNotWork.label.toUpperCase()
      );
    return <b>{listString.join(', ')}</b>;
  };

  const FieldTitle = ({ field }) => {
    let value = field.label.replaceAll('*', '').trim().toUpperCase();
    return <b>{value}</b>;
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
                Información financiera del cliente
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} sx={{ pb: 2 }}>
                  <Box>Actividad económica:</Box>
                  <Text color="black">{getEconomicActivity()}</Text>
                </Grid>
                {ObjectDetalle[economicActivityDependent.name] && (
                  <>
                    <Grid item xs={12} sm={12} sx={{ pb: 2 }}>
                      <Typography variant="h4" gutterBottom>
                        Dependiente
                      </Typography>
                      <Divider />
                    </Grid>
                    <FieldBase field={companyName} sm={12}>
                      <Field field={companyName} />
                    </FieldBase>
                    <FieldBase field={companyPosition}>
                      <Field field={companyPosition} />
                    </FieldBase>
                    <FieldBase field={companyAddress}>
                      <Field field={companyAddress} />
                    </FieldBase>
                  </>
                )}
                {ObjectDetalle[economicActivityInDependent.name] && (
                  <>
                    <Grid item xs={12} sm={12} sx={{ pb: 2, pt: 2 }}>
                      <Typography variant="h4" gutterBottom>
                        Independiente
                      </Typography>
                      <Divider />
                    </Grid>
                    <FieldBase field={ruc} sm={12}>
                      <Field field={ruc} />
                    </FieldBase>
                    <FieldBase field={rucAddress}>
                      <Field field={rucAddress} />
                    </FieldBase>
                    <FieldBase field={typeOfActivity}>
                      <FieldCatalog field={typeOfActivity} />
                    </FieldBase>
                  </>
                )}

                <Grid item xs={12} sm={12} sx={{ pb: 2, pt: 2 }}>
                  <Typography variant="h4" gutterBottom align="center">
                    INGRESOS Y EGRESOS MENSUALES
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableContainer>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            Detalle de ingresos
                          </TableCell>
                          <TableCell align="center">Valor</TableCell>
                          <TableCell align="center">
                            Detalle de egresos
                          </TableCell>
                          <TableCell align="center">Valor</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {range(lenIncomes).map((value) => (
                          <RenderIncomeTableRow
                            key={`incomes-${value}`}
                            index={value}
                          />
                        ))}
                        <TableRow>
                          <TableCell align="right">
                            <FieldTitle field={incomeTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <Field field={incomeTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <FieldTitle field={expenseTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <Field field={expenseTotal} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            Detalle de ingresos
                          </TableCell>
                          <TableCell align="center">Valor</TableCell>
                          <TableCell align="center">
                            Detalle de egresos
                          </TableCell>
                          <TableCell align="center">Valor</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {range(lenExpenses).map((value) => (
                          <RenderExpensesTableRow
                            key={`expenses-${value}`}
                            index={value}
                          />
                        ))}
                        <TableRow>
                          <TableCell align="right">
                            <FieldTitle field={activeTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <Field field={activeTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <FieldTitle field={passivesTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <Field field={passivesTotal} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="right" colSpan={3}>
                            <FieldTitle field={patrimonyTotal} />
                          </TableCell>
                          <TableCell align="right">
                            <Field field={patrimonyTotal} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {ObjectDetalle[representative.name] && (
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
                  Información financiera del representante legal o apoderado
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={6} sx={{ pb: 2 }}>
                    <Box>Actividad económica:</Box>
                    <Text color="black">
                      {getEconomicActivityRepresentative()}
                    </Text>
                  </Grid>
                  {ObjectDetalle[
                    economicActivityRepresentativeDependent.name
                  ] && (
                    <>
                      <Grid item xs={12} sm={12} sx={{ pb: 2 }}>
                        <Typography variant="h4" gutterBottom>
                          Dependiente
                        </Typography>
                        <Divider />
                      </Grid>
                      <FieldBase field={companyNameRepresentative} sm={12}>
                        <Field field={companyNameRepresentative} />
                      </FieldBase>
                      <FieldBase field={companyPositionRepresentative}>
                        <Field field={companyPositionRepresentative} />
                      </FieldBase>
                      <FieldBase field={companyAddressRepresentative}>
                        <Field field={companyAddressRepresentative} />
                      </FieldBase>
                    </>
                  )}
                  {ObjectDetalle[
                    economicActivityRepresentativeInDependent.name
                  ] && (
                    <>
                      <Grid item xs={12} sm={12} sx={{ pb: 2, pt: 2 }}>
                        <Typography variant="h4" gutterBottom>
                          Independiente
                        </Typography>
                        <Divider />
                      </Grid>
                      <FieldBase field={rucRepresentative} sm={12}>
                        <Field field={rucRepresentative} />
                      </FieldBase>
                      <FieldBase field={rucAddressRepresentative}>
                        <Field field={rucAddressRepresentative} />
                      </FieldBase>
                      <FieldBase field={typeOfActivityRepresentative}>
                        <FieldCatalog field={typeOfActivityRepresentative} />
                      </FieldBase>
                    </>
                  )}
                  <Grid item xs={12} sm={12} sx={{ pb: 2, pt: 2 }}>
                    <Typography variant="h4" gutterBottom align="center">
                      INGRESOS Y EGRESOS MENSUALES
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TableContainer>
                      <Table aria-label="spanning table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              Detalle de ingresos
                            </TableCell>
                            <TableCell align="center">Valor</TableCell>
                            <TableCell align="center">
                              Detalle de egresos
                            </TableCell>
                            <TableCell align="center">Valor</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {range(lenIncomesR).map((value) => (
                            <RenderIncomeRTableRow
                              key={`expenses-r-${value}`}
                              index={value}
                            />
                          ))}
                          <TableRow>
                            <TableCell align="right">
                              <FieldTitle field={incomeTotalRepresentative} />
                            </TableCell>
                            <TableCell align="right">
                              <Field field={incomeTotalRepresentative} />
                            </TableCell>
                            <TableCell align="right">
                              <FieldTitle field={expenseTotalRepresentative} />
                            </TableCell>
                            <TableCell align="right">
                              <Field field={expenseTotalRepresentative} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              Detalle de ingresos
                            </TableCell>
                            <TableCell align="center">Valor</TableCell>
                            <TableCell align="center">
                              Detalle de egresos
                            </TableCell>
                            <TableCell align="center">Valor</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {range(lenExpensesR).map((value) => (
                            <RenderExpensesRTableRow
                              key={`expenses-r-${value}`}
                              index={value}
                            />
                          ))}
                          <TableRow>
                            <TableCell align="right">
                              <FieldTitle field={activeTotalRepresentative} />
                            </TableCell>
                            <TableCell align="right">
                              <Field field={activeTotalRepresentative} />
                            </TableCell>
                            <TableCell align="right">
                              <FieldTitle field={passivesTotalRepresentative} />
                            </TableCell>
                            <TableCell align="right">
                              <Field field={passivesTotalRepresentative} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="right" colSpan={3}>
                              <FieldTitle
                                field={patrimonyTotalRepresentative}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Field field={patrimonyTotalRepresentative} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default FinancieroTab;
