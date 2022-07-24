enum AppEnv {
  PROD = 'PROD',
  DEV = 'DEV',
}

const AppEnvironment = AppEnv.PROD;

const commonConfig = {};

const prodConfig = {
  ...commonConfig,
  API_BASE_URL:
    'http://ec2co-ecsel-1lpo5nl6bevwe-415313096.ap-south-1.elb.amazonaws.com',
};

const developmentConfig = {
  ...commonConfig,
  API_BASE_URL:
    'http://ec2co-ecsel-1lpo5nl6bevwe-415313096.ap-south-1.elb.amazonaws.com',
};

const AppConfig =
  AppEnvironment === AppEnv.DEV
    ? developmentConfig
    : AppEnvironment === AppEnv.PROD
    ? prodConfig
    : prodConfig;

export {AppConfig, AppEnvironment, AppEnv};
