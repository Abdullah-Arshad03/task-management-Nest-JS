import {  Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Query } from '@nestjs/common';
// import { UpdateTask } from './dto/update-task.dto';
// import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {} // we pass the

  // @Get()
  // getTasks(@Query() filterDto : GetTaskFilterDto): Task[] {          // renamed to getTasks() from the getAllTasks because now we are to get the Tasks on the base of the filters

  //   // if we have any filters defined, call taskServices.getTaskWiFilter() otherwise get All Tasks
  //   // the filters are coming with the Query Parameters.


  //   if(Object.keys(filterDto).length){
  //     return this.taskServices.getTasksWithFilterDto(filterDto)
  //     //...
  //   }
  //   else{
  //     // getAllTasks
  //   return this.taskServices.getAllTasks();

  //   }


    
  // }
  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto ): Promise<Task[]>{
    return this.taskServices.getTasks(filterDto)
  }


  @Get('/:id')
  getTaskById(@Param('id') id : string) : Promise<Task> {
    return this.taskServices.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto : CreateTaskDto): Promise<Task>{

    return this.taskServices.createTask(createTaskDto)

  }
 @Delete('/:id')
    deleteTask(@Param('id') id :string): void{
      this.taskServices.deleteTask(id)

    }
    @Patch('/:id')
    updateTaskStatus(@Param('id') id: string , @Body() updateTaskStatus: UpdateTask): Promise<Task>{
      return this.taskServices.updateTaskStatus(id, updateTaskStatus)
    }

}
