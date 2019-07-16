import { IConfigurationSource } from './IConfigurationSource';
import { IConfigurationRoot } from './IConfigurationRoot';

export interface IConfigurationBuilder {
  add(source: IConfigurationSource): void;
  build(): IConfigurationRoot;
}
