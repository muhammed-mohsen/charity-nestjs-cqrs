export type AuthRequest = Request & {
  user: {
    id: string;
    deviceId: string;
    deviceType: string;
    mobileNumber: string;
    permissions: string[];
  };
};