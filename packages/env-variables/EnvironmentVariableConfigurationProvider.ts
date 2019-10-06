import {
  IEnvironmentVariablesConfigurationOptions,
  EnvironmentVariablesConfigurationTransformationSchema
} from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationProvider } from '@node-config-builder/core/models/IConfigurationProvider';
import { ConfigurationModel } from '@node-config-builder/core/models/ConfigurationModel';

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
    transform: EnvironmentVariablesConfigurationTransformationSchema
  ): ConfigurationModel {
    const envVariables = process.env;

    const setConfigByKey = (
      config: any,
      key: string,
      envVariableKey: string
    ) => {
      return {
        ...config,
        [key]: envVariables[envVariableKey]
      };
    };

    const setConfigByKeyByTransofrmation = (
      config: any,
      transform: EnvironmentVariablesConfigurationTransformationSchema
    ) => {
      if (!transform) {
        return config;
      }

      Object.keys(transform).forEach(transformKeyName => {
        const transformKeyValue = transform[transformKeyName];
        if (typeof transformKeyValue === 'string') {
          config = setConfigByKey(config, transformKeyName, transformKeyValue);
        } else {
          config[transformKeyName] = setConfigByKeyByTransofrmation(
            {},
            transformKeyValue
          );
        }
      });

      return config;
    };

    return setConfigByKeyByTransofrmation({}, transform);
  }

  private loadByPrefixAndNames(
    options: IEnvironmentVariablesConfigurationOptions
  ): ConfigurationModel {
    const envVariables = process.env;
    const hasPrefix = this.options.prefix;
    const hasValidNames = this.options.validNames.length > 0;

    return Object.keys(envVariables)
      .filter(key => envVariables.hasOwnProperty(key))
      .filter(key => {
        const prefixMatch = hasPrefix && key.indexOf(this.options.prefix) === 0;
        const validNameMatch =
          hasValidNames && this.options.validNames.indexOf(key) > -1;

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
