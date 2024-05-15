import { IsEnum } from "class-validator"
import { TaskStatus } from "../tasks.model"

export class UpdateTask {
    title? : string 
    description? : string

    @IsEnum(TaskStatus)
    taskStatus : TaskStatus
}