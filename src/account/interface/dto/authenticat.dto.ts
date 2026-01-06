import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class AuthenticateDto {
  @ApiProperty({ example: 'idToken', type: String })
  @IsString()
  @IsNotEmpty()
  idToken: string;
  @ApiProperty({ example: 'deviceId', type: String })
  @IsString()
  @IsNotEmpty()
  deviceId: string;
  @ApiProperty({ example: 'deviceType', type: String })
  @IsString()
  @IsNotEmpty()
  deviceType: string;
}
