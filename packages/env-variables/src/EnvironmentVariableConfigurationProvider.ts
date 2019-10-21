import { IEnvironmentVariablesConfigurationOptions } from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationProvider } from '@node-config-builder/core';
import { ConfigurationModel } from '@node-config-builder/core';
import {
  loadConfigByTransformation,
  TransformationSchema
} from '@node-config-builder/core';

export class EnvironmentVariableConfigurationProvider
  implements IConfigurationProvider {
  data: ConfigurationModel;

  constructor(private options: IEnvironmentVariablesConfigurationOptions) {}

  load(): Promise<void> {
    if (this.options.transform) {
      return this.loadByTransformation(this.options.transform).then(config => {
        this.data = config;
      });
    }

    this.data = this.loadByPrefixAndNames(this.options);

    return Promise.resolve();
  }

  getByKey(key: string): Promise<string | ConfigurationModel> {
    if (!this.data) {
      return null;
    }

    return Promise.resolve(this.data[key]);
  }

  private loadByTransformation(
    transform: TransformationSchema
  ): Promise<ConfigurationModel> {
    const envVariables = process.env;

    return loadConfigByTransformation({
      transform,
      getValueByKey: key => Promise.resolve(envVariables[key])
    });
  }

  private loadByPrefixAndNames(
    options: IEnvironmentVariablesConfigurationOptions
  ): ConfigurationModel {
    const envVariables = process.env;
    const hasPrefix = options.prefix;
    const hasValidNames = options.validNames.length > 0;

    return Object.keys(envVariables)
      .filter(key => envVariables.hasOwnProperty(key))
      .filter(key => {
        const prefixMatch = hasPrefix && key.indexOf(options.prefix) === 0;
        const validNameMatch =
          hasValidNames && options.validNames.indexOf(key) > -1;

        if (hasPrefix && hasValidNames) {
          return prefixMatch && validNameMatch;
        }

        if (hasPrefix) {
          return prefixMatch;
        }
        if (hasValidNames) {
          return validNameMatch;
        }

        return true;
      })
      .reduce((config, key) => {
        config[key] = envVariables[key];
        return config;
      }, {});
  }
}
