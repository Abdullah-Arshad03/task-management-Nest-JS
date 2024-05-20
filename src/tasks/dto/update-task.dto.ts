import { IsEnum , IsOptional } from "class-validator"
import { TaskStatus } from "../task-status.enum"

export class UpdateTask {
     
    @IsOptional()
    title? : string 

    @IsOptional()
    description? : string

    @IsEnum(TaskStatus)
    taskStatus : TaskStatus
}