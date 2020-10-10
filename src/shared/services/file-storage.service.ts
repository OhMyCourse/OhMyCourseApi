import * as path from 'path';

import { Injectable, OnModuleInit } from "@nestjs/common";

import { File } from "../../common/type/file.type";

import { ConfigService } from "./config.service";
import { EncryptionService } from "./encryption.service";

@Injectable()
export class FileStorageService implements OnModuleInit {

    private fsAsync = require('fs').promises;

    private fs = require('fs');

    private readonly fileStorageDir = this.configService.get('FILE_STORAGE_DIR');

    constructor(
        private readonly configService: ConfigService,
        private readonly encryptionService: EncryptionService
    ) { }

    public onModuleInit() {
        if (!this.fs.existsSync(this.fileStorageDir)) {
            this.fs.mkdirSync(this.fileStorageDir);
        }
    }

    public async saveFile(file: File): Promise<string> {
        const fileName = this.encryptionService.uuid() + '' + path.extname(file.originalname);
        await this.fsAsync.writeFile(
            this._getFilePath(fileName),
            file.buffer
        );
        return fileName;
    }

    public async readFile(fileName: string): Promise<Buffer> {
        return this.fsAsync.readFile(this._getFilePath(fileName));
    }

    private _getFilePath(fileName: string): string {
        return `${this.fileStorageDir}/${fileName}`;
    }
}