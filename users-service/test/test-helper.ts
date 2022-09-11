import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from "class-transformer";

/**
 * Test the dto validation for the given data.
 * @param cls The type of the dto.
 * @param plain An object that is transformed into the dto.
 * @param hasError True if an error is expected and false otherwise.
 * @param error The expected error string or a part of it.
 */
export async function testDtoValidation<Type>(
    cls: ClassConstructor<Type>,
    plain: any,
    hasError: boolean = false,
    error?: string,
) : Promise<void> {
    const dto = plainToInstance(cls, plain);
    const errors = await validate(dto as object);
    if (hasError) {
        expect(errors.length).not.toBe(0);
        if (error) {
            expect(JSON.stringify(errors)).toContain(error);
        }        
    } else {
        expect(errors.length).toBe(0);
    }
}

/**
 * Test the length validation for a field of a dto.
 * @param param0 The test options.
 * @param param0.cls The type of the dto.
 * @param param0.factory A function that creates a plain object for testing.
 * @param param0.name The name of the field to be tested.
 * @param param0.minLength The minimal length of the field value.
 * @param param0.maxLength The maximal length of the field value.
 */
export function testDtoValidationForLength<Type>({
    cls,
    factory,
    name,
    minLength,
    maxLength,
} : {
    cls: ClassConstructor<Type>,
    factory: () => any,
    name: string,
    minLength?: number,
    maxLength?: number,
}) : void {    
    describe(`validate length of ${name}`, () => {
        if (minLength) {
            it(`validation should fail if ${name} is too short`, async () => {
                const obj = factory();
                obj[name] = [...new Array(minLength - 1)].map(x => 'a').join('');
                
                await testDtoValidation(
                    cls,
                    obj,
                    true,
                    `isLength\":\"${name} must be longer than or equal to ${minLength} characters`,
                );
            });

            it(`validation should succeed if length of ${name} equals min length`, async () => {
                const obj = factory();
                obj[name] = [...new Array(minLength)].map(x => 'a').join('');
                
                await testDtoValidation(cls, obj);
            });
        }

        if (maxLength) {
            it(`validation should succeed if length of ${name} equals max length`, async () => {
                const obj = factory();
                obj[name] = [...new Array(maxLength)].map(x => 'a').join('');

                await testDtoValidation(cls, obj);
            });

            it(`validation should fail if ${name} is too long`, async () => {
                const obj = factory();
                obj[name] = [...new Array(maxLength + 1)].map(x => 'a').join('');

                await testDtoValidation(
                    cls,
                    obj,
                    true,
                    `\"isLength\":\"${name} must be shorter than or equal to ${maxLength} characters`,
                );
            });
        }
    });
};

/**
 * Tests if the dto validation fails if a field is missing.
 * @param cls The type of the dto.
 * @param factory A factory method for creating a new plain test object.
 */
export function testDtoValidationForMissingField<Type>(
    cls: ClassConstructor<Type>,
    factory: () => any,
) : void {
    describe('validation should fail if field is missing', () => {
        Object.keys(factory()).forEach((key) => {
            it(`validation should fail without ${key}`, async () => {
                const obj = factory();
                delete obj[key];
                testDtoValidation(cls, obj, true);
            });
        });
    });
}
