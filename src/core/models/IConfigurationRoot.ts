import { ConfigurationModel } from './ConfigurationModel';

export interface IConfigurationRoot {
  reload(): void;
  configuration: ConfigurationModel;
}
