import { Injectable } from "@nestjs/common";

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {

    public generateJwt(payload: { id: number }): string {
        return jwt.sign(payload, 'secret', { expiresIn: '4w' });
    }
}