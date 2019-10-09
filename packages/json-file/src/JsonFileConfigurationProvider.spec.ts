import { ConfigurationBuilder } from '@node-config-builder/core/src/ConfigurationBuilder';
import * as path from 'path';
import { JsonFileConfigurationSource } from './JsonFileConfigurationSource';
import { IConfigurationRoot } from '@node-config-builder/core/src/models/IConfigurationRoot';

describe('JsonFileConfigurationProvider', () => {
  function getConfig(
    source: JsonFileConfigurationSource
  ): Promise<IConfigurationRoot> {
    return new ConfigurationBuilder()
      .setRootPath(__dirname)
      .add(source)
      .build();
  }

  it('should find relative file and generate its config', () => {
    return getConfig(
      new JsonFileConfigurationSource({
        fileName: '../tests/json-files/sample1.json'
      })
    ).then(config => {
      expect(config.configuration.one).toBe(1);
      expect(config.configuration.two).toBe('two');
      expect(config.configuration.complex).toEqual({
        'complex-one': 'complex-1',
        'complex-two': true
      });
    });
  });

  it('should find file at absolute path', () => {
    const fileName = path.resolve(
      __dirname,
      '../tests/json-files/sample1.json'
    );
    return getConfig(new JsonFileConfigurationSource({ fileName })).then(
      config => {
        expect(config.configuration.one).toBe(1);
      }
    );
  });

  it('should fail when file does not exist', () => {
    return expect(() =>
      getConfig(
        new JsonFileConfigurationSource({
          fileName: './file-does-not-exist-123.json'
        })
      )
    ).toThrow();
  });

  it('should not fail when optional and file does not exist', () => {
    return expect(() =>
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
          fileName: '../tests/json-files/invalid-json-file.json'
        })
      )
    ).toThrow();
  });
});
