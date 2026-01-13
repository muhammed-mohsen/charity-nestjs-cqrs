import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseEntitySchemaClass } from "./base.entity";
export type MemberSchemaDocument = HydratedDocument<MemberSchemaClass>;
@Schema({
    collection: 'members',
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
})
export class MemberSchemaClass extends BaseEntitySchemaClass {
    @Prop({ type: String, required: true })
    _id!: string;

    @Prop({ type: String, required: true })
    parentId!: string;

    @Prop({ type: [String], required: true })
    ancestors!: string[];

    @Prop({ type: [String], required: true })
    children!: string[];
}
export const MemberSchema = SchemaFactory.createForClass(MemberSchemaClass);