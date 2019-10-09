import { EnvironmentVariableConfigurationSource } from './EnvironmentVariableConfigurationSource';
import { IConfigurationRoot } from '@node-config-builder/core/src/models/IConfigurationRoot';
import { ConfigurationBuilder } from '@node-config-builder/core/src/ConfigurationBuilder';

describe('EnvironmentVariableConfigurationSource', () => {
  function getConfig(
    source: EnvironmentVariableConfigurationSource
  ): Promise<IConfigurationRoot> {
    return new ConfigurationBuilder().add(source).build();
  }

  it('should read all environment variables', () => {
    process.env.ABC = 'ABC';
    return getConfig(new EnvironmentVariableConfigurationSource()).then(
      config => {
        expect(config.configuration.ABC).toBe('ABC');

        Object.keys(process.env).forEach(envKey =>
          expect(Object.keys(config.configuration)).toContain(envKey)
        );
      }
    );
  });

  it('should read only variables with prefix', () => {
    process.env.PREFIX_ABC = 'ABC';
    process.env.NOT_PREFIX_EFG = 'EFG';
    return getConfig(
      new EnvironmentVariableConfigurationSource().withPrefix('PREFIX')
    ).then(config => {
      expect(config.configuration.PREFIX_ABC).toBe('ABC');
      expect(['PREFIX_ABC']).toEqual(Object.keys(config.configuration));
    });
  });

  it('should read only provided names of variables', () => {
    process.env.ABC = 'ABC';
    process.env.EFG = 'EFG';
    process.env.NOT_INT_CONFIG = 'NOT';
    return getConfig(
      new EnvironmentVariableConfigurationSource().withValidNames([
        'ABC',
        'EFG'
      ])
    ).then(config => {
      expect(['ABC', 'EFG']).toEqual(Object.keys(config.configuration));
    });
  });

  it('should read prefix with valid names', () => {
    process.env.PREFIX_ABC = 'ABC';
    process.env.PREFIX_EFG = 'EFG';
    process.env.ANOTHER_VALID_NAME = 'NOT';

    return getConfig(
      new EnvironmentVariableConfigurationSource()

        .withValidNames(['PREFIX_ABC', 'ANOTHER_VALID_NAME'])
        .withPrefix('PREFIX')
    ).then(config => {
      expect(['PREFIX_ABC']).toEqual(Object.keys(config.configuration));
    });
  });

  it('should compose config from environemnt by keys', () => {
    process.env.ONE = '1';
    process.env.TWO = '2';
    process.env.THREE = '3';

    return getConfig(
      new EnvironmentVariableConfigurationSource().withTransformation({
        propOne: 'ONE',
        propTwo: 'TWO',
        c: {
          propThree: 'THREE'
        }
      })
    ).then(config => {
      expect(config.configuration).toEqual({
        propOne: '1',
        propTwo: '2',
        c: {
          propThree: '3'
        }
      });
    });
  });
});
