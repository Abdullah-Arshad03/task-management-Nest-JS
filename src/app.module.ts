import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
// import { TaskRespository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/auth.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>({
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          entities: [Task, User],
          host:      configService.get('DB_HOST'),
          port:      configService.get('DB_PORT'),
          username:  configService.get('DB_USERNAME'),
          password:  configService.get('DB_PASSWORD'),
          database:  configService.get('DB_DATABASE'),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type : 'postgres',
    //   host : 'localhost',
    //   port : 5432,
    //   username : 'postgres',
    //   password : 'imabdullah',
    //   autoLoadEntities : true,
    //   synchronize : true,
    //   entities : [Task , User],
    //   database : 'task-management'
    // }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
