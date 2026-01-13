import { Member } from "../../domain/member/member";

export interface MemberNetworkRepository {
    getById(id: string): Promise<Member|null>;
    save(member: Member): Promise<void>;
    delete(id: string): Promise<void>;
}