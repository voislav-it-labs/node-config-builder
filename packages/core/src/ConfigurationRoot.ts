import { IConfigurationRoot } from './models/IConfigurationRoot';
import { IConfigurationProvider } from './models/IConfigurationProvider';
import { ConfigurationModel } from './models/ConfigurationModel';
import * as merge from 'deepmerge';

export class ConfigurationRoot implements IConfigurationRoot {
  constructor(private providers: IConfigurationProvider[]) {}

  configuration: ConfigurationModel;

  reload(): Promise<void> {
    return this.loadConfiguration();
  }

  private loadConfiguration(): Promise<void> {
    const loads = this.providers.map(provider => provider.load());

    return Promise.all(loads).then(() => {
      this.configuration = merge.all(
        this.providers.map(provider => provider.data)
      ) as ConfigurationModel;
    });
  }
}
