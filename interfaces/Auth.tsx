import { IUsuario } from './Usuario';
import { ROLE } from '../constants/default';

export interface IAuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUsuario;
}

export interface IAuthContext extends IAuthState {
  hasPermissions: (roles: Array<ROLE>) => boolean;
  login: (email: FormDataEntryValue, password: FormDataEntryValue) => void;
  logout: () => void;
}
