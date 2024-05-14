import { TaskStatus } from "../tasks.model"

export class UpdateTask {
    title? : string 
    description? : string
    taskStatus : TaskStatus
}