import * as tests from '../../../test/test-helper';
import { CreateUserDto } from "./create-user.dto";
import { Constants } from '../../validation/constants';

const plain = (obj: {
    displayName?: string,
    email?: string,
    password?: string,
} = {}) => {
    const {
        displayName = [...new Array(Constants.DISPLAY_NAME_MIN_LENGTH)].map(x => 'a').join(''),
        email = 'email@example.com',
        password = [...new Array(Constants.PASSWORD_MIN_LENGTH)].map(x => 'a').join(''),
    } = obj;

    return {
        displayName,
        email,
        password,
    };
};

export default plain;

describe('validate CreateUserDto', () => {
    describe('validate default plain test object', () => {
        it('validation should succeed for default object', async () => {
            await tests.testDtoValidation(CreateUserDto, plain());
        });
    });

    tests.testDtoValidationForMissingField(
        CreateUserDto,
        plain,
    );

    describe('validate displayName', () => {
        tests.testDtoValidationForLength(
            {
                cls: CreateUserDto,
                factory: plain,
                name: 'displayName',
                minLength: Constants.DISPLAY_NAME_MIN_LENGTH,
                maxLength: Constants.DISPLAY_NAME_MAX_LENGTH,
            },
        );
    });

    describe('validate email', () => {
        ['email', '@example.com', 'email@example', ''].forEach((email) => {
            it(`validation should fail for ${email}`, async () => {
                const obj = plain({
                    email,
                });
                
                await tests.testDtoValidation(
                    CreateUserDto,
                    obj,
                    true,
                    '\"isEmail\":\"email must be an email\"',
                );
            });
        });
    });
    
    describe('validate password', () => {
        tests.testDtoValidationForLength(
            {
                cls: CreateUserDto,
                factory: plain,
                name: 'password',
                minLength: Constants.PASSWORD_MIN_LENGTH,
                maxLength: Constants.PASSWORD_MAX_LENGTH,
            },
        );
    });
});
