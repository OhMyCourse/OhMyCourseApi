import { BadRequestException } from '@nestjs/common';

export class IntOutOfRangeException extends BadRequestException {
    constructor() {
        super('Int is out of range!');
    }
}
