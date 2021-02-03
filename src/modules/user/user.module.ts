import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthModule } from "../../shared/services/jwt/jwt-auth.module";
import { SharedModule } from "../../shared/shared.module";
import { MediaModule } from "../media/media.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        SharedModule,
        MediaModule,
        JwtAuthModule
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }