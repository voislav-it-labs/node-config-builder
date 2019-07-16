import { IConfigurationSource } from '../core/models/IConfigurationSource';
import { IConfigurationBuilder } from '../core/models/IConfigurationBuilder';
import { IConfigurationProvider } from '../core/models/IConfigurationProvider';
import { JsonFileConfigurationProvider } from './JsonFileConfigurationProvider';
import { RootPathKey } from '../core/models/RootPathKey';

export class JsonFileConfigurationSource implements IConfigurationSource {
  constructor(private fileName: string) {}

  build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonFileConfigurationProvider(builder.sharedProperties[RootPathKey], this.fileName);
  }
}
