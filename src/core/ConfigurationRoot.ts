import { IConfigurationRoot } from './models/IConfigurationRoot';

import { IConfigurationProvider } from './models/IConfigurationProvider';

import { ConfigurationModel } from './models/ConfigurationModel';

export class ConfigurationRoot implements IConfigurationRoot {
  constructor(private providers: IConfigurationProvider[]) {
    this.loadConfiguration();
  }

  get configuration(): ConfigurationModel {
    return null;
  }

  reload(): void {
    this.providers.forEach(provider => provider.load());
  }

  private loadConfiguration() {
    this.providers.forEach(provider => provider.load());
  }
}
