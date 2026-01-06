import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmailConfirmDto {
  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}
