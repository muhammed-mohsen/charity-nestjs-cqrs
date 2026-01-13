import { Member } from "../../domain/member/member";
import { MemberSchemaClass } from "../entity/member.entity";

export class MemberMapper {
    static toDomain(entity: MemberSchemaClass): Member {
        return  Member.reconstitute(entity._id, entity.parentId, entity.ancestors, entity.children);
    }
    static toPersistence(domain: Member): MemberSchemaClass {
        const persistenceSchema = new MemberSchemaClass();
        persistenceSchema._id = domain.memberIdValue;
        persistenceSchema.parentId = domain.parentId;
        persistenceSchema.ancestors = domain.ancestorsIds;
        persistenceSchema.children = domain.childrenIds;
        return persistenceSchema;

    }
}