import { IConfigurationBuilder } from './models/IConfigurationBuilder';
import { IConfigurationSource } from './models/IConfigurationSource';
import { IConfigurationRoot } from './models/IConfigurationRoot';
import { ConfigurationRoot } from './ConfigurationRoot';

export class ConfigurationBuilder implements IConfigurationBuilder {
  private sources: IConfigurationSource[] = [];
  add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);
    return this;
  }
  build(): IConfigurationRoot {
    const providers = this.sources.map(source => source.build(this));
    return new ConfigurationRoot(providers);
  }
}
