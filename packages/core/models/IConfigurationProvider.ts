import { ConfigurationModel } from './ConfigurationModel';

export interface IConfigurationProvider {
  data: ConfigurationModel | null;
  load(): Promise<void>;
  getByKey(key: string): Promise<string | ConfigurationModel>;
}
