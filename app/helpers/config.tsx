enum AppEnv {
  PROD = 'PROD',
  DEV = 'DEV',
}

const AppEnvironment = AppEnv.PROD;

const commonConfig = {};

const prodConfig = {
  ...commonConfig,
  API_BASE_URL: 'https://icrops.globalbiomeservices.com',
};

const developmentConfig = {
  ...commonConfig,
  API_BASE_URL: 'https://icrops.globalbiomeservices.com',
};

const AppConfig =
  AppEnvironment === AppEnv.DEV
    ? developmentConfig
    : AppEnvironment === AppEnv.PROD
    ? prodConfig
    : prodConfig;

export {AppConfig, AppEnvironment, AppEnv};
