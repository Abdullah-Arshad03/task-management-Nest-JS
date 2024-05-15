import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';



@Injectable()
export class TasksService {

    private tasks:Task[]= []

    //we know that the result from this method is also the array of Tasks, so do the type safety here too.
    
    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilterDto(filterDto: GetTaskFilterDto ): Task[]{

        const {status , search} = filterDto

        let tasks = this.getAllTasks()
        
        if(status){
           tasks = tasks.filter((task)=> task.status === status)
            
        }

        if(search){
             tasks = tasks.filter((task)=> {
                if(task.title.includes(search) || task.description.includes(search)){
                 return true
                }
                return false
            })
       
        }

        return tasks

    }
    

    getTaskById(id : string) : Task {
        
        const found = this.tasks.find((task)=> task.id === id)

        if(!found){
            throw new NotFoundException('Nhi mila loro!')
        }

        return found
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

        const found = this.getTaskById(id)
       return this.tasks.filter((task)=> found.id!== task.id)
    }

    updateTheTaskStatus(id: string , updateTask : UpdateTask) : Task {

        const {taskStatus} = updateTask
        const task = this.getTaskById(id)


       task.status = taskStatus
       return task
    }
}
