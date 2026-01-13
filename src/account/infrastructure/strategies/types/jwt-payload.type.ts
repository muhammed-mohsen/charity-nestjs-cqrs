
export type JwtPayloadType ={
  id: string;
  deviceId: string;
  deviceType: string;
  permissions: string[];
  mobileNumber: string;
  iat: number;
  exp: number;
};
