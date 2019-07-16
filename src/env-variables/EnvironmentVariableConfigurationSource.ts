import { IConfigurationSource } from '../core/models/IConfigurationSource';
import { IEnvironmentVariablesConfigurationOptions } from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationBuilder } from '../core/models/IConfigurationBuilder';
import { IConfigurationProvider } from '../core/models/IConfigurationProvider';
import { EnvironmentVariableConfigurationProvider } from './EnvironmentVariableConfigurationProvider';
export class EnvironmentVariableConfigurationSource implements IConfigurationSource {
  private options: IEnvironmentVariablesConfigurationOptions = {
    prefix: '',
    validNames: [],
    transform: null,
  };
  constructor() {}
  withPrefix(prefix: string): EnvironmentVariableConfigurationSource {
    this.options.prefix = prefix;
    return this;
  }
  withValidNames(environmentVariableNames: string[]): EnvironmentVariableConfigurationSource {
    this.options.validNames = environmentVariableNames;
    return this;
  }
  build(builder: IConfigurationBuilder): IConfigurationProvider {
    const provider = new EnvironmentVariableConfigurationProvider(this.options);
    return provider;
  }
}
