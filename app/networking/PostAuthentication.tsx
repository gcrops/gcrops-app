import {AxiosPromise} from 'axios';
import {RootObject as Help} from '@app/app/networking/types/Help';
import {RootObject as Meta} from '@app/app/networking/types/Meta';
import {client} from '@app/app/networking';

export const helpData = (): AxiosPromise<Help> => {
  return client({
    method: 'get',
    url: '/help',
  });
};

export const metaData = (): AxiosPromise<Meta> => {
  return client({
    method: 'get',
    url: '/meta',
  });
};
