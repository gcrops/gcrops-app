import {AxiosPromise} from 'axios';
import {RootObject as Help} from '@app/app/networking/types/Help';
import {RootObject as Meta} from '@app/app/networking/types/Meta';
import {RootObject as Base64ToURL} from '@app/app/networking/types/Base64ToURL';
import {RootObject as Collect} from '@app/app/networking/types/Collect';
import {RootObject as Coordinates} from '@app/app/networking/types/Coordinates';
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
export const mapData = (): AxiosPromise<Coordinates> => {
  return client({
    method: 'get',
    url: '/locations',
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
  crop,
  cropcutting,
  description,
}: {
  images: string[];
  landCoverType: string;
  location: {latitude: string; longitude: string; offset: string};
  crop: {
    waterSource: string;
    cropIntensity: string;
    primaryCrop: string;
    secondaryCrop: string;
    liveStock: string;
  };
  cropcutting: {
    samplesize: string;
    grainweight: string;
    biomassweight: string;
    cultivar: string;
    sowingdate: string;
    harvestdate: string;
  };
  description: string;
}): AxiosPromise<Collect> => {
  return client({
    method: 'post',
    url: '/collect',
    data: {images, landCoverType, location, crop, cropcutting, description},
  });
};
