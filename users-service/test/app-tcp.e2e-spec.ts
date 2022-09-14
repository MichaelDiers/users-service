import { InjectionNames } from '../src/configuration/InjectionNames.enum';
import clientTest from './client.tester';

describe('e2e tests for TCP', () => {
  clientTest(InjectionNames.TCP_USERS_CLIENT, InjectionNames.TCP_CONFIG);
});
