import { IConfigurationBuilder } from './models/IConfigurationBuilder';
import { IConfigurationSource } from './models/IConfigurationSource';
import { IConfigurationRoot } from './models/IConfigurationRoot';
import { ConfigurationRoot } from './ConfigurationRoot';
import { RootPathKey } from './models/RootPathKey';

export class ConfigurationBuilder implements IConfigurationBuilder {
  // Deprecated
  public sharedProperties = {
    [RootPathKey]: __dirname
  };

  private sources: IConfigurationSource[] = [];

  setRootPath(rootPath: string): IConfigurationBuilder {
    this.sharedProperties[RootPathKey] = rootPath;

    return this;
  }

  add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);
    return this;
  }

  build(): Promise<IConfigurationRoot> {
    const providers = this.sources.map(source => source.build(this));
    const root = new ConfigurationRoot(providers);
    return root.reload().then(() => root);
  }
}
