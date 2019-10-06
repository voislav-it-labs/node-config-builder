import { IEnvironmentVariablesConfigurationOptions } from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationProvider } from '@node-config-builder/core/models/IConfigurationProvider';
import { ConfigurationModel } from '@node-config-builder/core/models/ConfigurationModel';
import {
  loadConfigByTransformation,
  TransformationSchema
} from '@node-config-builder/core/ConfigByTransformLoader';

export class EnvironmentVariableConfigurationProvider
  implements IConfigurationProvider {
  data: ConfigurationModel;

  constructor(private options: IEnvironmentVariablesConfigurationOptions) {}

  load(): void {
    if (this.options.transform) {
      this.data = this.loadByTransformation(this.options.transform);
      return;
    }

    this.data = this.loadByPrefixAndNames(this.options);
  }

  getByKey(key: string): string | ConfigurationModel {
    if (!this.data) {
      return null;
    }

    return this.data[key];
  }

  private loadByTransformation(
    transform: TransformationSchema
  ): ConfigurationModel {
    const envVariables = process.env;

    return loadConfigByTransformation({
      transform,
      getValueByKey: key => envVariables[key]
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
