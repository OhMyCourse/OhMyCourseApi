import { NotFoundException } from "@nestjs/common";

export class LessonMaterialNotFoundException extends NotFoundException {

    constructor() {
        super('Lesson material not found!');
    }
}