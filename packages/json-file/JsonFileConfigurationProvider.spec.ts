import { ConfigurationBuilder } from '@node-config-builder/core/ConfigurationBuilder';
import * as path from 'path';
import { JsonFileConfigurationSource } from './JsonFileConfigurationSource';
import { IConfigurationRoot } from '@node-config-builder/core/models/IConfigurationRoot';

describe('JsonFileConfigurationProvider', () => {
  function getConfig(source: JsonFileConfigurationSource): IConfigurationRoot {
    return new ConfigurationBuilder()
      .setRootPath(__dirname)
      .add(source)
      .build();
  }

  it('should find relative file and generate its config', () => {
    const config = getConfig(
      new JsonFileConfigurationSource({
        fileName: './test-files/sample1.json'
      })
    );

    expect(config.configuration.one).toBe(1);
    expect(config.configuration.two).toBe('two');
    expect(config.configuration.complex).toEqual({
      'complex-one': 'complex-1',
      'complex-two': true
    });
  });

  it('should find file at absolute path', () => {
    const fileName = path.resolve(__dirname, './test-files/sample1.json');
    const config = getConfig(new JsonFileConfigurationSource({ fileName }));
    expect(config.configuration.one).toBe(1);
  });

  it('should fail when file does not exist', () => {
    expect(() =>
      getConfig(
        new JsonFileConfigurationSource({
          fileName: './file-does-not-exist-123.json'
        })
      )
    ).toThrow();
  });

  it('should not fail when optional and file does not exist', () => {
    expect(() =>
      getConfig(
        new JsonFileConfigurationSource({
          fileName: './file-does-not-exist-123.json',
          optional: true
        })
      )
    ).not.toThrow();
  });

  it('should fail when file cannot be parsed as JSON', () => {
    expect(() =>
      getConfig(
        new JsonFileConfigurationSource({
          fileName: './test-files/invalid-json-file.json'
        })
      )
    ).toThrow();
  });
});
