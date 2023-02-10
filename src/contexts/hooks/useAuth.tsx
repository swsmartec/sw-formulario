import { useEffect, useState } from 'react';
import { apiAxios } from '../../../helpers/service';
import Cookies from 'js-cookie';
import { notifications } from '../../../helpers/notifications';
import { ROLE } from '../../../constants/default';
import { IAuthState } from '../../../interfaces/Auth';
import { IUsuario } from '../../../interfaces/Usuario';

export const useAuth = () => {
  const [{ loading, user, isAuthenticated }, setStateHooks] =
    useState<IAuthState>({
      loading: true,
      user: {} as IUsuario,
      isAuthenticated: false
    });

  useEffect(() => {
    const loadUserFromCookies = () => {
      const token = Cookies.get('token');
      if (token) {
        apiAxios.defaults.headers.Authorization = `Bearer ${token}`;
        apiAxios
          .get('login/echouser')
          .then((resp) => {
            let { data: user } = resp;
            setStateHooks((prev) => ({
              ...prev,
              user: user as IUsuario,
              isAuthenticated: true
            }));
          })
          .catch((error) => {
            notifications({
              title: 'Error',
              message: error.toString(),
              toastType: 'error'
            });
            logout();
          });
      }
      setStateHooks((prev) => ({ ...prev, loading: false }));
    };
    loadUserFromCookies();
  }, []);

  const login = async (
    email: FormDataEntryValue,
    password: FormDataEntryValue
  ) => {
    let dataSend = { Username: email, Password: password };
    const { data: result } = await apiAxios.post(
      'login/authenticate',
      dataSend
    );
    if (result.Token) {
      // let expiresMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);
      let expiresMinutes = 0.5;
      Cookies.set('token', result.Token, { expires: expiresMinutes });
      apiAxios.defaults.headers.Authorization = `Bearer ${result.Token}`;
      const { data: user } = await apiAxios.get('login/echouser');
      setStateHooks((prev) => ({ ...prev, user: user }));
      notifications({
        title: 'Bienvenido',
        message: 'Inicio de sesión correcto'
      });
      window.location.pathname = '/';
    } else {
      notifications({
        title: 'Error',
        message: result?.MESSAGE,
        toastType: 'error'
      });
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setStateHooks((prev) => ({ ...prev, user: null }));
    delete apiAxios.defaults.headers.Authorization;
    window.location.pathname = '/login';
  };

  const hasPermissions = (roles: Array<ROLE>) => {
    let acciones = user.Rol?.RolesAciones.map((r) => r.Codigo);
    let group = user.Rol?.Codigo;

    if (acciones === undefined) acciones = [];

    if (group !== undefined) acciones.push(group);

    let enableRoles = roles.filter((role) => acciones.includes(role));

    return enableRoles.length > 0;
  };

  return {
    loading,
    isAuthenticated,
    user,
    login,
    logout,
    hasPermissions
  };
};
