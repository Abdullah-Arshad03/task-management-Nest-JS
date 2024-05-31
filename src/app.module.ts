import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Task } from './tasks/task.entity';
// import { TaskRespository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/auth.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : [`.env.stage.${process.env.STAGE}`]
    }),
    TypeOrmModule.forRoot({
      type : 'postgres',
      autoLoadEntities : true ,
      synchronize : true,
      entities : [Task , User]
    }),
    TasksModule,
    AuthModule
  ],
})
export class AppModule {}

