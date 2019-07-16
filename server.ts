import { ConfigurationBuilder } from './src/core/ConfigurationBuilder';
import { EnvironmentVariableConfigurationSource } from './src/env-variables/EnvironmentVariableConfigurationSource';

const c = new ConfigurationBuilder().add(
  new EnvironmentVariableConfigurationSource()
    .withPrefix('ALUMNI_')
    .withValidNames(['NODE_ENV', 'NODE_CONFIG_ENV'])
);
