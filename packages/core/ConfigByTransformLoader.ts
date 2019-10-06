import { ConfigurationModel } from './models/ConfigurationModel';

export interface TransformationOptions {
  transform: TransformationSchema;
  getValueByKey: (key: string) => string;
}

export type TransformationSchema = {
  [key: string]: string | TransformationSchema;
};

export function loadConfigByTransformation(
  options: TransformationOptions
): ConfigurationModel {
  const setConfigByKey = (config: any, key: string, envVariableKey: string) => {
    return {
      ...config,
      [key]: options.getValueByKey(envVariableKey)
    };
  };

  const setConfigByKeyByTransofrmation = (
    config: any,
    transform: TransformationSchema
  ) => {
    if (!transform) {
      return config;
    }

    Object.keys(transform).forEach(transformKeyName => {
      const transformKeyValue = transform[transformKeyName];
      if (typeof transformKeyValue === 'string') {
        config = setConfigByKey(config, transformKeyName, transformKeyValue);
      } else {
        config[transformKeyName] = setConfigByKeyByTransofrmation(
          {},
          transformKeyValue
        );
      }
    });

    return config;
  };

  return setConfigByKeyByTransofrmation({}, options.transform);
}
