import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {

    private tasks:Task[]= []

    //we know that the result from this method is also the array of Tasks, so do the type safety here too.
    
    getAllTasks(): Task[] {
        return this.tasks
    }

    getTaskById(id : string) : Task {
        return this.tasks.find((task)=> task.id === id)
    }

    createTask(createTask : CreateTaskDto) : Task {

        const {title , description} = createTask

        const taskCreated :Task = {
            id: uuidv4(), 
            title : title, 
            description : description, 
            status:  TaskStatus.OPEN,
        }
        
        this.tasks.push(taskCreated)
        return taskCreated
    }

    deleteTask(id: string): Task[]{
        return this.tasks = this.tasks.filter((task) => task.id !== id )

    }
}
