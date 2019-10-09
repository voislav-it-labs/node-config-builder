import { ConfigurationBuilder } from './packages/core/src/ConfigurationBuilder';
import { EnvironmentVariableConfigurationSource } from './packages/env-variables/src/EnvironmentVariableConfigurationSource';
import { JsonFileConfigurationSource } from './packages/json-file/src/JsonFileConfigurationSource';

const c = new ConfigurationBuilder()
  .setRootPath(__dirname)
  .add(
    new JsonFileConfigurationSource({
      fileName: 'tsconfig.json',
      rootPath: __dirname
    })
  )
  .add(
    new EnvironmentVariableConfigurationSource()
      .withPrefix('ALUMNI_')
      .withValidNames(['NODE_ENV', 'NODE_CONFIG_ENV'])
  );

c.build().then(root => {
  console.log(root.configuration);
});
