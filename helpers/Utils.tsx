import { Constants } from '../constants/default';
import { ICatalogoService } from '../interfaces/Catalogo';
import { saveAs } from 'file-saver';

export const replaceObjectInString = (value: string, obj: object) => {
  return value.replace(/:[a-zA-Z?]+/g, function (match) {
    const key = match.slice(1);
    return obj[key];
  });
};

export const normalizeLabel = (labelName: string) => {
  return labelName ? labelName.replace('*', '').trim() : '';
};

export const hasSpouse = (value: number) => {
  return (
    value == Constants.CodeMaritalStatusMarried ||
    value == Constants.CodeMaritalStatusFactoUnion
  );
};

export const hasRepresentative = (value: boolean) => {
  return value;
};

export const getCatalog = (
  value: string | number | undefined,
  catalog: ICatalogoService[]
) => {
  if (value == undefined) return '';
  let currentCatalog = catalog.find(
    (l: ICatalogoService) => l.ITC_ID.toString() === value.toString()
  );
  if (currentCatalog) return currentCatalog.ITC_NOMBRE;
  return value;
};

export const getValueCatalog = (
  label: { name: string; label: string },
  values: object,
  catalog: ICatalogoService[]
) => {
  let value = values[label.name];
  return getCatalog(value, catalog);
};

export const getValueMultiCatalog = (
  label: { name: string; label: string },
  values: object,
  catalog: ICatalogoService[]
) => {
  let value = values[label.name] as number[];
  let currentCatalog = value.map((v) => getCatalog(v, catalog));
  return currentCatalog.join(', ');
};

export const range = (max: number) => {
  let val = [] as number[];
  for (let i = 0; i < max; i++) {
    val.push(i);
  }
  return val;
};

const convertBase64ToFile = (base64String, fileName) => {
  let arr = base64String.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let uint8Array = new Uint8Array(n);
  while (n--) {
    uint8Array[n] = bstr.charCodeAt(n);
  }
  return new File([uint8Array], fileName, { type: mime });
};

export const downloadBase64Data = (base64String, fileName) => {
  let file = convertBase64ToFile(base64String, fileName);
  saveAs(file, fileName);
};

export const normalizeMoney = (value: any) => {
  if (value) return value.replaceAll(',', '');
  return value;
};

export const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
};
export const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('/');
};
