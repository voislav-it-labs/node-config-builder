import { IConfigurationRoot } from './models/IConfigurationRoot';
import { IConfigurationProvider } from './models/IConfigurationProvider';
import { ConfigurationModel } from './models/ConfigurationModel';
import * as merge from 'deepmerge';

export class ConfigurationRoot implements IConfigurationRoot {
  constructor(private providers: IConfigurationProvider[]) {
    this.loadConfiguration();
  }

  configuration: ConfigurationModel;

  reload(): void {
    this.providers.forEach(provider => provider.load());
  }

  private loadConfiguration() {
    this.providers.forEach(provider => provider.load());
    this.configuration = merge.all(
      this.providers.map(provider => provider.data)
    ) as ConfigurationModel;
  }
}
