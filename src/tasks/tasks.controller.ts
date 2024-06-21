import {  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/auth.entity';
import { ConfigService } from '@nestjs/config';
// import { UpdateTask } from './dto/update-task.dto';
// import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks') 
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskServices: TasksService,
    private config: ConfigService
  ) {
    console.log(config.get('TEST'))
  } 

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto , @GetUser() user: User ): Promise<Task[]>{
    return this.taskServices.getTasks(filterDto, user)
  }

  @Get('/:id')
  getTaskById(@Param('id') id : string , @GetUser() user : User) : Promise<Task> {
  return this.taskServices.getTaskById(id, user)
  }
  @Post()
  createTask(@Body() createTaskDto : CreateTaskDto,  @GetUser() user : User): Promise<Task>{
  return this.taskServices.createTask(createTaskDto, user)
  }
  @Delete('/:id')
    deleteTask(@Param('id') id :string , @GetUser() user : User): void{
      this.taskServices.deleteTask(id, user)
    }
  @Patch('/:id')
    updateTaskStatus(@Param('id') id: string , @Body() updateTaskStatus: UpdateTask , @GetUser() user : User): Promise<Task>{
      return this.taskServices.updateTaskStatus(id, updateTaskStatus , user)
    }

    // @Get('/testing')
    // testing(@Req() req):void{
    //   console.log('this is the req in tasks tesing' , req)
    // }
}
