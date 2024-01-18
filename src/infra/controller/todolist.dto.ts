import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class TaskDto {
  @ApiProperty({ description: 'The title for task' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description for task' })
  @IsNotEmpty()
  description: string;
}
