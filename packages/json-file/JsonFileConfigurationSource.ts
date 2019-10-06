import { IConfigurationSource } from '@node-config-builder/core/models/IConfigurationSource';
import { IConfigurationBuilder } from '@node-config-builder/core/models/IConfigurationBuilder';
import { IConfigurationProvider } from '@node-config-builder/core/models/IConfigurationProvider';
import { JsonFileConfigurationProvider } from './JsonFileConfigurationProvider';
import { RootPathKey } from '@node-config-builder/core/models/RootPathKey';

export class JsonFileConfigurationSource implements IConfigurationSource {
  constructor(private fileName: string) {}

  build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonFileConfigurationProvider(
      builder.sharedProperties[RootPathKey],
      this.fileName
    );
  }
}
