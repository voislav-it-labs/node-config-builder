import { TransformationSchema } from '../../../core/src/ConfigByTransformLoader';

export interface IEnvironmentVariablesConfigurationOptions {
  prefix?: string;
  validNames?: string[];
  transform?: TransformationSchema;
}
