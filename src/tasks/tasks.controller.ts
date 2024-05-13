import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){} // we pass the 

    @Get()
    getAllTasks(){
        console.log('in the get')
        return this.taskServices
    }

}
