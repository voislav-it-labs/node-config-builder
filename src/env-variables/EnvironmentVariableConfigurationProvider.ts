import { IEnvironmentVariablesConfigurationOptions } from './models/IEnvironmentVariablesConfigurationOptions';
import { IConfigurationProvider } from '../core/models/IConfigurationProvider';
import { ConfigurationModel } from '../core/models/ConfigurationModel';
export class EnvironmentVariableConfigurationProvider implements IConfigurationProvider {
  data: ConfigurationModel;
  constructor(private options: IEnvironmentVariablesConfigurationOptions) {}
  load(): void {
    const envVariables = JSON.parse(JSON.stringify(process.env));
    Object.keys(envVariables)
      .filter(key => {
        if (this.options.prefix && key.indexOf(this.options.prefix) === 0) {
          return true;
        }
        if (this.options.validNames.length === 0) {
          return true;
        }
        return this.options.validNames.indexOf(key) > -1;
      })
      .forEach(key => {
        delete envVariables[key];
      });
    this.data = envVariables;
  }
  getByKey(key: string): string | ConfigurationModel {
    if (!this.data) {
      return null;
    }
    return this.data[key];
  }
}
