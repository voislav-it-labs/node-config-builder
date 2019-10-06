import { IConfigurationSource } from '@node-config-builder/core/models/IConfigurationSource';
import { IEnvironmentVariablesConfigurationOptions } from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationBuilder } from '@node-config-builder/core/models/IConfigurationBuilder';
import { IConfigurationProvider } from '@node-config-builder/core/models/IConfigurationProvider';
import { EnvironmentVariableConfigurationProvider } from './EnvironmentVariableConfigurationProvider';
export class EnvironmentVariableConfigurationSource
  implements IConfigurationSource {
  private options: IEnvironmentVariablesConfigurationOptions = {
    prefix: '',
    validNames: [],
    transform: null
  };
  constructor() {}
  withPrefix(prefix: string): EnvironmentVariableConfigurationSource {
    this.options.prefix = prefix;
    return this;
  }
  withValidNames(
    environmentVariableNames: string[]
  ): EnvironmentVariableConfigurationSource {
    this.options.validNames = environmentVariableNames;
    return this;
  }
  build(builder: IConfigurationBuilder): IConfigurationProvider {
    const provider = new EnvironmentVariableConfigurationProvider(this.options);
    return provider;
  }
}
