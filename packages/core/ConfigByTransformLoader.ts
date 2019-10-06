import { ConfigurationModel } from './models/ConfigurationModel';

export interface TransformationOptions {
  transform: TransformationSchema;
  getValueByKey: (key: string) => Promise<string>;
}

export type TransformationSchema = {
  [key: string]: string | TransformationSchema;
};

export function loadConfigByTransformation(
  options: TransformationOptions
): Promise<ConfigurationModel> {
  const setConfigByKey = (config: any, key: string, envVariableKey: string) => {
    return options.getValueByKey(envVariableKey).then(value => {
      return {
        ...config,
        [key]: value
      };
    });
  };

  const setConfigByKeyByTransofrmation = (
    config: any,
    transform: TransformationSchema
  ) => {
    if (!transform) {
      return Promise.resolve(config);
    }

    const promises = Object.keys(transform).map(transformKeyName => {
      const transformKeyValue = transform[transformKeyName];
      if (typeof transformKeyValue === 'string') {
        return setConfigByKey(config, transformKeyName, transformKeyValue);
      } else {
        return setConfigByKeyByTransofrmation({}, transformKeyValue).then(
          value => {
            config[transformKeyName] = value;
            return config;
          }
        );
      }
    });

    return Promise.all(promises).then(results => {
      return results.reduce((aggr, obj) => {
        return {
          ...aggr,
          ...obj
        };
      }, {});
    });
  };

  return setConfigByKeyByTransofrmation({}, options.transform);
}
