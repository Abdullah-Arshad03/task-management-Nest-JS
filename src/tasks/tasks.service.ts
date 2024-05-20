import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
// import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
// import { TaskRespository } from './task.repository';
import { BadRequestException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { Inject } from '@nestjs/common';


@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepository') private  taskRepository: TaskRepository,
  ) {}

  // async getTaskById(id: string): Promise<Task> {
  //   const task = await this.taskRepository.findOne({
  //     where: { id: id },
  //   });
  //   if (!task) {
  //     throw new NotFoundException('Task Not Found!');
  //   }

  //   return task;
  // }

//   async createTask(createTaskdto: CreateTaskDto): Promise<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
          return this.taskRepository.createTask(createTaskDto)

}}
