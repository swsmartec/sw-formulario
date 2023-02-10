export interface ICiudadano {
  CiudadanoId: number;
  CondicionCedulado: string;
  NumeroCedula: string;
  Apellidos: string;
  Nombres: string;
  Nacionalidad: string;
  EstadoCivil: string;
  Conyuge: string;
  ProfesionOcupacion: string;
  Direccion: string;
  Genero: string;
  LugarNacimiento: string;
  FechaMatrimonio?: Date;
  FechaDefuncion?: Date;
}

export interface ICiudadanoState {
  loading: boolean;
  listResult: ICiudadano[];
  selectedResult: ICiudadano;
  isNew: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export interface ICiudadanoContext extends ICiudadanoState {
  setCurrentResult: (result: ICiudadano) => void;
  changeNew: (state: boolean) => void;
  createRegister: (data: ICiudadano) => void;
  changeEdit: (state: boolean) => void;
  updateRegister: (data: ICiudadano) => void;
  changeDelete: (state: boolean) => void;
  deleteRegister: (id: number) => void;
}
