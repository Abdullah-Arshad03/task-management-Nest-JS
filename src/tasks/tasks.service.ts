import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTask } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

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

  getTasks(filterDto : GetTaskFilterDto): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto)
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

   deleteTask(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }

   updateTaskStatus(id :string , updateTaskStatus: UpdateTask) : Promise<Task>{
    return this.taskRepository.updateTaskStatus(id , updateTaskStatus)
  }
}
