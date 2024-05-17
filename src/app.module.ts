import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Task } from './tasks/task.entity';
// import { TaskRespository } from './tasks/task.repository';

@Module({
  imports: [
    TasksModule ,
    TypeOrmModule.forRoot({
      type : 'postgres',
      host: 'localhost',
      port : 5432,
      username : 'postgres',
      password : 'imabdullah',
      database : 'task-management',
      autoLoadEntities : true ,
      synchronize : true,
      entities : [Task]
       
    })
  ],
})
export class AppModule {}
