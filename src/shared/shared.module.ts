import { Module, Global } from '@nestjs/common';

import { ConfigService } from './services/config.service';

@Global()
@Module({
    imports: [],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class SharedModule { }
