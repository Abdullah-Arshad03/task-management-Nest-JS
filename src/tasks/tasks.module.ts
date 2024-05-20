import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { DataSource } from 'typeorm';


// import { TaskRespository } from './task.repository';
// import { Task } from './task.entity';
// import { TaskRespository } from './task.repository';

@Module({
  imports : [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService,
    {
      provide: 'TaskRepository',
      useFactory: (dataSource: DataSource) => new TaskRepository(dataSource),
      inject: [DataSource],
    }
  ]
})
export class TasksModule {
}
