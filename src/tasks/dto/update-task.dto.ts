import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Completion status of the task' })
  @IsBoolean()
  completed: boolean;
}
