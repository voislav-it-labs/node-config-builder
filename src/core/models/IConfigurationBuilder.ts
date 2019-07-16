import { IConfigurationSource } from './IConfigurationSource';
import { IConfigurationRoot } from './IConfigurationRoot';

export interface SharedProperties {
  [index: string]: string;
}

export interface IConfigurationBuilder {
  sharedProperties: SharedProperties;
  setRootPath(rootPath: string): IConfigurationBuilder;
  add(source: IConfigurationSource): IConfigurationBuilder;
  build(): IConfigurationRoot;
}
