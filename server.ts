import { ConfigurationBuilder } from "./packages/core/ConfigurationBuilder";
import { EnvironmentVariableConfigurationSource } from "./packages/env-variables/EnvironmentVariableConfigurationSource";
import { JsonFileConfigurationSource } from "./packages/json-file/JsonFileConfigurationSource";

const c = new ConfigurationBuilder()
  .setRootPath(__dirname)
  .add(new JsonFileConfigurationSource("tsconfig.json"))
  .add(
    new EnvironmentVariableConfigurationSource()
      .withPrefix("ALUMNI_")
      .withValidNames(["NODE_ENV", "NODE_CONFIG_ENV"])
  );

const root = c.build();
console.log(root.configuration);
