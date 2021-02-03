import { PipeTransform } from '@nestjs/common';

import { IntOutOfRangeException } from '../../exceptions/bad-request/int-out-of-range.exception';
import { ValueNotIntException } from '../../exceptions/bad-request/value-not-int.exception';

import { ID_MAX_VALUE, ID_MIN_VALUE } from '../constants/id-range.cosntant';

export class IdValidationPipe implements PipeTransform {

    transform(value: string): number {
        const num: number = parseInt(value);

        if (!num) {
            throw new ValueNotIntException();
        }

        if (num < ID_MIN_VALUE || num > ID_MAX_VALUE) {
            throw new IntOutOfRangeException();
        }
        return num;
    }
}
