import * as uuid from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';
import { User as UserDatabase } from '../database/user.schema';
import { Constants } from '../constants';

describe('user', () => {
  it('constructor should create an empty object', () => {
    const user = new User();
    expect(Object.keys(user).every((key) => !user[key])).toBe(true);
  });

  it('constructor should initialize data from CreateUserDto', () => {
    const data = {
      displayName: 'displayName',
      email: 'example@example.com',
      password: 'kjhgfdfghjiklkjhgf',
    };

    const dto = new CreateUserDto();
    dto.displayName = data.displayName;
    dto.email = data.email;
    dto.password = data.password;

    const user = new User(dto);
    expect(user.displayName).toBe(data.displayName);
    expect(user.email).toBe(data.email);
    expect(user.password).toBe(data.password);
    expect(
      uuid.validate(user.guid) &&
        uuid.version(user.guid) === Number(Constants.UUID_VERSION),
    ).toBe(true);
    expect([...Object.keys(user)].length).toBe(4);
  });

  it('constructor should initialize data from database user', () => {
    const data = {
      displayName: 'displayName',
      email: 'example@example.com',
      password: 'kjhgfdfghjiklkjhgf',
      guid: uuid.v4(),
    };

    const document = new UserDatabase();
    document.displayName = data.displayName;
    document.email = data.email;
    document.password = data.password;
    document.guid = data.guid;

    const user = new User(document);
    expect(user.displayName).toBe(data.displayName);
    expect(user.email).toBe(data.email);
    expect(user.password).toBe(data.password);
    expect(user.guid).toBe(data.guid);
    expect([...Object.keys(user)].length).toBe(4);
  });
});
