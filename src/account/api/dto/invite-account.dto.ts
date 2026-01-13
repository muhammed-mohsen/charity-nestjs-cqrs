import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InviteAccountDto {
  @ApiProperty({ example: '201260032633', type: 'string' })
  @IsString()
  @IsNotEmpty()
  mobileNumber: string;
}
