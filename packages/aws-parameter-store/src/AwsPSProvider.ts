import { TransformationSchema } from '@node-config-builder/core/src/ConfigByTransformLoader';
import { IConfigurationProvider } from '@node-config-builder/core/src/models/IConfigurationProvider';
import { ConfigurationModel } from '@node-config-builder/core/src/models/ConfigurationModel';
import { loadConfigByTransformation } from '@node-config-builder/core/src/ConfigByTransformLoader';

import { SSMClient } from '@aws-sdk/client-ssm-node/SSMClient';
import { GetParameterCommand } from '@aws-sdk/client-ssm-node';

export interface AwsParameterStoreOptions {
  transform: TransformationSchema;
}

export class AwsParameterStoreProvider implements IConfigurationProvider {
  data: ConfigurationModel;

  private client: SSMClient;

  constructor(private options: AwsParameterStoreOptions) {}

  load(): Promise<void> {
    this.client = new SSMClient({});

    return loadConfigByTransformation({
      transform: this.options.transform,
      getValueByKey: key => this.getByKey(key)
    }).then(config => {
      this.data = config;
    });
  }

  getByKey(key: string): Promise<string> {
    return this.client
      .send(new GetParameterCommand({ Name: key }))
      .then(res => {
        return res.Parameter.Value;
      });
  }
}
