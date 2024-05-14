import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {} // we pass the

  @Get()
  getAllTasks(): Task[] {
    console.log('in the get');
    return this.taskServices.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) : Task {

    console.log('This is the Id of the Task retrieved: ', id)
    return this.taskServices.getTaskById(id)

  }

  @Post()
  createTask( @Body() createTask: CreateTaskDto) : Task {
   console.log('This is the create Task : ',createTask)
    return this.taskServices.createTask(createTask)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id : string): Task[]{
    console.log('This is the id of deleted task : ', id)
    return this.taskServices.deleteTask(id)
  }

  @Patch('/:id')
  updateTheTaskStatus(@Param('id') id : string){
    console.log('this is the id of the updated task with updated Status: ', id)
  }

}
