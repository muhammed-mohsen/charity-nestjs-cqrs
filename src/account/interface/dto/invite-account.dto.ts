import { ApiProperty } from '@nestjs/swagger';

export class InviteAccountDto {
  @ApiProperty({ example: 'test@example.com', type: 'string' })
  email: string;
  @ApiProperty({ example: 'sdaf-sdaf-sdaf-sdaf', type: 'string' })
  inviterId: string;
}
