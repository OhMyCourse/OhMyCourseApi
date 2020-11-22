import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from "./jwt-auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '4w' },
        }),
    ],
    providers: [JwtAuthService],
    exports: [JwtAuthService]
})
export class JwtAuthModule { }