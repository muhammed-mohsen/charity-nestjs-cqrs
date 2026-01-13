import { MemberNetworkRepository } from "../../application/contracts/member-network.repository";
import { Member } from "../../domain/member/member";

export class MemberNetworkRepositoryImpl implements MemberNetworkRepository {
    constructor(private readonly memberNetworkRepository: MemberNetworkRepository) {}

    async getById(id: string): Promise<Member|null> {
        return this.memberNetworkRepository.getById(id);
    }
    async save(member: Member): Promise<void> {
        return this.memberNetworkRepository.save(member);
    }
    async delete(id: string): Promise<void> {
        return this.memberNetworkRepository.delete(id);
    }
}