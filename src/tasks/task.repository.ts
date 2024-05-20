import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

export class TaskRepository extends Repository<Task>{
    constructor(private datasource:DataSource){
        super(Task , datasource.createEntityManager())
    }

    async createTask(createTaskDto :CreateTaskDto ) : Promise<Task> {
        const {title , description} = createTaskDto
       const task =  this.create({
            title : title, 
            description : description, 
            status : TaskStatus.OPEN
        })
       await  this.save(task)
       return task
    }
}