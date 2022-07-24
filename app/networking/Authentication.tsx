import {AxiosPromise} from 'axios';
import {RootObject as ForgotPassword} from '@app/app/networking/types/ForgotPassword';
import {RootObject as Login} from '@app/app/networking/types/Login';
import {client} from '@app/app/networking';

export const createUser = (email: string): AxiosPromise<User> => {
  return client({
    method: 'post',
    url: '/signup',
    data: {email},
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
