import { IConfigurationProvider } from '../core/models/IConfigurationProvider';
import { ConfigurationModel } from '../core/models/ConfigurationModel';
import * as path from 'path';
import * as fs from 'fs';

export class JsonFileConfigurationProvider implements IConfigurationProvider {
  constructor(private rootPath: string, private fileName: string) {}

  data: ConfigurationModel | null = null;

  load(): void {
    if (path.isAbsolute(this.fileName)) {
      this.data = this.loadJsonFile(this.fileName);
      return;
    }

    let filePath = path.join(this.rootPath, this.fileName);

    if (!path.isAbsolute(filePath)) {
      filePath = path.join(__dirname, filePath);
    }

    this.data = this.loadJsonFile(filePath);
  }

  getByKey(key: string): string | ConfigurationModel {
    throw new Error('Method not implemented.');
  }

  private loadJsonFile(fileAbsolutePath: string): ConfigurationModel | null {
    if (!fs.existsSync(fileAbsolutePath)) {
      return null;
    }

    const stat = fs.statSync(fileAbsolutePath);

    if (!stat.isFile) {
      return null;
    }

    try {
      const buffer = fs.readFileSync(fileAbsolutePath);
      const content = buffer.toString();
      return JSON.parse(content);
    } catch (err) {
      console.warn('Failed to load configuration from file: ', fileAbsolutePath);
      return null;
    }
  }
}
