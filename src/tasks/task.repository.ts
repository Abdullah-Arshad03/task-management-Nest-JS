import { NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { UpdateTask } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';


export class TaskRepository extends Repository<Task> {
  constructor(private datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
  const {search , status} = filterDto
   const query =  this.createQueryBuilder('tasks')


if(search){
query.andWhere('tasks.title LIKE :search OR tasks.description LIKE :search', {search : `%${search}%`})
}

if(status){
  query.andWhere('tasks.status = :status', {status:status})
}

   const Tasks =await query.getMany()

   return Tasks
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOne({ where: { id: id } });

    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = this.findOne({
      where: { id: id },
    });
    if (!task) {
      throw new NotFoundException('nhi mila delete k liyeh!');
    }

    const deletedOne = await this.delete({ id: id });
    console.log('this is the deletedOne : ', deletedOne);

    if (deletedOne.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found!`);
    }
  }
  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTask,
  ): Promise<Task> {
    const { taskStatus } = updateTaskStatusDto;

    const task = await this.findOne({ where: { id: id } });

    if (!task) {
      throw new NotFoundException(`The Task with Id: ${id} not found!`);
    }

    task.status = taskStatus;

    const taskUpdated = await this.save(task);
    return taskUpdated;
  }
}
