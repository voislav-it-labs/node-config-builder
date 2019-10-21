import { IConfigurationSource } from '@node-config-builder/core';
import { IConfigurationBuilder } from '@node-config-builder/core';
import { IConfigurationProvider } from '@node-config-builder/core';
import { JsonFileConfigurationProvider } from './JsonFileConfigurationProvider';
import { RootPathKey } from '@node-config-builder/core';
import { JsonProviderOptions } from './models/json-provider-options';

export class JsonFileConfigurationSource implements IConfigurationSource {
  constructor(private options: JsonProviderOptions) {}

  build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonFileConfigurationProvider({
      rootPath: builder.sharedProperties[RootPathKey],
      ...this.options
    });
  }
}
