import { InjectionNames } from '../src/configuration/InjectionNames.enum';
import clientTest from './client.tester';

describe('e2e tests for GRPC', () => {
  clientTest(InjectionNames.GRPC_USERS_CLIENT, InjectionNames.GRPC_CONFIG);
});
