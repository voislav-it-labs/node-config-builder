type EnvironmentVariableName = string;
export type EnvironmentVariablesConfigurationTransformationSchema = {
  [key: string]:
    | EnvironmentVariableName
    | EnvironmentVariablesConfigurationTransformationSchema;
};

export interface IEnvironmentVariablesConfigurationOptions {
  prefix?: string;
  validNames?: string[];
  transform?: EnvironmentVariablesConfigurationTransformationSchema;
}
