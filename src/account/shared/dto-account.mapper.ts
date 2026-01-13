import { Account } from "../domain/model/account/account";
import { AccountDTO } from "./account.dto";

export class DTOAccountMapper {
  toDTO(account: Account|null): AccountDTO|null {

    if(!account)
     return null;
    return {
      id: account.id.value,
      mobileNumber: account.mobileNumber.value,
      fullName: account.fullName.value,
      photoUrl: account.photoUrl.value,
      devicesTokens: account.devices.map(device => device.fcmToken.value),
    };
  }
}