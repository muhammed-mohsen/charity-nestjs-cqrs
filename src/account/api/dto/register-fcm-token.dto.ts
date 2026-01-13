import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class RegisterFCMTokenDto {
  @ApiProperty({ example: 'ec-RVDOIQE8Cjx1sbZ4H_L:APA91bGM464Nv_BnV1r48C0bPhHLnRHNEGlg0NekUn1JW_slXy7t20eSMtPQNF8ZlwzOzNDWDiH0YmdTa3P0EGc3aWxbhUGxM584EAikK6xzRAlJqQTNSLPdJg7HmL2OVjkA5no71F6N', type: String })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;
}