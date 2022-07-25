import {AppConfig} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// axios.defaults.timeout = 6000;
const client = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  headers: {},
});

export {client};

export const setAuthorization = (accessToken: string | null) => {
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const saveAuthorization = async (accessToken: string) => {
  await AsyncStorage.setItem(
    'Authorization',
    JSON.stringify({
      accessToken,
    }),
  );
};

export const getAuthorization = async (): Promise<{
  accessToken: string;
} | null> => {
  const authorization = await AsyncStorage.getItem('Authorization');
  return authorization ? JSON.parse(authorization) : null;
};

export const removeAuthorization = async () => {
  await AsyncStorage.removeItem('Authorization');
};
