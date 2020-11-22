import { Module, Global } from '@nestjs/common';

import { ConfigService } from './services/config.service';
import { EncryptionService } from './services/encryption.service';
import { FileStorageService } from './services/file-storage.service';
import { JwtService } from './services/jwt.service';

@Global()
@Module({
    imports: [],
    providers: [
        ConfigService,
        EncryptionService,
        FileStorageService,
        JwtService
    ],
    exports: [
        ConfigService,
        EncryptionService,
        FileStorageService,
        JwtService
    ],
})
export class SharedModule { }
