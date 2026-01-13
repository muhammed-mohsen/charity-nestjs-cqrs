import { MemberId } from "./member-id";

export class Member {
  constructor(private readonly _memberId: MemberId, private readonly _parent: MemberId, private readonly _ancestors: MemberId[], private readonly _children: MemberId[]) {}
  static newMember(_parent: Member, _memberId: string): Member {

    const memberId = MemberId.create(_memberId);
    const newAncestors = [..._parent.ancestors, _parent.memberId];
    return new Member(memberId, _parent.memberId, newAncestors, []);
  }
  static reconstitute(memberId: string, parentId: string, ancestors: string[], children: string[]): Member {
    return new Member(MemberId.create(memberId), MemberId.create(parentId), ancestors.map(ancestor => MemberId.create(ancestor)), children.map(child => MemberId.create(child)));
  }
  get ancestorsIds(): string[] {
    return this._ancestors.map(ancestor => ancestor.value);
  }
  get parentId(): string {
    return this._parent.value;
  }
  get memberIdValue(): string {
    return this._memberId.value;
  }
  get childrenIds(): string[] {
    return this._children.map(child => child.value);
  }
  get ancestors(): readonly MemberId[] {
    return this._ancestors;
  }
  get children(): readonly MemberId[] {
    return this._children;
  }
  get memberId():  MemberId {
    return this._memberId;
  }
  get parent():  MemberId {
    return this._parent;
  }
}