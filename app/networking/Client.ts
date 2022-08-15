import {AppConfig} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

import axios from 'axios';

// axios.defaults.timeout = 6000;
const client = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  headers: {
    source: 'mobile',
    'Content-Type': 'application/json',
  },
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

export const saveCollectedData = async (
  data: (
    | {
        type: string;
        value: string;
        content: Geolocation.GeoPosition[];
      }
    | {
        type: string;
        value: string;
        content: String[];
      }
  )[][],
) => {
  await AsyncStorage.setItem(
    'CollectedData',
    JSON.stringify({
      data,
    }),
  );
};

export const getCollectedData = async (): Promise<
  | (
      | {
          type: string;
          value: string;
          content: Geolocation.GeoPosition[];
        }
      | {
          type: string;
          value: string;
          content: String[];
        }
    )[]
> => {
  const authorization = await AsyncStorage.getItem('CollectedData');
  return authorization ? JSON.parse(authorization) : null;
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
