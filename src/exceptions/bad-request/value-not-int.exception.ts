import { BadRequestException } from '@nestjs/common';

export class ValueNotIntException extends BadRequestException {
    constructor() {
        super('Value is not int!');
    }
}
