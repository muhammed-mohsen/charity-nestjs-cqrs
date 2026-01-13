export class AccountCreated {
    constructor(private readonly _id: string, private readonly _mobileNumber: string) {}

    get id(): string {
        return this._id;
    }

    get mobileNumber(): string {
        return this._mobileNumber;
    }
}