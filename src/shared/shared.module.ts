import { Module, Global } from '@nestjs/common';

import { ConfigService } from './services/config.service';
import { EncryptionService } from './services/encryption.service';
import { FileStorageService } from './services/file-storage.service';
import { JwtAuthModule } from './services/jwt/jwt-auth.module';

@Global()
@Module({
    imports: [],
    providers: [
        ConfigService,
        EncryptionService,
        FileStorageService,
    ],
    exports: [
        ConfigService,
        EncryptionService,
        FileStorageService,
    ],
})
export class SharedModule { }
