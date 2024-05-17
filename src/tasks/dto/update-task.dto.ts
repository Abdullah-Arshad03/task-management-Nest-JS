import { IsEnum } from "class-validator"
import { TaskStatus } from "../task-status.enum"

export class UpdateTask {
    title? : string 
    description? : string

    @IsEnum(TaskStatus)
    taskStatus : TaskStatus
}