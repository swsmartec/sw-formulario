import axios from 'axios';

const Constants = {
  baseUrl: process.env.NEXT_PUBLIC_APP_BACKEND,
  key: 'session_api',
  login: 'login/authenticate'
};

export const apiAxios = axios.create({ baseURL: Constants.baseUrl });

export async function get(url: string) {
  return apiAxios.get(url).then((response) => response.data);
}

export async function post(url: string, data: Object) {
  return apiAxios.post(url, { ...data }).then((response) => response.data);
}

export async function put(url: string, data: Object) {
  return apiAxios.post(url, { ...data }).then((response) => response.data);
}

export async function del(url: string) {
  return apiAxios.post(url).then((response) => response.data);
}
