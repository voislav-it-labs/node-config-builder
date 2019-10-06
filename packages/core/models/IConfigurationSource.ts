import { IConfigurationBuilder } from './IConfigurationBuilder';
import { IConfigurationProvider } from './IConfigurationProvider';

export interface IConfigurationSource {
  build(builder: IConfigurationBuilder): IConfigurationProvider;
}
