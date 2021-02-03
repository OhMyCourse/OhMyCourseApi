import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {

    constructor(private jwtService: JwtService) { }

    public generateJwt(payload: { id: number }): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
}