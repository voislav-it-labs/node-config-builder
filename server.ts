import { ConfigurationBuilder } from './src/core/ConfigurationBuilder';
import { EnvironmentVariableConfigurationSource } from './src/env-variables/EnvironmentVariableConfigurationSource';
import { JsonFileConfigurationSource } from './src/json-file/JsonFileConfigurationSource';

const c = new ConfigurationBuilder()
  .setRootPath(__dirname)
  .add(new JsonFileConfigurationSource('tsconfig.json'))
  .add(
    new EnvironmentVariableConfigurationSource()
      .withPrefix('ALUMNI_')
      .withValidNames(['NODE_ENV', 'NODE_CONFIG_ENV'])
  );

const root = c.build();
console.log(root.configuration);
