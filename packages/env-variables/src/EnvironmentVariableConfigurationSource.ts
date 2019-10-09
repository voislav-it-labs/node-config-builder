import { IConfigurationSource } from '@node-config-builder/core/src/models/IConfigurationSource';
import { IEnvironmentVariablesConfigurationOptions } from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationBuilder } from '@node-config-builder/core/src/models/IConfigurationBuilder';
import { IConfigurationProvider } from '@node-config-builder/core/src/models/IConfigurationProvider';
import { EnvironmentVariableConfigurationProvider } from './EnvironmentVariableConfigurationProvider';
import { TransformationSchema } from '../../core/src/ConfigByTransformLoader';

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

  withTransformation(transform: TransformationSchema) {
    this.options.transform = transform;
    return this;
  }

  build(builder: IConfigurationBuilder): IConfigurationProvider {
    const provider = new EnvironmentVariableConfigurationProvider(this.options);
    return provider;
  }
}
