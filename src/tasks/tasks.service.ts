import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTask } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../auth/auth.entity';

@Injectable()
export class TasksService {
  
  constructor(
    @Inject('TaskRepository') private taskRepository: TaskRepository,
  ) {}

  // async getTaskById(id: string): Promise<Task> {
  //   const task = await this.taskRepository.findOne({
  //     where: { id: id },
  //   });
  //   if (!task) {
  //     throw new NotFoundException('Task Not Found!');
  //   }

  //   return task;

  getTasks(filterDto : GetTaskFilterDto , user : User): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto, user)
  }

  getTaskById(id: string , user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id , user);
  }

  createTask(createTaskDto: CreateTaskDto , user : User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

   deleteTask(id: string , user : User): Promise<void> {
    return this.taskRepository.deleteTask(id, user);
  }

   updateTaskStatus(id :string , updateTaskStatus: UpdateTask , user : User) : Promise<Task>{
    return this.taskRepository.updateTaskStatus(id , updateTaskStatus , user)
  }


}
