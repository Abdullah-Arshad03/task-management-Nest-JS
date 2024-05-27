import {  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { UpdateTask } from './dto/update-task.dto';
// import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks') 
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskServices: TasksService) {} 

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
