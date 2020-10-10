import * as uuid from 'uuid';

export class EncryptionService {

    public uuid(): string {
        return uuid.v4();
    }
}