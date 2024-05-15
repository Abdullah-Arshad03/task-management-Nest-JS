// import { TaskStatus } from "../tasks.model"
import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty() // these are the validation decorators for validating the data
  description: string;
}
