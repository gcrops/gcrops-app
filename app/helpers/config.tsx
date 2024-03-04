enum AppEnv {
  PROD = 'PROD',
  DEV = 'DEV',
}

const AppEnvironment = AppEnv.PROD;

const commonConfig = {};

const prodConfig = {
  ...commonConfig,
  API_BASE_URL: 'http://alb-icrops-1103729080.us-east-1.elb.amazonaws.com/',
};

const developmentConfig = {
  ...commonConfig,
  // API_BASE_URL: 'https://icrops.globalbiomeservices.com',
  API_BASE_URL: 'http://alb-icrops-1103729080.us-east-1.elb.amazonaws.com/',
};

const AppConfig =
  AppEnvironment !== AppEnv.PROD ? developmentConfig : prodConfig;

export {AppConfig, AppEnvironment, AppEnv};
