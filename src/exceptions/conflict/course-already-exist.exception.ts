import { ConflictException } from "@nestjs/common";

export class CourseAlreadyExistException extends ConflictException {

    constructor() {
        super('Course already exists !');
    }
}