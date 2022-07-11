import { Entity, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { AbstractEntity } from "../_global-resources";

@Entity()
@ObjectType()
export class User extends AbstractEntity {

    @Field()
    @Column({
        unique: true,
        length: 50,
        nullable: false,
    })
    name: string; // english name

    @Field()
    @Column({
        unique: true,
        length: 50,
        nullable: true,
    })
    persianName: string;

    @Field()
    @Column({
        unique: true,
        length: 254,
        nullable: true,
    })
    email: string;

    @Field()
    @Column({
        nullable: false,
        length: 60, //<= for `bcrypt` algorithm
    })
    password: string;

    @Field()
    @Column({
        nullable: true,
        length: 300
    })
    permissions: string;
}
