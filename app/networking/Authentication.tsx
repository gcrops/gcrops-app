import {AxiosPromise} from 'axios';
import {RootObject as ForgotPassword} from '@app/app/networking/types/ForgotPassword';
import {RootObject as Login} from '@app/app/networking/types/Login';
import {RootObject as Signup} from '@app/app/networking/types/Signup';
import {client} from '@app/app/networking';

export const createUser = (
  email: string,
  designation?: string,
  institute?: string,
  province?: string,
  country?: string,
): AxiosPromise<Signup> => {
  return client({
    method: 'post',
    url: '/signup',
    data: {email, designation, institute, province, country},
  });
};

export const loginUser = (
  email: string,
  password: string,
): AxiosPromise<Login> => {
  return client({
    method: 'post',
    url: '/login',
    data: {email, password},
  });
};

export const forgotPassword = (email: string): AxiosPromise<ForgotPassword> => {
  return client({
    method: 'post',
    url: '/forgotpassword',
    data: {email},
  });
};
