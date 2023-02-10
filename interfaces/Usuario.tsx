import { ICatalogo } from './Catalogo';
import { IPermiso } from './Permiso';

export interface IUsuario {
  UsuarioId: number;
  NombreUsuario: string;
  NombresCompletos?: string;
  Clave: string;
  Email: string;
  IPs: string;
  Estado: string;
  FechaInicio: Date;
  FechaFin: Date;
  Roles: string;
  UsuarioBVQ: boolean;
  Firma?: boolean;
  DepartamentoId?: number;
  Departamento?: ICatalogo;
  CargoId?: number;
  Cargo?: ICatalogo;
  RolId?: number;
  Rol?: IPermiso;
  EnviarEmail?: boolean;
  DocFirmado: any;
  ClaveFirma: string;
  RolesId?: number;
}

export interface IUsuarioState {
  loading: boolean;
  listResult: IUsuario[];
  selectedResult: IUsuario;
  isNew: boolean;
  isEdit: boolean;
  isDelete: boolean;
  isPassword: boolean;
  isSigned: boolean;
}

export interface IUsuarioContext extends IUsuarioState {
  setCurrentResult: (result: IUsuario) => void;
  changeNew: (state: boolean) => void;
  createRegister: (data: IUsuario) => void;
  changeEdit: (state: boolean) => void;
  updateRegister: (data: IUsuario) => void;
  changePassword: (state: boolean) => void;
  updatePassword: (data: IUsuario) => void;
  changeSigned: (state: boolean) => void;
  updateSigned: (data: IUsuario) => void;
  changeDelete: (state: boolean) => void;
  deleteRegister: (id: number) => void;
}

export interface IListCatalog {
  loading: boolean;
  Departamentos: ICatalogo[];
  Cargos: ICatalogo[];
  Roles: IPermiso[];
}
