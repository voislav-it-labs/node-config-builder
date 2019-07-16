import { ConfigurationModel } from './ConfigurationModel';

export interface IConfigurationProvider {
  data: ConfigurationModel;
  load(): void;
  getByKey(key: string): string | ConfigurationModel;
}
