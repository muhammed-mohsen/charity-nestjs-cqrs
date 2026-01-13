export class AccountCreatedHandler {
    constructor(private readonly accountCreatedEventHandler: AccountCreatedEventHandler) {}

    async handle(event: AccountCreatedEvent) {
        await this.accountCreatedEventHandler.handle(event);
    }
}