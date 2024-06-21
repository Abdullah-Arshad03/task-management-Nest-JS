import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';


// import { TaskRespository } from './task.repository';
// import { Task } from './task.entity';
// import { TaskRespository } from './task.repository';

@Module({
  imports : [ ConfigModule,  TypeOrmModule.forFeature([TaskRepository]) , AuthModule],
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