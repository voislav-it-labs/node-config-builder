import { IConfigurationProvider } from '@node-config-builder/core/models/IConfigurationProvider';
import { ConfigurationModel } from '@node-config-builder/core/models/ConfigurationModel';
import * as path from 'path';
import * as fs from 'fs';
import { JsonProviderOptions } from './models/json-provider-options';

export class JsonFileConfigurationProvider implements IConfigurationProvider {
  constructor(private options: JsonProviderOptions) {
    this.options = {
      optional: false,
      ...options
    };
  }

  data: ConfigurationModel | null = null;

  load(): void {
    if (path.isAbsolute(this.options.fileName)) {
      this.data = this.loadJsonFile(this.options.fileName);
      return;
    }

    let filePath = path.join(this.options.rootPath, this.options.fileName);

    if (!path.isAbsolute(filePath)) {
      filePath = path.join(__dirname, filePath);
    }

    if (!this.options.optional && !fs.existsSync(filePath)) {
      throw new Error('File not found at path ' + filePath);
    }

    this.data = this.loadJsonFile(filePath);
  }

  getByKey(key: string): string | ConfigurationModel {
    throw new Error('Method not implemented.');
  }

  private loadJsonFile(fileAbsolutePath: string): ConfigurationModel | null {
    if (!fs.existsSync(fileAbsolutePath)) {
      return {};
    }

    const stat = fs.statSync(fileAbsolutePath);

    if (!stat.isFile) {
      return {};
    }

    try {
      const buffer = fs.readFileSync(fileAbsolutePath);
      const content = buffer.toString();
      return JSON.parse(content);
    } catch (err) {
      console.error(
        'Failed to load configuration from file: ',
        fileAbsolutePath
      );
      throw err;
    }
  }
}
