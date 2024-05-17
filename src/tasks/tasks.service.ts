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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: id },
    });
    if (!task) {
      throw new NotFoundException('nhi mila tera Task!');
    }

    return task;
  }

//   async createTask(createTaskdto: CreateTaskDto): Promise<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
            const { title, description } = createTaskDto;
        
            const task = this.taskRepository.create({
              title,
              description,
              status: TaskStatus.OPEN,
            });
        
            await this.taskRepository.save(task);
        
            if (!task) {
              throw new BadRequestException('Task creation failed');
            }
        
            return task;
          }
    

}
