import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

import { ID_MAX_VALUE, ID_MIN_VALUE } from '../constants/id-range.cosntant';

export function IsId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value &&
                        Number.isInteger(value) &&
                        value >= ID_MIN_VALUE &&
                        value <= ID_MAX_VALUE;
                },
            },
        });
    };
}