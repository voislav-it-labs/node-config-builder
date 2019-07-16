interface ConfigurationModel {
  [index: string]: string | ConfigurationModel;
}

interface IConfigurationRoot {
  reload(): void;
  configuration: ConfigurationModel;
}

interface IConfigurationProvider {
  data: ConfigurationModel;
  load(): void;
  getByKey(key: string): string | ConfigurationModel;
}

interface IConfigurationSource {
  build(builder: IConfigurationBuilder): IConfigurationProvider;
}

interface IConfigurationBuilder {
  add(source: IConfigurationSource): void;
  build(): IConfigurationRoot;
}

class ConfigurationBuilder implements IConfigurationBuilder {
  private sources: IConfigurationSource[] = [];

  add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);

    return this;
  }

  build(): IConfigurationRoot {
    const providers = this.sources.map(source => source.build(this));

    return new ConfigurationRoot(providers);
  }
}

class ConfigurationRoot implements IConfigurationRoot {
  constructor(private providers: IConfigurationProvider[]) {
    providers.forEach(provider => provider.load());
  }

  get configuration(): ConfigurationModel {
    return null;
  }

  reload(): void {
    this.providers.forEach(provider => provider.load());
  }
}

type EnvironmentVariablesConfigurationTransformationFunc = (keys: string[]) => string[];
type EnvironmentVariableName = string;
type EnvironmentVariablesConfigurationTransformationSchema = {
  [key: string]: EnvironmentVariableName | EnvironmentVariablesConfigurationTransformationSchema;
};

interface IEnvironmentVariablesConfigurationOptions {
  prefix?: string;
  validNames?: string[];
  transform?:
    | EnvironmentVariablesConfigurationTransformationSchema
    | EnvironmentVariablesConfigurationTransformationFunc;
}

class EnvironmentVariableConfigurationSource implements IConfigurationSource {
  private options: IEnvironmentVariablesConfigurationOptions = {
    prefix: '',
    validNames: [],
    transform: {
      abc: 'NODE_ENV',
      erf: {
        abc: 'NODE_ENV',
      },
    },
  };

  constructor() {}

  withPrefix(prefix: string): EnvironmentVariableConfigurationSource {
    this.options.prefix = prefix;
    return this;
  }
  withValidNames(environmentVariableNames: string[]): EnvironmentVariableConfigurationSource {
    this.options.validNames = environmentVariableNames;
    return this;
  }

  build(builder: IConfigurationBuilder): IConfigurationProvider {
    const provider = new EnvironmentVariableConfigurationProvider(this.options);
    return provider;
  }
}

class EnvironmentVariableConfigurationProvider implements IConfigurationProvider {
  data: ConfigurationModel;

  constructor(private options: IEnvironmentVariablesConfigurationOptions) {}

  load(): void {
    const envVariables = JSON.parse(JSON.stringify(process.env));

    Object.keys(envVariables)
      .filter(key => {
        if (this.options.prefix && key.indexOf(this.options.prefix) === 0) {
          return true;
        }

        if (this.options.validNames.length === 0) {
          return true;
        }

        return this.options.validNames.indexOf(key) > -1;
      })
      .forEach(key => {
        delete envVariables[key];
      });

    this.data = envVariables;
  }

  getByKey(key: string): string | ConfigurationModel {
    if (!this.data) {
      return null;
    }

    return this.data[key];
  }
}

const c = new ConfigurationBuilder().add(
  new EnvironmentVariableConfigurationSource()
    .withPrefix('ALUMNI_')
    .withValidNames(['NODE_ENV', 'NODE_CONFIG_ENV'])
);
