import { TransformationSchema } from '../../core/ConfigByTransformLoader';

export interface IEnvironmentVariablesConfigurationOptions {
  prefix?: string;
  validNames?: string[];
  transform?: TransformationSchema;
}
