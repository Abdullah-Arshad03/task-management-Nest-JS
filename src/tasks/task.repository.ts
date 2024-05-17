// import { Repository, DataSource } from 'typeorm';
// import { Task } from './task.entity';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { BadRequestException, NotFoundException } from '@nestjs/common';


// export class TaskRepository extends Repository<Task> {

//   async getTaskById(id: string): Promise<Task> {
//     const task = await this.findOne({
//       where: { id: id },
//     });
//     if (!task) {
//       throw new NotFoundException('Task not found!');
//     }
//     return task;
//   }

//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     const { title, description } = createTaskDto;

//     const task = this.create({
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     });

//     await this.save(task);

//     if (!task) {
//       throw new BadRequestException('Task creation failed');
//     }
//     return task;
//   }
// }
