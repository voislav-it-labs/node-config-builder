import { ConfigurationModel } from './ConfigurationModel';

export interface IConfigurationProvider {
  data: ConfigurationModel | null;
  load(): void;
  getByKey(key: string): string | ConfigurationModel;
}
