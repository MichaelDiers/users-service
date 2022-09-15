import { testDtoValidation } from '../../../test/test-helper';
import { UpdateUserDto } from './update-user.dto';
import plain from './create-user.dto.spec';
import * as tests from '../../../test/test-helper';
import { Constants } from '../constants';

describe('validate UpdateUserDto', () => {
  describe('validate empty object', () => {
    it('validation should succeed for empty object', async () => {
      await testDtoValidation(UpdateUserDto, {});
    });
  });

  describe('validate default plain test object', () => {
    it('validation should succeed for default object', async () => {
      await tests.testDtoValidation(UpdateUserDto, plain());
    });
  });

  describe('validate displayName', () => {
    tests.testDtoValidationForLength({
      cls: UpdateUserDto,
      factory: plain,
      name: 'displayName',
      minLength: Constants.DISPLAY_NAME_MIN_LENGTH,
      maxLength: Constants.DISPLAY_NAME_MAX_LENGTH,
    });
  });

  describe('validate email', () => {
    ['email', '@example.com', 'email@example', ''].forEach((email) => {
      it(`validation should fail for ${email}`, async () => {
        const obj = plain({
          email,
        });

        await tests.testDtoValidation(
          UpdateUserDto,
          obj,
          true,
          '"isEmail":"email must be an email"',
        );
      });
    });
  });

  describe('validate password', () => {
    tests.testDtoValidationForLength({
      cls: UpdateUserDto,
      factory: plain,
      name: 'password',
      minLength: Constants.PASSWORD_MIN_LENGTH,
      maxLength: Constants.PASSWORD_MAX_LENGTH,
    });
  });
});
