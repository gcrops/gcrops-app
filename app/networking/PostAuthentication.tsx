import {AxiosPromise} from 'axios';
import {RootObject as Help} from '@app/app/networking/types/Help';
import {RootObject as Meta} from '@app/app/networking/types/Meta';
import {RootObject as Base64ToURL} from '@app/app/networking/types/Base64ToURL';
import {RootObject as Collect} from '@app/app/networking/types/Collect';
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

export const base64ToURL = (base64: string): AxiosPromise<Base64ToURL> => {
  return client({
    method: 'post',
    url: '/upload',
    data: {image: base64},
  });
};

export const collect = ({
  images,
  landCoverType,
  location,
}: {
  images: [string];
  landCoverType: string;
  location: {latitude: string; longitude: string};
}): AxiosPromise<Collect> => {
  return client({
    method: 'post',
    url: '/collect',
    data: {images, landCoverType, location},
  });
};
